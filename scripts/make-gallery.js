const fs = require('fs');
const posts = [
  ['01','Presentacion','Quien es JuPaFi'],
  ['02','Track Record','13+ proyectos reales'],
  ['03','Caso Cierra CRM','SaaS de ventas'],
  ['04','Caso Vista3D','3D en el navegador'],
  ['05','Entrevista Virtual','IA 24/7'],
  ['06','El Stack','Next.js + IA + Cloud'],
  ['07','Semanas no meses','6 sem vs 12 meses'],
  ['08','Comparativa','JuPaFi vs Agencia'],
  ['09','Paquetes','15k 60k 150k MXN'],
  ['10','El Proceso','5 pasos'],
  ['11','Que es SaaS','El mejor activo digital'],
  ['12','3 Automatizaciones','Tip de la semana'],
  ['13','Codigo es tuyo','Sin dependencias'],
  ['14','Caso Flotilla','Control vehicular'],
  ['15','Tip Validar SaaS','Sin gastar de mas'],
  ['16','IA da ventaja','El que la usa escala'],
  ['17','Landing App SaaS','Cual necesitas'],
  ['18','Agencias tardan','Por que 1 ano'],
  ['19','5 Senales','Necesitas sistema digital'],
  ['20','Caso Trama','WhatsApp a escala'],
  ['21','Stack moderno','vs Legacy'],
  ['22','CTA Consulta','Que quieres construir'],
  ['23','FAQs','Preguntas frecuentes'],
  ['24','Garantia','Codigo tuyo desde dia 1'],
  ['25','Behind the Scenes','Asi nace un producto'],
  ['26','Caso Vantor','Tracking de ventas'],
  ['27','Oferta','Primera consulta gratis'],
  ['28','WhatsApp CTA','Escribenos directo'],
  ['29','Mes 1 Resumen','Cierre del mes'],
  ['30','Identidad','Tu producto. Tu codigo.']
];

const weeks = [
  {n:1, t:'Semana 1 - Presentacion', r:[0,7]},
  {n:2, t:'Semana 2 - Demostracion', r:[7,14]},
  {n:3, t:'Semana 3 - Autoridad', r:[14,21]},
  {n:4, t:'Semana 4 - Conversion', r:[21,30]}
];

let cards = '';
for (const w of weeks) {
  cards += '<div class="wh"><span class="wn">SEMANA ' + w.n + '</span> ' + w.t + '</div><div class="grid">';
  for (let i = w.r[0]; i < w.r[1]; i++) {
    const [n, t, d] = posts[i];
    cards += '<div class="card" onclick="openLb(\'generated/post-' + n + '.png\')">'
      + '<img src="generated/post-' + n + '.png" loading="lazy" alt="Post ' + n + '">'
      + '<div class="meta">'
      + '<div class="lbl">POST ' + n + '</div>'
      + '<div class="ttl">' + t + '</div>'
      + '<div class="dsc">' + d + '</div>'
      + '<div class="row"><span class="ok">Listo</span>'
      + '<a class="dl" href="generated/post-' + n + '.png" download="jupafi-post-' + n + '.png">Descargar</a></div>'
      + '</div></div>';
  }
  cards += '</div>';
}

