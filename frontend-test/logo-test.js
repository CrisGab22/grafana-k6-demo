import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      iterations: 1,
      vus: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

const BASE_URL = 'https://scholarship-application-requests.ctdesarrollo.org';

export default async function () {
  const page = await browser.newPage();

  try {
    /*** LOGO GLOBAL ***/
    console.log('✅ Comprobando logo global');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const globalLogoSelector = 'img[src*="logo-funiber-headquarters-global.png"]';
    let globalLogo = null;

    try {
      globalLogo = await page.waitForSelector(globalLogoSelector, { timeout: 5000 });
    } catch (error) {
      console.error(`❌ No se encontró el logo global: ${error.message}`);
    }

    check(globalLogo, {
      'Logo global visible': (el) => el !== null,
    });

    globalLogo&& await page.screenshot({ path: './imagenes/global-logo.png' });
    sleep(1);

    /*** LOGO CHINA ***/
    console.log('✅ Comprobando logo china');
    await page.goto(`${BASE_URL}?headquarter=CN`, { waitUntil: 'networkidle' });

    const chinaLogoSelector = 'img[src*="logo-funiber-headquarters-cn.png"]';
    let chinaLogo = null;

    try {
      chinaLogo = await page.waitForSelector(chinaLogoSelector, { timeout: 5000 });
    } catch (error) {
      console.error(`❌ No se encontró el logo china (col): ${error.message}`);
    }

    check(chinaLogo, {
      'Logo china visible': (el) => el !== null,
    });

    chinaLogo && await page.screenshot({ path: './imagenes/china-logo.png' });

  } finally {
    await page.close();
  }
}