import { createApp, createRouter, defineEventHandler, getRouterParam } from 'h3';
import { exec } from 'child_process';

export const app = createApp();

const router = createRouter();
app.use(router);

router.get(
  '/:text',
  defineEventHandler(async (event) => {
    const text = getRouterParam(event, 'text');
    exec(`sr5900p print --printer 192.168.100.10 --qr-text '${text}'`);
    return { message: 'ok' };
  }),
);
