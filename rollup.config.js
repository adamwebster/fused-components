import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const extensions = ['.js', '.jsx']

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'core-js': 'core-js',
  'prop-types': 'PropTypes',
  'styled-components': 'styled'
}

const globalModules = Object.keys(globals);

const sourceMap = true;

export default {
  input: {
    index: './src/components.js'
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
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef'
        ]
      },
    }),
    babel({
      sourceMap,
      extensions,
      include: ['src/**/*'],
      exclude: [
        'node_modules/**',
        '**/*.css',
      ]
    }),
  ],
  external: id => globalModules.includes(id) || /core-js/.test(id),
}