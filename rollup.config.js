import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'styled-components': 'styled',
  '@fortawesome/react-fontawesome': 'FontAwesomeIcon',
  polished: ['darken', 'lighten'],
};

const globalModules = Object.keys(globals);

const sourceMap = true;

export default {
  input: {
    index: './src/components.ts',
  },
  preserveModules: true,
  treeshake: false,
  output: [
    {
      dir: 'dist',
      format: 'esm',
      globals,
      sourcemap: sourceMap,
      preferConst: true,
    },
  ],
  plugins: [
    resolve({ extensions }),

    commonjs({
      include: '**/node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['cloneElement', 'createContext', 'Component', 'createElement'],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef'],
      },
    }),
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ['src/demos/*', 'src/data/*', 'src/styles/*', 'src/themes/*'],
      },
    }),
    babel({
      sourceMap,
      extensions,
      include: ['src/**/*'],
      exclude: ['node_modules/**', '**/*.css'],
    }),
  ],
  // toggle comment below if using npm/yarn link
  external: id => globalModules.includes(id) || /core-js/.test(id),
  // external: id => globalModules.includes(id),
};
