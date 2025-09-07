

<script>
	import { onMount } from 'svelte';
	import ContentOutput from '../../components/ContentOutput.svelte';
	let ideas = [];
	let loading = true;
	let error = '';
	let selectedIdea = null;

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

	function handleSelect(idea) {
		selectedIdea = idea;
	}

	function handleBack() {
		selectedIdea = null;
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
			{#if !selectedIdea}
				<div class="grid gap-4">
					{#each ideas as idea}
						<button class="bg-white rounded-xl shadow p-6 w-full text-left hover:bg-purple-50 transition flex flex-col md:flex-row md:items-center md:justify-between gap-2" on:click={() => handleSelect(idea)}>
							<div>
								<span class="font-bold text-lg text-purple-700">{idea.idea}</span>
								<span class="ml-2 text-sm text-gray-500">[{idea.format}]</span>
							</div>
							<div class="text-xs text-gray-400">{formatDate(idea.createdAt)}</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="mb-6">
					<button class="text-purple-600 hover:underline font-medium" on:click={handleBack}>&larr; Volver a la lista</button>
				</div>
				<ContentOutput
					content={{ content: selectedIdea.content, tips: '' }}
					format={{ title: selectedIdea.format }}
					idea={selectedIdea.idea}
				/>
			{/if}
		{/if}
	</div>
</main>
