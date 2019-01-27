require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var operation = process.argv[2];
var args = process.argv;
var searchQuery = "";

for (var i = 3; i < args.length; i++) {
    searchQuery += " " + args[i];
}
searchQuery = searchQuery.trim();
switch(operation){
    case 'concert-this':
        getBandInfo(searchQuery);
        break;
    case 'movie-this':
        getMovieInfo(searchQuery);
        break;
    case 'spotify-this-song':
        getSongInfo(searchQuery);
        break;
    case 'do-what-it-says':
        getWhatItSays();
        break;
}
function getWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        for(var i = 0; i<dataArr.length; i=i+2)
        switch(dataArr[i]){
            case 'concert-this':
                getBandInfo(dataArr[i+1]);
                break;
            case 'movie-this':
                getMovieInfo(dataArr[i+1]);
                break;
            case 'spotify-this-song':
                getSongInfo(dataArr[i+1]);
                break;
            case 'do-what-it-says':
                getWhatItSays();
                break;
        }
      });
}
function getBandInfo(var1 ){
    if(var1=="")
    {
        var1 = "Ariana Grande";
    }
    console.log(var1);
    var bandURL = "https://rest.bandsintown.com/artists/" + var1 + "/events?app_id=codingbootcamp"
    axios.get(bandURL).then(
        function(response) {
            console.log("Venue: "+response.data[0].venue.name);
            console.log("City: "+response.data[0].venue.city);
            console.log("Date: "+moment(response.data[0].datetime).format('MM/DD/YYYY'));
        }).catch(function(err) {
            console.log(err);
          });
}
function getSongInfo(var1){
    if(var1=="")
    {
        var1 = "The Sign Ace of Base";
    }
    spotify.search({ type: 'track', query: var1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    //   console.log(JSON.stringify(data, null, 2));
      console.log("Artist: "+data.tracks.items[0].artists[0].name); 
      console.log("Song name: "+data.tracks.items[0].name);
      console.log("URL: "+data.tracks.items[0].external_urls.spotify);
      console.log("Album: "+data.tracks.items[0].album.name);
      });
}
function getMovieInfo(var1){
    if(var1=="")
    {
        var1 = "Mr. Nobody";
    }
    var movieURL = "http://www.omdbapi.com/?t=" + var1 + "&y=&plot=short&apikey=trilogy";
    axios.get(movieURL).then(
        function(response) {
            console.log("Title: "+response.data.Title);
            console.log("Year: "+response.data.Year);
            console.log("IMDB Rating: "+response.data.imdbRating);
            console.log("Rotten Tomato score: "+response.data.Ratings[1].Value);
            console.log("Country: "+response.data.Country);
            console.log("Language(s): "+response.data.Language);
            console.log("Plot: "+response.data.Plot);
            console.log("Actors: "+response.data.Actors);
        });
}