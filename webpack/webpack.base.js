const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('../package.json');
const isProduction = !!((argv.env && argv.env.production) || argv.p);

module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/main.ts')],
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
  },
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'src': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.ts', '.tsx', '.js', 'html'],
  },
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    historyApiFallback: true,
    // TODO: Fix me, plz!
    // hotOnly: true,
    host: '0.0.0.0',
    inline: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    stats: {
      colors: true,
      chunks: false,
    },
    port: pkg.config.port,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        test: /\.tsx?$/,
        options: {
          formatter: 'stylish',
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ]
      },
      {
        exclude: [/(node_modules)(?![/|\\](bootstrap|foundation-sites))/],
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          },
        ],
      },
      {
        exclude: /node_modules/,
        loader: 'vue-loader',
        test: /\.vue$/,
      },
      {
        exclude: /node_modules/,
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'cache-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            }],
        })),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: !isProduction,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              }
            },
          ],
        }))
      },
      {
        test: /\.(png|jpe?g|gif|svg|xml|json)$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/img/[name].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|eot)$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/vendor/[name].[ext]',
          },
        },
      },
      {
        test: /\.woff2?$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: 'assets/vendor/[name].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules/,
        use: {
          loader: 'file-loader',
          query: {
            name: 'assets/vendor/[name].[ext]',
          },
        },
      },
    ],
  },
};
