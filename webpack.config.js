const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash].bundle.js',
    clean: true,
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules', 'react'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)$/i, // handle images loading
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i, // handle fonts loading
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My New React Website',
      lang: 'fr',
      favicon: './src/assets/img/favicon.png',
      template: './src/assets/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/styles.css',
      chunkFilename: 'styles.css',
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new BundleAnalyzer(),
  ],
  performance: {
    hints: false,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.js.gz');
    },
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules\/.*/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  devtool: this.mode === 'production' ? 'source-map' : 'inline-source-map',
};
