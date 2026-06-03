import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT ?? 5173);
const root = join(process.cwd(), 'dist');
const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
]);

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = normalize(decoded).replace(/^\.\.(\/|\\|$)/, '');
  return join(root, normalized === '/' ? 'index.html' : normalized);
}

async function loadFile(pathname) {
  const filePath = safePath(pathname);
  const fileStat = await stat(filePath);
  if (fileStat.isDirectory()) {
    return loadFile('/index.html');
  }

  return {
    body: await readFile(filePath),
    type: mimeTypes.get(extname(filePath)) ?? 'application/octet-stream',
  };
}

const server = createServer((request, response) => {
  loadFile(request.url ?? '/')
    .then(({ body, type }) => {
      response.writeHead(200, { 'Content-Type': type });
      response.end(body);
    })
    .catch(() => {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Learning tool is running at http://localhost:${port}`);
});
