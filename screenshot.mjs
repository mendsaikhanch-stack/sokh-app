import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:4173';
const DIR = './screenshots';
const CHROME_PATH = '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome';

async function run() {
  mkdirSync(DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  // Mobile screenshots
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    ignoreHTTPSErrors: true,
  });
  const mp = await mobile.newPage();

  // 1. Welcome screen
  console.log('01-welcome.png...');
  try {
    await mp.goto(BASE, { waitUntil: 'load', timeout: 30000 });
  } catch (e) {
    console.log('Goto error:', e.message.split('\n')[0]);
    // Try anyway
  }
  await mp.waitForTimeout(2000);
  await mp.screenshot({ path: `${DIR}/01-welcome.png` });
  console.log('  saved!');

  // 2. Click "Эхлэх"
  console.log('02-loading.png...');
  const startBtn = mp.locator('button', { hasText: 'Эхлэх' });
  if (await startBtn.count() > 0) {
    await startBtn.click();
    await mp.waitForTimeout(2000);
    await mp.screenshot({ path: `${DIR}/02-loading.png` });
    console.log('  saved!');
  }

  // Desktop
  const desktop = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const dp = await desktop.newPage();

  console.log('03-welcome-desktop.png...');
  try {
    await dp.goto(BASE, { waitUntil: 'load', timeout: 30000 });
  } catch (e) {
    console.log('Goto error:', e.message.split('\n')[0]);
  }
  await dp.waitForTimeout(2000);
  await dp.screenshot({ path: `${DIR}/03-welcome-desktop.png` });
  console.log('  saved!');

  await browser.close();
  console.log('Done!');
}

run().catch(e => console.error('Fatal:', e.message));
