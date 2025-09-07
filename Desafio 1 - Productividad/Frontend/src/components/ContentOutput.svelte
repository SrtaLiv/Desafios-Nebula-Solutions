<script>
  let { content, format, idea } = $props();
  let copied = $state(false);
  
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(content.content);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-lg overflow-hidden">
  <!-- Header -->
  <div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
    <h2 class="text-2xl font-bold mb-2">
      {format.title} generado ✨
    </h2>
    <p class="opacity-90">Basado en: "{idea}"</p>
  </div>
  
  <!-- Contenido -->
  <div class="p-8">
    <div class="bg-gray-50 rounded-xl p-6 mb-6 font-mono text-sm whitespace-pre-line">
      {content.content}
    </div>
    
    <!-- Tips -->
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <h4 class="font-bold text-blue-800 mb-2">💡 Tips para este formato:</h4>
      <p class="text-blue-700">{content.tips}</p>
    </div>
    
    <!-- Acciones -->
    <div class="flex gap-4">
      <button
        onclick={copyToClipboard}
        class="flex-1 bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors font-medium flex items-center justify-center gap-2"
      >
        {#if copied}
          ✅ ¡Copiado!
        {:else}
          📋 Copiar Contenido
        {/if}
      </button>
      
      <button
        onclick={() => window.print()}
        class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors font-medium"
      >
        🖨️ Imprimir
      </button>
    </div>
  </div>
</div>
