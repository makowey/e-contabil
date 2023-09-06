<script lang="ts">
    import '../app.postcss';
    import {AppBar, AppShell} from '@skeletonlabs/skeleton';
    import {isMobile} from "$lib/stores";
    import Icon from "@iconify/svelte";

    let innerWidth = 0
    let innerHeight = 0;

    $: isMobile.set(innerWidth <= 560), console.log("isMobile: ", $isMobile);
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<!-- App Shell -->
<AppShell>
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-xl uppercase">e-Contabil</strong>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a
                        class="btn btn-sm variant-ghost-surface"
                        href="mailto:makowey@games.com"
                        target="_blank"
                        rel="noreferrer"
                >
                    <Icon icon="line-md:email-twotone" width="25"/>
                </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot/>

    <svelte:fragment slot="pageFooter">
        <div class="">
            <p class="text-xs animate-pulse text-left ml-2"> Inner Width: {innerWidth}, Inner Height: {innerHeight},
                mobile: {$isMobile} </p>
            <!--            <span class="float-right text-xs">developed by @makowey</span>-->
        </div>

    </svelte:fragment>
</AppShell>
