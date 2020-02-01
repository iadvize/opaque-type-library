import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      commonjs(),

      typescript(),
      terser(),
    ],
    external: [],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
      },
      {
        dir: 'esm',
        format: 'es',
      },
    ],
  },
];
