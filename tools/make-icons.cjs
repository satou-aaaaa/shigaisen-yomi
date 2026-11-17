// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、太陽と、強さの5段の目盛り。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="50" cy="42" r="17" fill="#f6d77a"/>
      <g stroke="#f6d77a" stroke-width="5" stroke-linecap="round"><line x1="50" y1="8" x2="50" y2="17"/><line x1="16" y1="42" x2="25" y2="42"/><line x1="75" y1="42" x2="84" y2="42"/><line x1="26" y1="18" x2="32" y2="24"/><line x1="74" y1="18" x2="68" y2="24"/></g>
      <g fill="#fffdf7"><rect x="18" y="80" width="10" height="6"/><rect x="31" y="76" width="10" height="10"/><rect x="44" y="72" width="10" height="14"/><rect x="57" y="68" width="10" height="18"/><rect x="70" y="64" width="10" height="22"/></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
