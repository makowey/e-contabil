<script>
    import Icon from '@iconify/svelte';

    export let curs = 4.95;
    export let type = "Sistem real";

    let total = {venit: 0, taxe: 0, net: 0};
    let impozit = 0;
    let cas = 0;
    let cnass = 0;

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
                <li>CAS plafonat la 24 de salarii minime pe economie - 10%</li>
                <li>CNASS plafonat la 24 de salarii minime pe economie - 25%</li>
            </ul>
        </div>
    </aside>
</div>

<div class="flex gap-10">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Rate/h</div>
        <input type="number" placeholder="in euro(€)..."/>
    </div>


    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">Ore/an</div>
        <input type="number" placeholder="ex: 1848 = 21 * 11 luni * 8 ore"/>
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
            <td>CAS plafonat la 24 de salarii minime pe economie - 10%</td>
            <td>{cas}</td>
        </tr>
        <tr>
            <td>CNASS plafonat la 24 de salarii minime pe economie - 25%</td>
            <td>{cnass}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <th colspan="1">Venitul net realizat</th>
            <td>{total.net}</td>
        </tr>
        </tfoot>
    </table>
</div>