/**
 * Дописывает префикс подпути к путям внутри собранного CSS.
 *
 * Нужен только для статической выгрузки на GitHub Pages: там сайт отдаётся
 * из /имя-репозитория, а basePath переписывает ссылки компонентов, но не
 * url() внутри стилей — сборщик разрешает их относительно исходника и
 * оставляет абсолютными. Без этого шага не грузится ни один шрифт, причём
 * молча: браузер подставляет системную гарнитуру, и подмену видно только
 * при сравнении с макетом.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = process.env.EVAMED_BASE_PATH ?? '/evamed';
const root = 'out';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith('.css')) files.push(full);
  }
  return files;
}

const files = await walk(root);
let patched = 0;
let links = 0;

for (const file of files) {
  const before = await readFile(file, 'utf8');
  const after = before.replaceAll('url(/fonts/', `url(${base}/fonts/`);
  if (after !== before) {
    await writeFile(file, after, 'utf8');
    patched += 1;
    links += (before.match(/url\(\/fonts\//g) ?? []).length;
  }
}

console.log(`[base-path] префикс ${base}: файлов ${patched}, ссылок ${links}`);
if (patched === 0) {
  console.error('[base-path] ОШИБКА: ссылок на шрифты не найдено — проверьте сборку');
  process.exit(1);
}
