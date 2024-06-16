import puppeteer from 'puppeteer';

const url = 'https://serviclub.com.ar/blogs/category/page/1.html';

export const getData = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await page.waitForSelector('.pagination', { timeout: 60000 });

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

    for (let i = 1; i <= totalPages; i++) {
      await page.goto(`https://serviclub.com.ar/blogs/category/page/${i}.html`);
      await page.waitForSelector('.containerBen');

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

          return { title, imgUrl, url };
        });
      });

      allData = allData.concat(data);
    }

    return allData;
  } catch (error) {
    console.error('Error en getData:', error);
    throw new Error('Error al obtener datos de promociones');
  } finally {
    await browser.close();
  }
};