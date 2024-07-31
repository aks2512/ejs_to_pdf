import ejs from "ejs";
import puppeteer from "puppeteer";
import obj from './object.json' assert { type: "json" };

async function generatePDFfromHTML(htmlContent, outputPath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.emulateMediaType('screen');
    await page.pdf({ path: outputPath, width: 1100, height: 1355 });
    await browser.close();
}

ejs.renderFile("./index_model.ejs", obj, async (err, html) => {
    if (err) {
        throw err;
    } else {
        generatePDFfromHTML(html, './pdfs/index_model.pdf')
        .then(() => console.log('Sucesso'))
        .catch(() => console.log('Houve um erro'));
    }
});

