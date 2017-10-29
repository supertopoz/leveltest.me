const https = require('https');


module.exports = {
  getData: function(callback) {


var spreadsheetID = "1GnKeIxKzw-TWtqPs_hVzk2X0RvL2aLWnba5hQJmdj2Q";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID +"/1/public/values?alt=json";


https.get(url, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    info(JSON.parse(data));
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});



let info = function(data){
    data = data.feed.entry
    let result = {};
  data.forEach(function(item){
    let id = [item.gsx$level.$t,

      item.gsx$set.$t,
      item.gsx$type.$t,
      item.gsx$question.$t].join('-')
    let questions = {
      'chance1':item.gsx$chance1.$t, 
      'chance2':item.gsx$chance2.$t, 
      'chance3':item.gsx$chance3.$t
    }
    result[id] = questions
  })
  console.log(typeof result)
   return callback(result)
}   
  } 
}

