
module.exports = (env) =>{
  const isProduction = env === "production";
  console.log("env",env);
  const path = require('path');
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }]
    }
  };  
}

