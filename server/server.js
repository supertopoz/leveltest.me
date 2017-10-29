const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const data = require('./getQuestionData.js');
const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');
const cache = require('memory-cache');
const path = require('path')

/*cache.put('foo', 'bar');
console.log(cache.get('foo'));*/

app.use(express.static(__dirname));
app.use(webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath
}));


var questionData = function(){
   data.getData(function(result){
   cache.put('questionData', JSON.stringify(result), 10000000, function(key, value) {
   console.log('dumped cached data');
    }); 
   })
}

questionData();

app.use(bodyParser.json());
app.get('/data', function(req,res){
	var result = cache.get('questionData');
	if(result === null){
        data.getData(function(result){
          res.send(result)
	    }) 
	} else {
	 res.send(cache.get('questionData'))	
	}
});


app.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
