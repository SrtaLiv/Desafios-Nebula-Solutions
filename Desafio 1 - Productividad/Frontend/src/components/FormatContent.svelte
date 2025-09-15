<script>
	import { onMount } from 'svelte';

	let formats = [];
	let loading = true;
	let error = '';
	let editingId = null;
	let editName = '';
	let editPrompt = '';
	let editTips = '';

	// Campos para nuevo formato
	let newId = '';
	let newName = '';
	let newPrompt = '';
	let newTips = '';
	let creating = false;
	let createError = '';
async function addFormat() {
	createError = '';
	if (!newId.trim() || !newName.trim() || !newPrompt.trim() || !newTips.trim()) {
		createError = 'Todos los campos son obligatorios';
		return;
	}
	creating = true;
	try {
		const res = await fetch('/api/formats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: newId, name: newName, prompt: newPrompt, tips: newTips })
		});
		if (!res.ok) throw new Error('Error creando formato');
		await fetchFormats();
		newId = '';
		newName = '';
		newPrompt = '';
		newTips = '';
	} catch (e) {
		createError = 'Error al crear formato';
	} finally {
		creating = false;
	}
}

	async function fetchFormats() {
		loading = true;
		error = '';
		try {
			const res = await fetch('/api/formats');
			const data = await res.json();
			formats = data.formats || [];
		} catch (e) {
			error = 'Error cargando formatos';
		} finally {
			loading = false;
		}
	}

	onMount(fetchFormats);

	function startEdit(format) {
		editingId = format.id;
		editName = format.name;
		editPrompt = format.prompt;
		editTips = format.tips;
	}

	function cancelEdit() {
		editingId = null;
		editName = '';
		editPrompt = '';
		editTips = '';
	}

	async function saveEdit() {
		try {
			const res = await fetch(`/api/formats/${editingId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: editName, prompt: editPrompt, tips: editTips })
			});
			if (!res.ok) throw new Error('Error actualizando formato');
			await fetchFormats();
			cancelEdit();
		} catch (e) {
			alert('Error al guardar cambios');
		}
	}

	async function deleteFormat(id) {
		if (!confirm('¿Eliminar este formato?')) return;
		try {
			const res = await fetch(`/api/formats/${id}`, { method: 'DELETE' });
			if (!res.ok) throw new Error('Error eliminando formato');
			await fetchFormats();
		} catch (e) {
			alert('Error al eliminar formato');
		}
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
	<div class="max-w-3xl mx-auto px-4 py-10">
		<h1 class="text-4xl font-extrabold mb-10 text-gray-800 flex items-center gap-2">
			<span class="inline-block text-pink-400 animate-pulse">🎨</span> Administrar formatos
		</h1>

		<!-- Formulario para agregar formato -->
		<div class="bg-white/90 rounded-2xl shadow-lg p-8 mb-10 border border-pink-100">
			<h2 class="text-xl font-bold mb-6 text-pink-600">Agregar nuevo formato</h2>
			<div class="grid md:grid-cols-4 gap-4 mb-4">
				<input class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 outline-none transition-all" bind:value={newId} placeholder="ID único (ej: carousel)" />
				<input class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 outline-none transition-all" bind:value={newName} placeholder="Nombre" />
				<input class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 md:col-span-2 outline-none transition-all" bind:value={newPrompt} placeholder="Prompt" />
				<input class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 md:col-span-2 outline-none transition-all" bind:value={newTips} placeholder="Tips" />
			</div>
			<div class="flex gap-4 items-center mt-2">
				<button class="bg-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-pink-600 transition-all disabled:opacity-60" on:click={addFormat} disabled={creating}>Agregar</button>
				{#if createError}
					<span class="text-red-500 font-semibold">{createError}</span>
				{/if}
			</div>
		</div>

		{#if loading}
			<div class="text-gray-500 text-center py-10">Cargando formatos...</div>
		{:else if error}
			<div class="text-red-500 text-center py-10">{error}</div>
		{:else if formats.length === 0}
			<div class="text-gray-500 text-center py-10">No hay formatos cargados.</div>
		{:else}
			<div class="grid gap-8">
				{#each formats as format}
					<div class="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center gap-6 border border-gray-100 hover:shadow-xl transition-all">
						{#if editingId === format.id}
							<div class="flex-1 grid gap-3">
								<input class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 outline-none transition-all" bind:value={editName} placeholder="Nombre" />
								<textarea class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 outline-none transition-all" bind:value={editPrompt} placeholder="Prompt" rows="2"></textarea>
								<textarea class="border-2 border-pink-200 focus:border-pink-400 rounded-lg px-3 py-2 outline-none transition-all" bind:value={editTips} placeholder="Tips" rows="2"></textarea>
							</div>
							<div class="flex flex-col gap-2 min-w-[120px]">
								<button class="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all" on:click={saveEdit}>Guardar</button>
								<button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-all" on:click={cancelEdit}>Cancelar</button>
							</div>
						{:else}
							<div class="flex-1">
								<div class="font-bold text-xl mb-1 text-pink-600">{format.name}</div>
								<div class="text-gray-700 mb-1"><span class="font-semibold text-gray-500">Prompt:</span> {format.prompt}</div>
								<div class="text-pink-700 text-sm"><span class="font-semibold">Tips:</span> {format.tips}</div>
							</div>
							<div class="flex flex-col gap-2 min-w-[120px]">
								<button class="bg-yellow-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-all" on:click={() => startEdit(format)}>Editar</button>
								<button class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all" on:click={() => deleteFormat(format.id)}>Eliminar</button>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
