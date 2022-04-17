import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import analyze from 'rollup-plugin-analyzer';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'yarn',
        ['run', 'start', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: 'bundle.css' }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    commonjs(),
    replace({
      preventAssignment: true,
      __CLIENT_ID__: JSON.stringify(process.env.CLIENT_ID),
      __WEBSITE_URL__: JSON.stringify(process.env.WEBSITE_URL),
    }),
    !production && serve(),
    !production && livereload('public'),
    production && analyze({ summaryOnly: true, limit: 10 }),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
