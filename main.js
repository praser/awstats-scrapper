const fs = require('fs');
const os = require('os');
const puppeteer = require('puppeteer');

const scrapHistoricoMensal = async (awstatsUrl, executablePath) => {
    const browser = await puppeteer.launch  ({ executablePath, headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(awstatsUrl);

    // captura os dados da tabela de historico mensal
    const historicoMensal = await page.evaluate(() => {
        const estatisticasMensais = [];
        // caputra as linhas da table
        const meses = document.querySelectorAll('body > table:nth-child(45) > tbody > tr:nth-child(2) > td > table > tbody > tr > td > center > table:nth-child(3) > tbody > tr');
        // Pega os dados
        meses.forEach((mes) => {
            estatisticasMensais.push(
                Array.from(mes.querySelectorAll('td'))
                .map(col => col.innerText)
                .join(',')
            );
        })

        return estatisticasMensais;
    });

    await page.close();
    await browser.close();

    const file = fs.createWriteStream('historicoMensal.csv');
    historicoMensal.map(mes => file.write(mes + os.EOL));
    file.end();
};

module.exports = scrapHistoricoMensal;