const css = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
body{background:#09090b;color:#fafafa;font-family:Inter,system-ui,sans-serif;min-height:100vh}
nav{border-bottom:1px solid #18181b;padding:18px 40px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:rgba(9,9,11,.92);backdrop-filter:blur(12px);z-index:100}
.logo{display:flex;align-items:center;gap:12px}
.J{width:38px;height:38px;border-radius:9px;background:#c8ff00;display:flex;align-items:center;justify-content:center;color:#09090b;font-weight:900;font-size:15px;font-family:monospace}
.brand{font-size:16px;font-weight:700}.brand span{color:#52525b;font-weight:400}
.badge{display:flex;align-items:center;gap:7px;border:1px solid #27272a;border-radius:999px;padding:5px 14px;font-size:11px;color:#a1a1aa;font-family:monospace;letter-spacing:1px}
.dot{width:7px;height:7px;border-radius:50%;background:#c8ff00}
.hero{max-width:800px;margin:0 auto;padding:56px 40px 32px;text-align:center}
.chip{display:inline-flex;align-items:center;gap:7px;border:1px solid #27272a;border-radius:999px;padding:5px 15px;font-size:11px;color:#a1a1aa;font-family:monospace;letter-spacing:2px;text-transform:uppercase;margin-bottom:18px}
h1{font-size:clamp(32px,5vw,50px);font-weight:800;letter-spacing:-1.5px;line-height:1.05;margin-bottom:12px}
h1 em{color:#c8ff00;font-style:normal}
p.sub{font-size:16px;color:#71717a;line-height:1.6}
.wrap{max-width:1200px;margin:0 auto;padding:0 32px 80px}
.wh{font-size:12px;font-family:monospace;color:#c8ff00;letter-spacing:2px;text-transform:uppercase;padding:28px 0 14px;border-top:1px solid #18181b;margin-top:4px}
.wh .wn{color:#52525b;margin-right:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-bottom:4px}
.card{background:#0f0f11;border:1px solid #27272a;border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .2s,border-color .2s}
.card:hover{transform:translateY(-3px);border-color:#c8ff00;box-shadow:0 10px 36px rgba(200,255,0,.07)}
.card img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;background:#18181b}
.meta{padding:12px 14px 14px}
.lbl{font-size:9px;font-family:monospace;color:#c8ff00;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px}
.ttl{font-size:14px;font-weight:700;margin-bottom:3px}
.dsc{font-size:11px;color:#71717a;margin-bottom:9px}
.row{display:flex;align-items:center;justify-content:space-between}
.ok{padding:2px 8px;border-radius:6px;font-size:9px;font-weight:600;background:rgba(200,255,0,.1);color:#c8ff00;border:1px solid rgba(200,255,0,.22)}
.dl{padding:4px 10px;border-radius:6px;font-size:10px;font-weight:600;background:#27272a;color:#a1a1aa;text-decoration:none;transition:all .18s}
.dl:hover{background:#c8ff00;color:#09090b}
.lb{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.94);backdrop-filter:blur(20px);align-items:center;justify-content:center;padding:20px}
.lb.on{display:flex}
.lb-wrap{position:relative}
.lb img{max-height:88vh;max-width:92vw;border-radius:10px;display:block}
.lbx{position:absolute;top:-42px;right:0;background:#27272a;border:none;color:#fafafa;border-radius:7px;padding:6px 14px;font-size:13px;cursor:pointer;font-weight:600}
.lbx:hover{background:#c8ff00;color:#09090b}
footer{border-top:1px solid #18181b;padding:24px 40px;text-align:center;color:#52525b;font-size:12px}
footer a{color:#c8ff00;text-decoration:none}
`;

const html = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>30 Posts JuPaFi</title>'
  + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">'
  + '<style>' + css + '</style></head><body>'
  + '<nav><div class="logo"><div class="J">JP</div><div class="brand">JuPaFi <span>Consultores</span></div></div>'
  + '<div class="badge"><div class="dot"></div>30 POSTS LISTOS</div></nav>'
  + '<div class="hero"><div class="chip"><span class="dot"></span>Un mes de contenido</div>'
  + '<h1><em>30 posts</em> listos<br>para publicar</h1>'
  + '<p class="sub">Click para ver grande. Boton Descargar para guardar y subir a Instagram, LinkedIn o Facebook.</p></div>'
  + '<div class="wrap">' + cards + '</div>'
  + '<div class="lb" id="L" onclick="if(event.target===this)cl()">'
  + '<div class="lb-wrap"><button class="lbx" onclick="cl()">X Cerrar</button><img id="LI" src="" alt=""></div></div>'
  + '<footer>30 posts JuPaFi &middot; <a href="brand-picks.html">Ver identidad de marca</a> &middot; '
  + '<a href="https://jupaficonsultores.com" target="_blank">jupaficonsultores.com</a></footer>'
  + '<script>'
  + 'function openLb(src){document.getElementById("LI").src=src;document.getElementById("L").classList.add("on");document.body.style.overflow="hidden";}'
  + 'function cl(){document.getElementById("L").classList.remove("on");document.body.style.overflow="";}'
  + 'document.addEventListener("keydown",function(e){if(e.key==="Escape")cl();});'
  + '</script></body></html>';

fs.writeFileSync('public/preview/posts-galeria.html', html, 'utf8');
console.log('OK galeria creada:', html.length, 'bytes');
