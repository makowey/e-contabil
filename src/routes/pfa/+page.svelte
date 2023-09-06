<script lang="ts">
	import type {PageData} from './$types';
	import PfaForm from "$lib/component/PFAForm.svelte";

	export let data: PageData;
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">PFA Calculator</h2>

	<PfaForm curs={data.curs}/>
	</div>
</div>

<style lang="postcss">

</style>
