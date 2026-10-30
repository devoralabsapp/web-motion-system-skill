import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.gif':'image/gif','.png':'image/png','.txt':'text/plain; charset=utf-8','.jpg':'image/jpeg','.ttf':'font/ttf'};
const server=createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost');const file=path.resolve(root,'.'+decodeURIComponent(u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname));const relative=path.relative(root,file);if(relative.startsWith('..')||path.isAbsolute(relative))throw Error();const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body)}catch{res.writeHead(404);res.end('Not found')}});
server.listen(Number(process.env.PORT||4190),'127.0.0.1',()=>console.log(`Motion Explorer: http://127.0.0.1:${server.address().port}`));
