import { createApp, createRouter, defineEventHandler, getRouterParam } from 'h3';
import { exec } from 'child_process';

export const app = createApp();

const router = createRouter();
app.use(router);

router.get(
  '/:text',
  defineEventHandler(async (event) => {
    const text = getRouterParam(event, 'text');

    const runCommand = () => {
      return new Promise((resolve, reject) => {
        exec(`sr5900p print --printer 192.168.100.10 --qr-text '${text}'`, (error, stdout, stderr) => {
          if (error) {
            reject(`exec error: ${error}`);
            return;
          }
          if (stderr) {
            reject(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          resolve(stdout);
        });
      });
    };

    try {
      await runCommand();
      return { message: 'ok' };
    } catch (err) {
      console.error(err);
      return { message: 'Error occurred' };
    }
  }),
);
