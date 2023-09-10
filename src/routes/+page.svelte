<script lang="ts">
	import type { PageData } from './$types';

	let headingElement: HTMLHeadingElement;

	export let data: PageData;
</script>

<svelte:head>
	<title>Hokki Suwanda</title>
	<meta content="blabla" name="description" />
</svelte:head>

<h1 bind:this={headingElement}>{data['hello-world']}</h1>
