<script lang="ts">
    import type {PageData} from './$types';
    import PfaForm from "$lib/component/PFAForm.svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>eContabil - PFA Calculator</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center">


        <PfaForm curs={data.curs}/>
    </div>
</div>

<style lang="postcss">

</style>
