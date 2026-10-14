// Verificación estática del build (Fases 1b-7). Corre con: node scripts/verify-static.js
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

let failures = 0;
const check = (label, ok, detail) => {
  console.log(`  ${ok ? 'OK ' : 'FAIL'} ${label}${detail ? ' — ' + detail : ''}`);
  if (!ok) failures += 1;
};

// 1. i18n paridad EN/ES
const en = require('../src/locales/en.json');
const es = require('../src/locales/es.json');
const ke = Object.keys(en);
const ks = Object.keys(es);
const missing = ke.filter((k) => !ks.includes(k)).concat(ks.filter((k) => !ke.includes(k)));
check('i18n paridad EN/ES', missing.length === 0, `${ke.length}/${ks.length} claves, faltantes [${missing}]`);

// 2. Strings vacíos o crudos
const empty = ke.filter((k) => !String(en[k]).trim() || !String(es[k] || '').trim());
check('sin claves vacías', empty.length === 0, `[${empty}]`);

// 3. index.html de producción
const html = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
check('favicon.svg enlazado', html.includes('favicon.svg'));
check('manifest enlazado', html.includes('manifest.json'));
check('preload de fuentes', (html.match(/rel="preload"/g) || []).length === 2);
check('JSON-LD Person', html.includes('application/ld+json') && html.includes('"@type": "Person"'));
check('title propio', html.includes('Aylén Rodríguez — Software Developer'));
check('theme-color', html.includes('name="theme-color"'));
check('og:url + canonical', html.includes('property="og:url"') && html.includes('rel="canonical"'));
const sitemap = fs.readFileSync(path.join(__dirname, '../build/sitemap.xml'), 'utf8');
check('sitemap.xml con loc', sitemap.includes('<loc>https://'));
const robots = fs.readFileSync(path.join(__dirname, '../build/robots.txt'), 'utf8');
check('robots.txt enlaza sitemap', robots.includes('Sitemap: https://'));

// 4. Presupuestos (AGENTS.md §8)
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );
let js = 0;
let css = 0;
for (const f of walk(path.join(__dirname, '../build/static'))) {
  if (/\.(js|css)$/.test(f)) {
    const gz = zlib.gzipSync(fs.readFileSync(f), { level: 9 }).length;
    if (f.endsWith('.js')) js += gz;
    else css += gz;
  }
}
check('JS gz ≤ 150 kB', js / 1024 <= 150, `${(js / 1024).toFixed(2)} kB`);
check('CSS gz ≤ 10 kB', css / 1024 <= 10, `${(css / 1024).toFixed(2)} kB`);

// 5. Fuentes vendidas presentes
const fonts = fs.readdirSync(path.join(__dirname, '../public/fonts'));
check('fonts vendored', fonts.includes('Inter-latin.woff2') && fonts.includes('SpaceGrotesk-latin.woff2'), fonts.join(', '));

// 6. Sin selectores de elemento globales en CSS de componente
const cssFiles = fs
  .readdirSync(path.join(__dirname, '../src/styles'))
  .filter((f) => f.endsWith('.css') && f !== 'tokens.css');
const globalSel = [];
for (const f of cssFiles) {
  const content = fs.readFileSync(path.join(__dirname, '../src/styles', f), 'utf8');
  content.split('\n').forEach((line, i) => {
    if (/^\s*(h1|h2|h3|p|a|button|blockquote|ul|li|img|section|nav|label|input|textarea)\s*[,{]/.test(line)) {
      globalSel.push(`${f}:${i + 1} ${line.trim()}`);
    }
  });
}
check('cero selectores globales en styles/', globalSel.length === 0, globalSel.join(' | '));

// 7. Sin alert() en componentes (ignorando comentarios)
const compFiles = fs.readdirSync(path.join(__dirname, '../src/components')).filter((f) => f.endsWith('.js'));
const stripComments = (src) =>
  src
    .split('\n')
    .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
const alerts = compFiles.filter((f) =>
  /[^.\w]alert\s*\(/.test(stripComments(fs.readFileSync(path.join(__dirname, '../src/components', f), 'utf8')))
);
check('sin alert()', alerts.length === 0, `[${alerts}]`);

// 8. Un solo h1 en Hero + ids estables en maps
const hero = fs.readFileSync(path.join(__dirname, '../src/components/Hero.js'), 'utf8');
check('un solo h1 (Hero)', (hero.match(/<h1/g) || []).length === 1);
const skills = fs.readFileSync(path.join(__dirname, '../src/components/Skills.js'), 'utf8');
check('map de skills con key estable', skills.includes('key={skill}'));

console.log(failures === 0 ? '\nTODO VERDE' : `\n${failures} FALLAS`);
process.exit(failures === 0 ? 0 : 1);
