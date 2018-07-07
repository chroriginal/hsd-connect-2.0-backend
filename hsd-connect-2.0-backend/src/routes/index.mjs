import KoaRouter from 'koa-router';
import env from '../config/env.mjs';

const router = new KoaRouter();
((async() => router.use((await import(`.${env.API.PATH}`)).default.routes()))());

export default router;
