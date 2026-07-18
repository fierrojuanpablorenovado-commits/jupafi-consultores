import puppeteer from "puppeteer";
import fs from "fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "https://jupaficonsultores.com/preview/posts-premium.html";
const OUT = "D:\\Claude\\jupafi-consultores\\marketing\\posts";
const POSTS = [
  { id: "p1", file: "01-presentacion.png" },
  { id: "p2", file: "02-track-record.png" },
  { id: "p3", file: "03-caso-cierra.png" },
  { id: "p4", file: "04-comparativa.png" },
  { id: "p5", file: "05-paquetes.png" },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
// 2x device scale for crisp retina-quality PNGs
await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "load", timeout: 90000 });
// wait for fonts + images to settle
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 4000));

for (const post of POSTS) {
  const el = await page.$(`#${post.id}`);
  if (!el) {
    console.log(`✗ ${post.id} no encontrado`);
    continue;
  }
  await el.screenshot({ path: `${OUT}\\${post.file}`, type: "png" });
  const stat = fs.statSync(`${OUT}\\${post.file}`);
  console.log(`✓ ${post.file} (${Math.round(stat.size / 1024)} KB)`);
}

await browser.close();
console.log("LISTO");
