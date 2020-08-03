let url = 'https://www.walmart.com/browse/home/dorm-room-essentials/4044_1225301_1225229_7506721';
// let lastPage = Array.from(document.querySelectorAll("ul.paginator-list>li")).map(each => each.textContent)

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

        let desc = await page.evaluate(() => (Array.from(document.querySelectorAll("a.product-title-link.line-clamp.line-clamp-2.truncate-title")).map(each => each.text)));

        let price = await page.evaluate(() => (Array.from(document.querySelectorAll("div.product-price-with-fulfillment")).map(each => each.outerText.split('-')[0].split('$')[1].substring(0, each.outerText.split('-')[0].split('$')[1].length - 1))));

        // const idnumber = await page.evaluate(() => (Array.from(document.querySelectorAll("div.buy-button-normal")).map(each => each.id)));

        for (var x = 0; x < desc.length; x++) {
            var element = {
                // "sku": idnumber[x],
                "product": desc[x],
                "price": price[x]
            };
            data.push(element);

        }


        let lastPage = await page.evaluate(() => (Array.from(document.querySelectorAll("ul.paginator-list>li")).map(each => each.textContent)));
        // console.logNumber(lastPage[lastPage.length - 1])
        for (let i = 2; i <= lastPage[lastPage.length - 1]; i++) {
            desc = await page.evaluate(() => (Array.from(document.querySelectorAll("a.product-title-link.line-clamp.line-clamp-2.truncate-title")).map(each => each.text)));

            price = await page.evaluate(() => (Array.from(document.querySelectorAll("div.product-price-with-fulfillment")).map(each => each.outerText.split('-')[0].split('$')[1].substring(0, each.outerText.split('-')[0].split('$')[1].length - 1))));

            // const idnumber = await page.evaluate(() => (Array.from(document.querySelectorAll("div.buy-button-normal")).map(each => each.id)));

            for (var y = 0; y < desc.length; y++) {
                element = {
                    "product": desc[y],
                    "price": price[y]
                };
                data.push(element);

            }

        }


        // await page.click('[name="commit"]')
        // console.log(data);
        return data;


    }
    const browser = await puppeteer.launch({ headless: true });

    let lista = await getProducts(url);
    // console.log(data)
    const data = JSON.stringify(lista);

    // write JSON string to a file
    await fs.writeFile('user.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    await browser.close();
})();

