let url = 'https://www.walmart.com/browse/home/dorm-room-essentials/4044_1225301_1225229_7506721';


const puppeteer = require('puppeteer');
const fs = require('fs');

// let url = 'https://www.walmart.com.ar/ofertazos/almacen';
var data = [];

(async () => {
    const getProducts = async (url) => {
        let data = [];
        const page = await browser.newPage();
        await page.goto(url);
        // get desc product on the page
        // const categories = await page.evaluate(() => (Array.from(document.querySelectorAll("a.category__link")).map((each) => each.href)));

        const desc = await page.evaluate(() => (Array.from(document.querySelectorAll("a.product-title-link.line-clamp.line-clamp-2.truncate-title")).map(each => each.text)));

        const price = await page.evaluate(() => (Array.from(document.querySelectorAll("div.product-price-with-fulfillment")).map(each => each.outerText.split('-')[0].split('$')[1].substring(0, each.outerText.split('-')[0].split('$')[1].length - 1))));

        // const idnumber = await page.evaluate(() => (Array.from(document.querySelectorAll("div.buy-button-normal")).map(each => each.id)));

        for (var x = 0; x < desc.length; x++) {
            var element = {
                // "sku": idnumber[x],
                "product": desc[x],
                "price": price[x]
            };
            data.push(element);

        }
        // await page.click('[name="commit"]')
        // console.log(data);
        return data;


    }
    const browser = await puppeteer.launch({ headless: true });

    console.log(await getProducts(url));
    // console.log(data)
    await browser.close();
})();

