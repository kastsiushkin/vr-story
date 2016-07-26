module.exports = {
  entry: "./app/js/app.js",  //entry point of your app
  output: {
    filename: "./build/bundle.js" //output transpiled and compiled code
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  },
  devServer: {
    contentBase: './examples'
  },
};
