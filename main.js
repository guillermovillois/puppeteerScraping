const puppeteer = require('puppeteer');
const fs = require('fs');

let url = 'https://www.walmart.com.ar/ofertazos/almacen';
var data = [];

(async () => {
    const getProducts = async (url) => {
        let data = [];
        const page = await browser.newPage();
        await page.goto(url);
        // get desc product on the page
        const categories = await page.evaluate(() => (Array.from(document.querySelectorAll("a.category__link")).map((each) => each.href)));
        const desc = await page.evaluate(() => (Array.from(document.querySelectorAll("div.prateleira__item")).map(each => each.title)));

        const price = await page.evaluate(() => (Array.from(document.querySelectorAll("span.prateleira__best-price")).map(each => each.outerText)));
        const idnumber = await page.evaluate(() => (Array.from(document.querySelectorAll("div.buy-button-normal")).map(each => each.id)));

        for (var x = 0; x < desc.length; x++) {
            var element = {
                "sku": idnumber[x],
                "product": desc[x],
                "price": price[x]
            };
            data.push(element);

        }

        // console.log(data);
        return data;


    }
    const browser = await puppeteer.launch({ headless: true });

    console.log(await getProducts(url));
    // console.log(data)
    await browser.close();
})();


// Array.from(document.querySelectorAll("span.prateleira__best-price")).map(each => each.text)