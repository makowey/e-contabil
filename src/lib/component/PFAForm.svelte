<script>
    import Icon from '@iconify/svelte';

    export let curs = 4.95;
    export let salariuMinim = 3000;
    export let plafonBrut = 300000;
    export let type = "Sistem real";
    let rate = 15;
    let hours = 1848;

    let total = {incasari: 0, taxe: 0, net: 0};

    let plafonNumarLuni = 24;

    let incasari = 0;
    $: incasari = rate * hours * curs;
    let impozit = 0;
    $: impozit = Math.round(0.10 * incasari);
    let CAS = 0;
    $: CAS = Math.round(0.10 * salariuMinim * plafonNumarLuni) + (incasari > plafonBrut ? Math.round(0.10 * (incasari - plafonBrut)) : 0);
    let CNASS = 0;
    $: CNASS = Math.round(0.25 * salariuMinim * plafonNumarLuni);
    let taxe = 0;
    $: taxe = impozit + CAS + CNASS;
    let net;
    $: net = incasari - taxe;
    $: net = net > 0 ? net : 0;

    $: total = {incasari, taxe, net}
</script>

<div>
    <aside class="alert variant-filled-surface">
        <!-- Icon -->
        <div>
            <Icon icon="clarity:info-solid" width="100"/>
        </div>
        <!-- Message -->
        <div class="alert-message">
            <h3 class="h3">Cod fiscal 2023 ({type})</h3>
            <ul class="list">
                <li>Impozit pe venit - 10%</li>
                <li>CAS plafonat la {plafonNumarLuni} de salarii minime pe economie - 10%</li>
                <li>CNASS plafonat la {plafonNumarLuni} de salarii minime pe economie - 25%</li>
                <li class="text-xs italic text-lime-300">Propunere: In cazul PFA, se mențin plafoanele actuale de 24 de
                    salarii pentru plata CAS si CASS, dar daca venitul net depășește 60.000 euro, se plătește CASS
                    pentru diferența de venit peste 60.000 euro.
                </li>
            </ul>
        </div>
    </aside>
</div>

<div class="flex gap-10">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Rate/h</div>
        <input type="number" placeholder="in euro(€)..." bind:value={rate}/>
    </div>

    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Ore/an</div>
        <input type="number" placeholder="ex: 1848 = 21 * 11 luni * 8 ore" bind:value={hours}/>
    </div>

    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Salariu minim</div>
        <input type="number" placeholder="salariu minim pe economie" bind:value={salariuMinim}/>
    </div>

    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Plafonare(luni)</div>
        <input type="number" placeholder="numar de luni" bind:value={plafonNumarLuni}/>
    </div>

    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Curs valutar(€)</div>
        <input type="number" placeholder="in lei..." bind:value={curs}/>
    </div>
</div>

<div class="table-container">
    <!-- Native Table Element -->
    <table class="table table-hover">
        <thead>
        <tr>
            <th>Descriere</th>
            <th>Suma</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Impozit pe venit - 10%</td>
            <td>{impozit}</td>
        </tr>
        <tr>
            <td>CAS plafonat la {plafonNumarLuni} de salarii minime pe economie - 10%</td>
            <td>{CAS}</td>
        </tr>
        <tr>
            <td>CNASS plafonat la {plafonNumarLuni} de salarii minime pe economie - 25%</td>
            <td>{CNASS}</td>
        </tr>
        </tbody>

        <tfoot>
        <tr>
            <th colspan="1">Venitul brut realizat</th>
            <td>{total.incasari.toLocaleString("ro-RO")}
                lei {total.incasari > 0 ? '(' + Math.round(total.incasari / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
        </tr>
        <tr>
            <th colspan="1">Taxe</th>
            <td>{total.taxe.toLocaleString("ro-RO")}
                lei {total.taxe > 0 ? '(' + Math.round(total.taxe / curs).toLocaleString("ro-RO") + '€)' : '' }</td>
        </tr>
        <tr>
            <th colspan="1">Venitul net realizat</th>
            <td>{total.net.toLocaleString("ro-RO")}
                lei {total.net > 0 ? '(' + Math.round(total.net / curs).toLocaleString("ro-RO") + '€)' : '' }
            </td>
        </tr>
        </tfoot>
    </table>

    {#if total.net > 0}
        <p class="text-xs italic text-cyan-400 max-w-4xl text-center m-0 m-auto">
            Venitul net realizat este echivalentul unui CIM(contract de munca) cu
            salariul net de {Math.round(total.net / 12).toLocaleString("ro-RO")} lei
            ({Math.round(total.net / 12 / curs).toLocaleString("ro-RO")}€) pe luna in conditiile in care ca si
            angajat se beneficiaza de cel putin 21 de zile lucratoare( + zile libere oficiale). Ca si angajat trebuie
            luat in calcul si alte beneficii care nu vin in sarcina angajatului: bonuri de masa, vouchere de vacanta,
            comisioane, al 13-lea salariu, etc...
        </p>
    {/if}
</div>