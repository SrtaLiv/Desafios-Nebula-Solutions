<script>
  import { onMount } from 'svelte';
  import FormatCard from './FormatCard.svelte';
  import ContentOutput from './ContentOutput.svelte';

  let idea = $state('');
  let selectedFormat = $state(null);
  let generatedContent = $state(null);
  let isGenerating = $state(false);
  let formats = $state([]);
  let loadingFormats = $state(true);

  // Cargar formatos desde el backend al montar
  onMount(async () => {
    try {
    console.log('Fetching formatos desde /formats');
    const res = await fetch('/api/formats');
      const data = await res.json();
    console.log('Respuesta formatos:', data);
    formats = data.formats || [];
    } catch (e) {
      formats = [];
    } finally {
      loadingFormats = false;
    }
  });
  
  async function selectFormat(format) {
    selectedFormat = format;
    await generateContent();
  }
  
  async function generateContent() {
    if (!idea.trim() || !selectedFormat) return;
    isGenerating = true;
    generatedContent = null;
    try {
    console.log('Generando contenido con', { idea, format: selectedFormat.id });
      const res = await fetch('api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, format: selectedFormat.id })
      });
      if (!res.ok) throw new Error('Error generando contenido');
    const data = await res.json();
    console.log('Respuesta generación:', data);
    generatedContent = data;
    } catch (e) {
      generatedContent = { content: 'Error generando contenido', tips: '' };
    } finally {
      isGenerating = false;
    }
  }
  
  // Se elimina generateContentForFormat, ya no se usa
  
  function resetGenerator() {
    selectedFormat = null;
    generatedContent = null;
    idea = '';
  }
</script>

<div class="max-w-6xl mx-auto">
  <!-- Input de idea SIEMPRE visible -->
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
    {#if loadingFormats}
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center text-gray-500">Cargando formatos...</div>
    {:else if formats.length === 0}
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center text-gray-500">No hay formatos disponibles.</div>
    {:else}
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
