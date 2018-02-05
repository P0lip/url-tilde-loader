import babel from 'rollup-plugin-babel';

export default {
  input: './src/loader.js',
  output: {
    file: './lib/loader.js',
    format: 'cjs',
    name: 'url-tilde-loader',
    sourcemap: false,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  acorn: {
    allowReserved: true,
    ecmaVersion: 8,
  },
};
