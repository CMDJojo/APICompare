const api1 = ""
const api2 = ""
//Put in url:s to api1 and api2

console.log("Starting...")

try{
  var fs = require("fs");
  var request = require("request");
}catch(err){
  console.log("");
  console.log("It seems like you have at lest one node package module missing. You have to have the moddules FS and REQUEST. Do 'npm install fs' and 'npm install request' in the command prompt")
  process.exit(0)
}

console.log("Downloading api price lists...")
var api1downloaded = false;
var api2downloaded = false;

request(api1, (error, response, body) => {
  if (error || response.statusCode !== 200){
    console.log(`Error: ${error} - Status Code: ${response.statusCode}`+" Could not contact the API at "+overpaysettings.apiUrl);
  }
  fs.writeFile('api1prices.json', body);
  api1downloaded=true;
  console.log("API1 donwloaded")
  checkDownloaded();
});
request(api2, (error, response, body) => {
  if (error || response.statusCode !== 200){
    console.log(`Error: ${error} - Status Code: ${response.statusCode}`+" Could not contact the API at "+overpaysettings.apiUrl);
  }
  fs.writeFile('api2prices.json', body);
  api2downloaded=true;
  console.log("API2 downloaded")
  checkDownloaded();
});

function checkDownloaded(){
  if(api1downloaded&&api2downloaded){
    console.log("Both API:s downloaded. Starting comparation...")
    setTimeout(compareAll,1000)
  }
}

function compareAll(){
  var prices1 = require("./api1prices.json");
  var prices2 = require("./api2prices.json");
  var differArray = [];
  var itemArray = Object.keys(prices1);
  var statistics = {differentPrice:0,samePrice:0,differPercentage:0}
  console.log("Comparation started for "+itemArray.length+" items")
  itemArray.forEach(function(item,index){
    var difference = (parseInt(prices1[item]*100)-parseInt(prices2[item]*100))/100
    var absDifference = Math.abs(difference);
    if(prices1[item]==prices2[item]){
      console.log("The price for "+item+" is the same ("+prices1[item]+")");
      statistics.samePrice++;
    }else{
      console.log("The price for "+item+" is different:");
      console.log("  API1 says its worth "+prices1[item]+", and");
      console.log("  API2 says its worth "+prices2[item]+", the total difference is "+absDifference);
      statistics.differentPrice++;
    }
    var pushObj = {name:item,price1:prices1[item],price2:prices2[item],difference:difference,absDifference:absDifference}
    differArray.push(pushObj);
  })
  var byDiff = differArray.slice(0);
  byDiff.sort(function(a,b) {
      return b.absDifference - a.absDifference;
  });
  statistics.differPercentage = statistics.differentPrice/(statistics.samePrice+statistics.differentPrice)*10000
  statistics.differPercentage = Math.round(statistics.differPercentage)
  statistics.differPercentage /= 100
  var toWrite = {statistics:statistics,items:byDiff}
  fs.writeFile('differenceList.json',JSON.stringify(toWrite))
  console.log("All results has been sorted and saved to the file differenceList.json, and the api price lists are saved to api1prices and api2prices")
  console.log("The item with the highest difference is "+byDiff[0].name+" with a price difference of "+byDiff[0].absDifference+", where api1 says its worth "+byDiff[0].price1+", and api2 says its worth "+byDiff[0].price2)
  console.log(statistics.differPercentage+"% of the items in the two API:s had different prices, "+statistics.differentPrice+" items had different prices and "+statistics.samePrice+" had the same price")
  console.log("The statistics has also been added to the result document")
}
