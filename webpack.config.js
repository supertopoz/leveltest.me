  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.jsx'
    },
     module: {
      loaders: [
      { test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      { test: /\.jsx$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }  
      },
      { test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
    },  
    { test: /\.(jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
           //   publicPath: 'img/'
            }
          }
        ]
    }
    ]
  },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Example',
        template: './index.html'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '/dist'),
      publicPath: '/'
    }
  };