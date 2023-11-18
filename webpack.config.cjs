const path = require('path');

// const gtVersion = process.env.npm_package_version.replace(/.[0-9]/g, '.x');
// const nameVersion = process.env.npm_package_name +"-" +gtVersion +".js";

module.exports = [
  {
    name: 'browser es5',
    mode: 'development',
    target: ['web', 'es5'],
    entry: './built/esm/src/browser.js',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "browser-dev.js",
      library: {
        name: 'mergerLib',
        type: 'var'
      },
    }
  }
];