
<script>
	import { Lightbulb } from 'lucide-svelte';
</script>

<nav class="bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow-lg backdrop-blur-md bg-opacity-80">
	<div class="container mx-auto flex items-center justify-between px-6 py-4">
		<div class="flex items-center gap-3">
			<span class="bg-white rounded-full p-2 shadow-md">
				<Lightbulb class="text-yellow-400 w-7 h-7 animate-pulse" />
			</span>
			<a class="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg hover:scale-105 transition-transform duration-200" href="/">
				Solutions
			</a>
		</div>
		<div class="flex gap-4">
							<a href="/" class="px-5 py-2 rounded-lg bg-pink-500 text-white shadow-md hover:bg-pink-600 transition-all duration-200 text-lg font-bold tracking-wide">
								Crear idea
							</a>
							<a href="/formats" class="px-5 py-2 rounded-lg bg-pink-500 text-white shadow-md hover:bg-pink-600 transition-all duration-200 text-lg font-bold tracking-wide">
								Formatos
							</a>
							<a href="/ideas" class="px-5 py-2 rounded-lg bg-pink-500 text-white shadow-md hover:bg-pink-600 transition-all duration-200 text-lg font-bold tracking-wide">
								Ideas
							</a>
		</div>
	</div>
</nav>
