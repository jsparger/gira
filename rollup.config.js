import commonjs from 'rollup-plugin-commonjs';
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

function onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
    }
}

export default {
  input: 'index.js',
  onwarn,
  output: {
    name: 'gira',
    file: 'dist/gira.js',
    format: 'umd',
  },
  plugins: [
    builtins(),
    globals(),
    resolve({preferBuiltins: true, browser: true,}),
    commonjs(),
    json()
  ],
};
