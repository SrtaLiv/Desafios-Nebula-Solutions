<script>
  let { format, onclick, disabled = false } = $props();
</script>

<button
  {onclick}
  {disabled}
  class="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-200 text-left group {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
>
  <div class="text-2xl mb-2">{format.title}</div>
  <div class="text-sm text-purple-600 font-medium mb-3">{format.subtitle}</div>
  <div class="text-gray-600 mb-4">{format.description}</div>
  <div class="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg group-hover:bg-purple-50 transition-colors">
    💡 <strong>Por qué funciona:</strong> {format.why}
  </div>
</button>
