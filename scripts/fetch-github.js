/**
 * fetch-github.js — Fase N3 (ROADMAP): baja datos REALES del propietario desde
 * la API pública de GitHub y escribe src/data/github.json.
 *
 * Uso:  npm run fetch:github        (opcional: GITHUB_TOKEN=... para más rate limit)
 * Sin token: ~12 requests al endpoint core (límite 60/h) + 1 de search (10/min).
 * Si algo falla, el script sale con código 1 y NO toca el JSON anterior: la
 * UI siempre muestra la última foto real exitosa (nunca datos inventados).
 *
 * Regla de oro (AGENTS.md §3): solo se copian campos que la API devuelve.
 * "Horas de trabajo" no existe en la API de GitHub: no se muestra jamás.
 */
const fs = require('fs');
const path = require('path');

const USER = process.env.GITHUB_USER || 'FullStackAylen';
const OUT = path.join(__dirname, '..', 'src', 'data', 'github.json');
const UA = { 'User-Agent': 'portfolio-build-script', Accept: 'application/vnd.github+json' };
const TOKEN = process.env.GITHUB_TOKEN;
if (TOKEN) UA.Authorization = `Bearer ${TOKEN}`;

async function get(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) {
    throw new Error(`${url} → HTTP ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function main() {
  const profile = await get(`https://api.github.com/users/${USER}`);
  const repos = await get(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`
  );

  const own = repos.filter((r) => !r.fork);

  // Lenguajes reales agregados por bytes (solo repos propios, no forks).
  const perRepo = await Promise.all(
    own.slice(0, 20).map(async (r) => {
      const langs = await get(`https://api.github.com/repos/${USER}/${r.name}/languages`);
      return { repo: r, langs };
    })
  );
  const bytesByName = {};
  for (const { langs } of perRepo) {
    for (const [name, bytes] of Object.entries(langs)) {
      bytesByName[name] = (bytesByName[name] || 0) + bytes;
    }
  }
  const totalBytes = Object.values(bytesByName).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(bytesByName)
    .map(([name, bytes]) => ({ name, bytes, share: bytes / totalBytes }))
    .sort((a, b) => b.bytes - a.bytes);

  // Commits públicos de los últimos 12 meses (search API: total_count real).
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);
  const isoDay = since.toISOString().slice(0, 10);
  let commitsLastYear = null;
  try {
    const search = await get(
      `https://api.github.com/search/commits?q=author:${USER}+author-date:>=${isoDay}`
    );
    commitsLastYear = search.total_count;
  } catch (err) {
    console.warn(`[warn] search de commits falló (${err.message}); se omite el dato.`);
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    profile: {
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      createdAt: profile.created_at,
      followers: profile.followers,
      publicRepos: profile.public_repos,
      profileUrl: profile.html_url,
    },
    totals: {
      commitsLastYear,
      stars: own.reduce((a, r) => a + r.stargazers_count, 0),
    },
    languages,
    repos: own
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
        url: r.html_url,
      })),
  };

  fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(
    `OK → ${path.relative(process.cwd(), OUT)} · ${languages.length} lenguajes · ` +
      `${payload.repos.length} repos · commits 12m: ${commitsLastYear ?? 'n/d'}`
  );
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}\nNo se modificó ${OUT}.`);
  process.exit(1);
});
