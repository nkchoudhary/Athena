var config = {
   entry: './Bill.js',
   
   output: {
      path:'./',
      filename: 'output.js',
   },
   
   devServer: {
      inline: true,
      port: 3000
   },
   
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;