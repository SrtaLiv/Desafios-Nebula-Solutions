<script>
	import ContentGenerator from '../components/ContentGenerator.svelte';
</script>

<main class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
	
	<div class="container mx-auto px-4 py-8">
		<header class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-800">Banco de Ideas</h1>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">
				Transforma una idea en múltiples formatos de contenido para todas tus redes sociales
			</p>
		</header>

		<ContentGenerator />
	</div>
</main>
