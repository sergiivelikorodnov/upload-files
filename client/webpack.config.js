module.exports = {
  entry: {
    dev: './src/index.tsx'
  },
  output: {
    filename: './build/index.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json', '.css', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [node_modules_dir],
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        exclude: [node_modules_dir],
        loader: 'style!css!sass'
      }
    ],
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' }, // to inject the result into the DOM as a style block
          { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          { loader: 'css-loader', options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
          { loader: 'sass-loader' } // to convert SASS to CSS
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    https: {
      spdy: {
        protocols: ['http/1.1']
      }
    },
    webpack: {
      configure: {
        module: {
          rules: [
            {
              type: 'javascript/auto',
              test: /\.mjs$/,
              include: /node_modules/
            }
          ]
        }
      }
    }
  }
}
