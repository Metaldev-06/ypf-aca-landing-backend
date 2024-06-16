import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const url = 'https://serviclub.com.ar/blogs/category/page/1.html';

export const getData = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set custom user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    // Set cookies if needed (add your own cookies here)
    // await page.setCookie({ name: 'example', value: 'value', domain: '.example.com' });

    await page.goto(url, { waitUntil: 'networkidle2' });

    try {
      await page.waitForSelector('.pagination', { timeout: 60000 });
    } catch (error) {
      console.error('Error waiting for .pagination:', error);
      const content = await page.content();
      console.log('Page content at error:', content); // Imprime el contenido de la página para depuración
      throw new Error('Pagination selector not found');
    }

    const totalPages = await page.evaluate(() => {
      const paginationItems = document.querySelectorAll(
        '.pagination li a.page-linkben span',
      );
      return paginationItems.length;
    });

    let allData: {
      title: string | null;
      imgUrl: string | null;
      url: string | null;
    }[] = [];

    // Iterar sobre cada página
    for (let i = 1; i <= totalPages; i++) {
      const pageUrl = `https://serviclub.com.ar/blogs/category/page/${i}.html`;
      await page.goto(pageUrl, { waitUntil: 'networkidle2' });

      try {
        await page.waitForSelector('.containerBen', { timeout: 60000 });
      } catch (error) {
        console.error(`Error waiting for .containerBen on page ${i}:`, error);
        const content = await page.content();
        console.log(`Page content at error on page ${i}:`, content); // Imprime el contenido de la página para depuración
        continue; // O manejar el error según sea necesario
      }

      const data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.itemBen')).map((item) => {
          const titleElement = item.querySelector('h4.tituloListBen');
          const imgElement = item.querySelector(
            'img.imgben',
          ) as HTMLImageElement | null;
          const urlElement = item.querySelector(
            'a',
          ) as HTMLAnchorElement | null;

          const title = titleElement ? titleElement.textContent.trim() : null;
          const imgUrl = imgElement ? imgElement.src : null;
          const url = urlElement ? urlElement.href : null;

          return {
            title,
            imgUrl,
            url,
          };
        });
      });

      allData = allData.concat(data);
    }

    await browser.close();
    return allData;
  } catch (error) {
    console.error('Error in getData:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
};
