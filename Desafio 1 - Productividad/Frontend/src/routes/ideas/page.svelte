
<script>
	import { onMount } from 'svelte';
	let ideas = [];
	let loading = true;
	let error = '';

	async function fetchIdeas() {
		loading = true;
		error = '';
		try {
			const res = await fetch('/api/ideas');
			const data = await res.json();
			ideas = data.ideas || [];
		} catch (e) {
			error = 'Error cargando ideas';
		} finally {
			loading = false;
		}
	}

	onMount(fetchIdeas);

	function formatDate(dateStr) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		return d.toLocaleString();
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-8 text-gray-800">💡 Ideas generadas</h1>
		{#if loading}
			<div class="text-gray-500">Cargando ideas...</div>
		{:else if error}
			<div class="text-red-500">{error}</div>
		{:else if ideas.length === 0}
			<div class="text-gray-500">No hay ideas generadas.</div>
		{:else}
			<div class="grid gap-6">
				{#each ideas as idea}
					<div class="bg-white rounded-xl shadow p-6">
						<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
							<div>
								<span class="font-bold text-lg text-purple-700">{idea.idea}</span>
								<span class="ml-2 text-sm text-gray-500">[{idea.format}]</span>
							</div>
							<div class="text-xs text-gray-400">{formatDate(idea.createdAt)}</div>
						</div>
						<pre class="bg-gray-50 rounded p-4 text-sm whitespace-pre-wrap overflow-x-auto">{idea.content}</pre>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
