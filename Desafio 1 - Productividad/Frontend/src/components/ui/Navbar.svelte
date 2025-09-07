<script>
	import { Lightbulb } from 'lucide-svelte';
</script>

<nav class="bg-white shadow-md">
	<div class="container mx-auto flex items-center justify-between px-4 py-4">
		<div class="flex items-center">
			<Lightbulb />
			<a class="text-2xl" href="/">Solutions</a>
		</div>
		<div class="flex space-x-6">
			<div class="rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-red-600">
				<a href="/" class="text-xl font-bold text-gray-800"> Crear idea </a>
			</div>
			<div class="rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-red-600">
				<a href="/formats" class="text-xl font-bold text-gray-800"> Formatos </a>
			</div>
            	<div class="rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-red-600">
				<a href="/ideas" class="text-xl font-bold text-gray-800"> Ideas </a>
			</div>
		</div>
	</div>
</nav>
