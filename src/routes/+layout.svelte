<script lang="ts">
	import './root.css';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta content={data.description} name="description" />
	<link href={data.author} rel="author" />
	<meta content={data.generator} name="generator" />
	<meta content={data.keywords.join(',')} name="keywords" />
</svelte:head>

<div class="body">
	<main class="main">
		<slot />
	</main>
	<footer class="footer">Copyright &copy; 2023 Hokki Suwanda. All rights reserved.</footer>
</div>

<style lang="postcss">
	.body {
		@apply flex flex-col;
		@apply text-black;
		@apply dark:text-white;
	}

	.main {
		@apply h-screen min-h-screen;
	}

	.footer {
		@apply fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full flex-row items-end justify-center;
		@apply flex flex-row;
		@apply items-end justify-center;
		@apply bg-gradient-to-t from-white via-white dark:from-black dark:via-black;
		@apply pb-3;
		@apply text-xs;
	}
</style>
