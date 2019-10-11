module.exports = {
    entry: [
      './src/js/main.js',
      './src/css/style.css'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "script-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                    localIdentName: "[name]__[local]___[hash:base64]"
                },
                sourceMap: true
              }
            }
          ]
        }
      ]
    }
  };
