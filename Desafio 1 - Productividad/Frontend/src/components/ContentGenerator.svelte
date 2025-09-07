<script>
  import FormatCard from './FormatCard.svelte';
  import ContentOutput from './ContentOutput.svelte';
  
  let idea = $state('');
  let selectedFormat = $state(null);
  let generatedContent = $state(null);
  let isGenerating = $state(false);
  
  const formats = [
    {
      id: 'carousel',
      title: '📊 Carrusel',
      subtitle: 'Instagram/LinkedIn',
      description: 'Estructura: portada + 3-5 slides con bullets claros',
      why: 'Ideal para contenido educativo que se explica paso a paso'
    },
    {
      id: 'story',
      title: '📖 Historia',
      subtitle: 'IG/Facebook',
      description: 'Storytelling breve con CTA',
      why: 'Genera conexión emocional y engagement personal'
    },
    {
      id: 'quote',
      title: '💬 Frase Destacada',
      subtitle: 'Tweet/Post',
      description: 'Cita corta y potente',
      why: 'Fácil de compartir y recordar, genera viralidad'
    },
    {
      id: 'youtube',
      title: '🎥 Guión YouTube',
      subtitle: 'Video largo',
      description: 'Intro + puntos clave + conclusión + CTA',
      why: 'Estructura probada para retener audiencia y generar suscriptores'
    },
    {
      id: 'instagram',
      title: '📝 Descripción IG',
      subtitle: 'Post/Reel',
      description: 'Copy con gancho + hashtags sugeridos',
      why: 'Optimizado para el algoritmo de Instagram y descubrimiento'
    },
    {
      id: 'tiktok',
      title: '🎬 Guión TikTok',
      subtitle: 'Video corto',
      description: 'Hook 3s + desarrollo + cierre llamativo',
      why: 'Diseñado para captar atención inmediata en formato vertical'
    },
    {
      id: 'plan',
      title: '📅 Plan de Acción',
      subtitle: 'Checklist',
      description: 'Pasos: investigar, crear, editar, publicar',
      why: 'Te ayuda a ejecutar la idea de manera organizada y eficiente'
    }
  ];
  
  function selectFormat(format) {
    selectedFormat = format;
    generateContent();
  }
  
  async function generateContent() {
    if (!idea.trim() || !selectedFormat) return;
    
    isGenerating = true;
    
    // Simular generación de contenido
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    generatedContent = generateContentForFormat(idea, selectedFormat);
    isGenerating = false;
  }
  
  function generateContentForFormat(baseIdea, format) {
    const templates = {
      carousel: {
        content: [
          `🎯 ${baseIdea}`,
          `📌 Punto clave 1: Fundamentos esenciales`,
          `💡 Punto clave 2: Mejores prácticas`,
          `⚡ Punto clave 3: Errores comunes a evitar`,
          `🚀 ¿Cuál vas a implementar primero?`
        ],
        tips: 'Usa colores consistentes y mantén el texto legible. Cada slide debe tener máximo 2-3 líneas.'
      },
      story: {
        content: `Cuando empecé con "${baseIdea.toLowerCase()}", no sabía por dónde comenzar... 🤔

¿Te ha pasado lo mismo?

Después de mucha práctica, descubrí que lo más importante es...

💭 ¿Qué opinas? ¿Has tenido una experiencia similar?`,
        tips: 'Las historias funcionan mejor cuando son personales y generan identificación.'
      },
      quote: {
        content: `"${baseIdea}" no es solo una idea, es el primer paso hacia el éxito. 💪✨`,
        tips: 'Las frases cortas y motivacionales tienen mayor potencial viral.'
      },
      youtube: {
        content: `🎬 GUIÓN PARA YOUTUBE

📍 INTRO (0-15s):
"Hoy te voy a explicar todo sobre ${baseIdea.toLowerCase()}. Si te quedas hasta el final, vas a entender exactamente cómo aplicarlo."

📍 DESARROLLO (15s-8min):
• Punto 1: ¿Qué es y por qué importa?
• Punto 2: Pasos prácticos para implementarlo
• Punto 3: Errores comunes y cómo evitarlos
• Punto 4: Ejemplos reales y casos de éxito

📍 CIERRE (8-10min):
"Si este video te sirvió, dale like y suscribite para más contenido como este. ¿Qué tema te gustaría que cubra en el próximo video?"`,
        tips: 'Mantén la energía alta en los primeros 15 segundos. Usa ejemplos visuales.'
      },
      instagram: {
        content: `🔥 ${baseIdea} 

Esto es lo que necesitas saber 👇

✨ Es fundamental para tu crecimiento
💡 Te ahorra tiempo y esfuerzo  
🚀 Los resultados se ven rápido

¿Ya lo estás aplicando? Contame en los comentarios 👇

#contenido #tips #crecimiento #exito #motivacion #aprendizaje`,
        tips: 'Usa emojis para hacer el texto más visual. Los hashtags deben ser relevantes y no más de 10.'
      },
      tiktok: {
        content: `🎬 GUIÓN TIKTOK (15-30s)

🚨 HOOK (0-3s): 
"Si no sabes sobre ${baseIdea.toLowerCase()}, estás perdiendo oportunidades"

📱 DESARROLLO (3-25s):
• Tip 1: [Mostrar ejemplo visual]
• Tip 2: [Transición rápida]  
• Tip 3: [Resultado sorprendente]

💥 CIERRE (25-30s):
"Sígueme para más tips como este"`,
        tips: 'Usa transiciones rápidas y elementos visuales llamativos. El hook debe generar curiosidad inmediata.'
      },
      plan: {
        content: `📋 PLAN DE ACCIÓN: ${baseIdea}

🔍 INVESTIGACIÓN (30 min)
□ Buscar referencias y ejemplos
□ Identificar audiencia objetivo
□ Definir mensaje clave

✍️ CREACIÓN (45 min)  
□ Escribir copy/guión
□ Diseñar elementos visuales
□ Revisar y optimizar

🎬 PRODUCCIÓN (30 min)
□ Grabar/crear contenido
□ Editar y ajustar
□ Añadir elementos finales

📱 PUBLICACIÓN (15 min)
□ Subir a plataformas
□ Programar horarios óptimos
□ Responder primeros comentarios

⏱️ TIEMPO TOTAL: 2 horas`,
        tips: 'Divide las tareas en bloques de tiempo realistas. Usa checkboxes para hacer seguimiento.'
      }
    };
    
    return templates[format.id] || { content: 'Contenido generado', tips: 'Tips generales' };
  }
  
  function resetGenerator() {
    selectedFormat = null;
    generatedContent = null;
    idea = '';
  }
</script>

<div class="max-w-6xl mx-auto">
  <!-- Input de idea -->
  <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">💡 Ingresa tu idea</h2>
    <div class="flex gap-4">
      <input
        bind:value={idea}
        placeholder="Ej: La importancia de usar Git como programador"
        class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
      />
      {#if generatedContent}
        <button
          onclick={resetGenerator}
          class="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
        >
          Nueva Idea
        </button>
      {/if}
    </div>
  </div>

  {#if idea.trim() && !generatedContent}
    <!-- Selección de formato -->
    <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">🎨 Elige el formato</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each formats as format}
          <FormatCard 
            {format} 
            onclick={() => selectFormat(format)}
            disabled={isGenerating}
          />
        {/each}
      </div>
    </div>
  {/if}

  {#if isGenerating}
    <!-- Loading -->
    <div class="bg-white rounded-2xl shadow-lg p-12 text-center">
      <div class="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-xl text-gray-600">Generando contenido para {selectedFormat?.title}...</p>
    </div>
  {/if}

  {#if generatedContent && !isGenerating}
    <!-- Contenido generado -->
    <ContentOutput 
      content={generatedContent} 
      format={selectedFormat}
      {idea}
    />
  {/if}
</div>
