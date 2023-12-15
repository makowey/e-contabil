<script lang="ts">
    import {goto} from "$app/navigation";

    import {dev} from '$app/environment';
    import {inject} from '@vercel/analytics';
    import Icon from "@iconify/svelte";

    inject({mode: dev ? 'development' : 'production'});
</script>

<svelte:head>
    <title>eContabil</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center">
        <button class="h2 btn btn-md variant-filled-primary cursor-pointer animate-bounce"
                on:click={() => goto('/pfa')}>
            <Icon icon="openmoji:person"/>
            PFA Calculator
        </button>
        <button class="h2 btn btn-md variant-filled-secondary cursor-pointer text-sm"
                on:click={() => goto('/doc/pfa-vs-cim-vs-srl.xlsx')}>
            <Icon icon="openmoji:abacus" width="48"/>
            Excel CIM/PFA/SRL simulator
        </button>
    </div>
</div>

<style lang="postcss">

</style>
