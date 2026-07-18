// render-posts.js — Renderiza los 30 posts HTML a PNG con Puppeteer
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_FILE = path.resolve(__dirname, '../public/preview/posts-30.html');
const OUT_DIR = path.resolve(__dirname, '../marketing/posts/generated');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });

  const fileUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');
  console.log('Cargando:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Esperar que carguen las fuentes
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  // Contar posts
  const count = await page.evaluate(() => document.querySelectorAll('.post').length);
  console.log(`Encontrados ${count} posts`);

  for (let i = 0; i < count; i++) {
    const num = String(i + 1).padStart(2, '0');
    const filename = path.join(OUT_DIR, `post-${num}.png`);

    await page.evaluate((idx) => {
      const posts = document.querySelectorAll('.post');
      posts.forEach((p, j) => { p.style.display = j === idx ? 'flex' : 'none'; });
    }, i);

    await new Promise(r => setTimeout(r, 300));

    const el = await page.$('.post:not([style*="none"])');
    if (el) {
      await el.screenshot({ path: filename, type: 'png' });
      console.log(`✓ post-${num}.png`);
    }
  }

  await browser.close();
  console.log(`\n✅ ${count} posts generados en: ${OUT_DIR}`);
})().catch(e => { console.error(e); process.exit(1); });
