export default {
  input: './src/loader.js',
  output: {
    file: `./lib/loader.js`,
    format: 'cjs',
    name: 'tilde-rewriter-loader',
    sourcemap: true,
  },
  acorn: {
    allowReserved: true,
    ecmaVersion: 8,
  },
};
