<script lang="ts">
    import {goto} from "$app/navigation";

    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import Icon from "@iconify/svelte";

    inject({ mode: dev ? 'development' : 'production' });
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center">
        <button class="h2 btn btn-md variant-filled-primary cursor-pointer animate-bounce" on:click={() => goto('/pfa')}>
            <Icon icon="openmoji:person" /> PFA Calculator
        </button>
    </div>
</div>

<style lang="postcss">

</style>
