export const load = (async () => {
    const date: Date = new Date();
    const url = `http://www.infovalutar.ro/bnr/${date.getFullYear()}/${date.getUTCMonth() + 1}/${date.getDate()}/eur`;
    const response = await fetch(url);
    const curs = await response.text();

    console.log(`Curs valutar: ${url}: ${curs}`);

    return {curs};
});