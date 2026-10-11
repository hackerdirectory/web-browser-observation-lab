import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const files=new Map([['/','index.html'],...['index.html','lab.js','lab.css','README.md','README.en.md','HINTS.md','HINTS.en.md','SOLUTION.md','SOLUTION.en.md'].map(file=>['/'+file,file])]);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.md':'text/plain; charset=utf-8'};
export function createBrowserLabServer(){return createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'self'; style-src 'self'; base-uri 'none'; form-action 'none'");
 if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');res.writeHead(405);res.end('method-not-allowed');return;}
 let path;try{path=new URL(req.url,'http://127.0.0.1:4194').pathname;}catch{res.writeHead(400);res.end();return;}const file=files.get(path);
 if(!file){res.writeHead(404);res.end(req.method==='HEAD'?'':'not-found');return;}
 try{const bytes=await readFile(resolve(root,file)),extension='.'+file.split('.').at(-1);res.setHeader('Content-Type',types[extension]);res.setHeader('Content-Length',bytes.length);res.writeHead(200);res.end(req.method==='HEAD'?undefined:bytes);}catch{res.writeHead(500);res.end();}
});}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){const server=createBrowserLabServer();server.listen(4194,'127.0.0.1',()=>process.stdout.write('WEB-LAB-04: http://127.0.0.1:4194/\n'));server.on('error',error=>{process.stderr.write(error.message+'\n');process.exitCode=1;});for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close());}
