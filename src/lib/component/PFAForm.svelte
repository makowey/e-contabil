<script>
    import Icon from '@iconify/svelte';
    import {isMobile} from "$lib/stores.js";
    import LottieAnimation from "$lib/player/LottieAnimation.svelte";
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import {fly} from 'svelte/transition';
    import {onMount} from "svelte";

    export let curs = 4.95;
    export let salariuMinim = 3300;
    export let type = "Sistem real";
    let rate = 5;

    let total = {incasari: 0, taxe: 0, net: 0};

    let plafonNumarLuni = 24;
    const zile = 21;
    let hours = zile * 8 * 11;
    let luniPrestate = 1;
    $: luniPrestate = (hours / 8 / zile).toFixed(1);

    let incasari = 0;
    $: incasari = rate * hours * curs;
    let CAS = 0;
    $: CAS = Math.round(0.25 * salariuMinim * plafonNumarLuni);
    let CASS = 0;
    const CASS_LUNI = 60;
    $: CASS = (incasari < CASS_LUNI * salariuMinim) ? Math.round(0.10 * incasari) : Math.round(0.10 * salariuMinim * CASS_LUNI);

    let deductibil = 0;

    let impozit = 0;
    $: impozit = Math.round(0.10 * (incasari - CAS - CASS - deductibil));

    let taxe = 0;
    $: taxe = impozit + CAS + CASS;
    let net;
    $: net = incasari - taxe;
    $: net = net > 0 ? net : 0;

    $: plafonNumarLuni = incasari >= (24 * salariuMinim) ? 24 : (incasari >= (12 * salariuMinim) ? 12 : 6);

    $: total = {incasari, taxe, net}
    let percentage = 0;
    $: percentage = ((total.net / total.incasari) * 100).toFixed(2).toLocaleString()

    let progressBar;
    $: progressBar = undefined, setTimeout(() => progressBar = percentage, 1000);

    let euro = true;

    let showMessage = true;

    onMount(() => {
        setTimeout(() => showMessage = false, 2500)
    })
</script>

