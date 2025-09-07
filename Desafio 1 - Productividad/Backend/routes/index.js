var express = require('express');
var router = express.Router();
const { OpenAI } = require("openai");
const { getValkeyClient } = require("../utils/valkey");

// --------------------- Inicialización de OpenAI ---------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --------------------- Endpoint de Test ---------------------
router.get("/test", (req, res) => {
  res.json({ message: "Test endpoint works!" });
});

// --------------------- CRUD de Formatos ---------------------

// Crear un formato
router.post("/formats", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { id, name, prompt, tips } = req.body;
    if (!id || !name || !prompt || !tips)
      return res.status(400).json({ error: "id, name, prompt y tips son requeridos" });

    await client.hset(`format:${id}`, { name, prompt, tips });
    res.json({ message: "Formato creado", id, name, prompt, tips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer todos los formatos
router.get("/formats", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const keys = await client.keys("format:*");
    const formats = [];
    for (const key of keys) {
      const data = await client.hgetall(key);
      formats.push({ id: key.replace("format:", ""), ...data });
    }
    res.json({ total: formats.length, formats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer un formato específico
router.get("/formats/:id", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { id } = req.params;
    const format = await client.hgetall(`format:${id}`);
    if (!format || Object.keys(format).length === 0)
      return res.status(404).json({ error: "Formato no encontrado" });

    res.json({ id, ...format });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un formato
router.put("/formats/:id", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { id } = req.params;
    const { name, prompt, tips } = req.body;
    const existing = await client.hgetall(`format:${id}`);
    if (!existing || Object.keys(existing).length === 0)
      return res.status(404).json({ error: "Formato no encontrado" });

    await client.hset(`format:${id}`, {
      name: name || existing.name,
      prompt: prompt || existing.prompt,
      tips: tips || existing.tips
    });
    const updated = await client.hgetall(`format:${id}`);
    res.json({ message: "Formato actualizado", id, ...updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un formato
router.delete("/formats/:id", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { id } = req.params;
    const deleted = await client.del(`format:${id}`);
    if (!deleted) return res.status(404).json({ error: "Formato no encontrado" });
    res.json({ message: "Formato eliminado", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------- Generación de Ideas con Cache ---------------------

router.post("/generate", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { idea, format } = req.body;

    if (!idea || !format)
      return res.status(400).json({ error: 'Se requieren los campos "idea" y "format"' });

    // Obtener formato desde Valkey
    const selectedFormat = await client.hgetall(`format:${format}`);
    if (!selectedFormat || Object.keys(selectedFormat).length === 0)
      return res.status(400).json({ error: "Formato no válido" });

    // Revisar si la idea ya fue generada (cache)
    const ideaKey = `idea:${idea}:${format}`;
    const cached = await client.hgetall(ideaKey);
    if (cached && cached.content) {
      return res.json({
        content: cached.content,
        tips: selectedFormat.tips,
        format: selectedFormat.name,
        idea,
        fromCache: true,
        timestamp: cached.createdAt
      });
    }

    // Generar contenido con OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un experto en marketing de contenidos y copywriting. Responde en español y adapta el tono según la plataforma."
        },
        {
          role: "user",
          content: `${selectedFormat.prompt}\n\nIdea: "${idea}"\nGenera contenido específico y actionable.`
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const generatedContent = completion.choices[0]?.message?.content;
    if (!generatedContent) throw new Error("No se pudo generar contenido");

    // Guardar idea generada en Valkey con TTL 24h
    await client.hset(ideaKey, {
      idea,
      format,
      content: generatedContent,
      createdAt: new Date().toISOString()
    });
    await client.expire(ideaKey, 24 * 60 * 60); // 24 horas

    res.json({
      content: generatedContent,
      tips: selectedFormat.tips,
      format: selectedFormat.name,
      idea,
      fromCache: false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error generating content:", error);

    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message
    });
  }
});

// Leer todas las ideas generadas
router.get("/ideas", async (req, res) => {
  try {
    const client = await getValkeyClient(); // Asegurarse de obtener el cliente Valkey
    const keys = await client.keys("idea:*"); // Obtener todas las ideas
    const ideas = [];
    for (const key of keys) {
      const data = await client.hgetall(key); // Obtener datos de cada idea
      ideas.push({ key, ...data }); // Agregar la idea al array
    }
    res.json({ total: ideas.length, ideas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar una idea generada
router.put("/ideas/:key", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { key } = req.params;
    const { content, idea, format } = req.body;
    // Verificar si la idea existe
    const existing = await client.hgetall(key);
    if (!existing || Object.keys(existing).length === 0) {
      return res.status(404).json({ error: "Idea no encontrada" });
    }
    // Actualizar los campos (solo los que se envíen)
    await client.hset(key, {
      content: content || existing.content,
      idea: idea || existing.idea,
      format: format || existing.format,
      createdAt: existing.createdAt // No modificar la fecha original
    });
    const updated = await client.hgetall(key);
    res.json({ message: "Idea actualizada", key, ...updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una idea generada
router.delete("/ideas/:key", async (req, res) => {
  try {
    const client = await getValkeyClient();
    const { key } = req.params;
    const deleted = await client.del(key);
    if (!deleted) return res.status(404).json({ error: "Idea no encontrada" });
    res.json({ message: "Idea eliminada", key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