{#if !showMessage}
    <div class="cursor-pointer -mt-10 p-0 m-0 absolute {$isMobile ? 'hidden' : ''}" on:click={() => showMessage = !showMessage}>
        <p class="text-sm">PFA</p>
        <Icon icon="clarity:info-solid" width="55"/>
    </div>
{:else}
    <div class="w-3/4 mt-5 lg:w-full text-left lg:text-center cursor-pointer {showMessage? '' : 'hidden'}"
         in:fly={{ delay: 200, y: -200 }} out:fly={{y: -200, duration: 300}}
         on:click={() => showMessage = !showMessage}>
        <aside class="alert variant-filled-warning">
            <!-- Icon -->
            <div class="hidden lg:block">
                <Icon icon="clarity:info-solid" width="100"/>
            </div>
            <!-- Message -->
            <div class="alert-message">
                <h3 class="h3">Cod fiscal 2024 ({type})</h3>
                <ul class="list">
                    <li>Impozit pe venit - 10%</li>
                    <li>CAS plafonat la {plafonNumarLuni} de salarii minime pe economie - 25% (deductibil)</li>
                    <li>CASS plafonat la {CASS_LUNI} de salarii minime pe economie - 10% (deductibil)</li>
                    <li class="text-xs italic">19.09.2023: Persoanele care au venituri din
                        activități independente vor avea un nou plafon pentru plata CASS de 10%.
                        <br>Practic, ar urma să plătească 10% la veniturile nete dacă au sub {CASS_LUNI} de salarii
                        minime.
                        Dacă au mai mult, atunci va fi plafonat la cele {CASS_LUNI}.
                    </li>
                    <li class="text-xs pl-3 font-bold">
                        01.10.2023: Salariul minim pe economie a crescut la 3300 lei.
                    </li>
                </ul>
            </div>
        </aside>
    </div>
{/if}

{#if $isMobile}
    <p class="text-xs text-warning-50 animate-pulse">Momentan, formularul nu suporta rezolutie mai mica de 673
        pixeli(modul portrait). <br>Intoarceti telefonul(modul landscape).</p>
    <LottieAnimation path="portrait_landscape"/>
{:else }
    <main>
        <div class="grid grid-cols-2 justify-between gap-2 text-md pb-2">
            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim w-72">Rate/h (€) <span class="text-xs w-36">{(rate * curs).toFixed(2)}
                    lei/ora, {(rate * 8 * zile)} €/luna, {Math.round(rate * 8 * zile * curs)} lei/luna({zile} z.)</span>
                </div>
                <input type="number" placeholder="in euro(€)..." bind:value={rate}/>
            </div>

            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim w-72">Ore/an <span
                        class="text-xs w-3/4">echivalentul a {(hours / 8).toFixed(1)}
                    zile / ~{luniPrestate} luni de CIM (8h/zi)</span>
                </div>
                <input type="number" placeholder="ex: 1848 = 21 * 11 luni * 8 ore" bind:value={hours}/>
            </div>

            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim w-72">Salariu minim pe economie</div>
                <input type="number" placeholder="salariu brut" bind:value={salariuMinim}/>
            </div>

            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim w-72">Plafonare (nr. de luni)</div>
                <input type="number" placeholder="numar de luni" bind:value={plafonNumarLuni}/>
            </div>

            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim w-72">Cheltuieli deductibile (extra)</div>
                <input type="number" placeholder="cheltuieli deductibile" bind:value={deductibil}/>
            </div>

            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                <div class="input-group-shim w-72">Curs valutar (€)</div>
                <input type="number" placeholder="in lei..." bind:value={curs}/>
            </div>
        </div>

        <div class="table-container w-94 lg:w-full">
            <!-- Native Table Element -->
            <table class="table table-hover">
                <thead>
                <tr>
                    <th class="text-left">Descriere</th>
                    <th class="text-right">Suma</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="text-left">Impozit pe venit - 10%</td>
                    <td class="text-right">{impozit}
                        lei {impozit > 0 && euro ? '(' + Math.round(impozit / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
                </tr>
                <tr>
                    <td class="text-left">CAS plafonat la {plafonNumarLuni} de salarii minime pe economie - 25%
                        (deductibil)
                    </td>
                    <td class="text-right">{CAS}
                        lei {CAS > 0 && euro ? '(' + Math.round(CAS / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
                </tr>
                <tr>
                    <td class="text-left">CASS plafonat la {CASS_LUNI} de salarii minime pe economie - 10%
                        (deductibil)
                    </td>
                    <td class="text-right">{CASS}
                        lei {CASS > 0 && euro ? '(' + Math.round(CASS / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
                </tr>
                </tbody>

                <tfoot>
                <tr>
                    <th colspan="1">Venitul brut realizat</th>
                    <td class="text-right">{total.incasari.toLocaleString("ro-RO")}
                        lei {total.incasari > 0 && euro ? '(' + Math.round(total.incasari / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
                </tr>
                <tr>
                    <th colspan="1">Taxe ({(100 - percentage).toFixed(2)}%)</th>
                    <td class="text-right">{total.taxe.toLocaleString("ro-RO")}
                        lei {total.taxe > 0 && euro ? '(' + Math.round(total.taxe / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
                </tr>
                <tr>
                    <th colspan="1">Venitul net realizat ({percentage}%)
                        <ProgressBar label="Progress Bar"
                                     value={progressBar}
                                     max={100} meter="bg-fuchsia-600"
                                     track="bg-error-50-900-token"/>
                    </th>
                    <td class="text-right font-bold text-indigo-100 animate-pulse">{total.net.toLocaleString("ro-RO")}
                        lei {total.net > 0 && euro ? '(' + Math.round(total.net / curs).toLocaleString("ro-RO") + '€)' : '' }
                    </td>
                </tr>
                </tfoot>
            </table>

            <div class="card variant-filled-secondary alert text-md italic max-w-4xl text-center mx-auto m-2 shadow-4xl">
                Venitul net realizat este echivalentul unui CIM(contract de munca) cu
                salariul net de {Math.round(total.net / 12).toLocaleString("ro-RO")} lei
                ({Math.round(total.net / 12 / curs).toLocaleString("ro-RO")}€) pe luna in conditiile in care ca si
                angajat se beneficiaza de cel putin 21 de zile lucratoare( + zile libere oficiale). Ca si angajat
                trebuie
                luat in calcul si alte beneficii care nu vin in sarcina angajatului: bonuri de masa, vouchere de
                vacanta,
                comisioane, al 13-lea salariu, etc...
            </div>
        </div>
    </main>
{/if}