const request = require("request");

const Spotify = require("node-spotify-api");

const moment = require("moment");

var fs = require("fs");

// turn on /env to load up event variables from the .env files
require("dotenv").config();

var keys = require("./keys");

const spotifyKeys = keys.spotify;

const spotify = new Spotify(spotifyKeys);

// node liri.js concert-this bandsInTown function
var bandsInTown = function (functionInfo) {

  console.log("https://rest.bandsintown.com/artists/" + functionInfo.replace(" ", '') + "/events?app_id=codingbootcamp")
  request("https://rest.bandsintown.com/artists/" + functionInfo.replace(" ", '') + "/events?app_id=codingbootcamp", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var answer = JSON.parse(body);

      //  var dateTime = moment(answer[0].dateTime)
       console.log(moment(answer[0].dateTime).format('DD-MM-YYYY'));
      //  .split("T")[0], "YYYY-MM-DD").format("MM-DD-YYYY");
      // var dateTime = moment.format('YYYY-MM-DD[T]HH:mm');

       console.log(`
     Name of Venue: ${answer[0].venue.name}
     Venue Location: ${answer[0].venue.country}
     `);
    }
  });
}


// node liri.js spotify-this-song "song name here"
// Function for running a Spotify search - Command is spotify-this-song


var spotifyThis = function (functionInfo) {

  searchQuery = functionInfo;
  console.log(searchQuery);
  if (!searchQuery) {
    searchQuery = "The Sign by Ace of Base"
  }


spotify.search({ type: 'track', query: searchQuery}, function (err, data) {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log(
      `Artist: ${data.tracks.items[0].album.artists[0].name}
      The song's Name: ${data.tracks.items[0].name}
      A preview link of the song from Spotify: ${data.tracks.items[0].preview_url}
      The Album that the Song is From: ${data.tracks.items[0].album.name}
      `)
  }
})

}

function userPick(choice, functionInfo) {
  console.log(choice, functionInfo)
  switch (choice) {
    case "concert-this":
      bandsInTown(functionInfo);
      break;
    case "spotify-this-song":
      spotifyThis(functionInfo);
      break;
    case "movie-this":
      movieThis(functionInfo);
      break;
    case "do-what-it-says":
      doIt();
      break;
    default: console.log("Not a valid command")
  }
}

var query = '';
for(var i = 3; i < process.argv.length; i++) {
  query += ' ' + process.argv[i]
}

userPick (process.argv[2], query);

// node liri.js movie-this "movie name here" 
function movieThis(movieName) {

  if (movieName === '') {
    movieName = "Mr. Nobody"
  }

  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
  var callback = function(err, res, body){
// If the request is successful = 200
      // the response status code has to be 200 to run
      if (!err && res.statusCode === 200) {
        // console.log(body);
        //Simultaneously output to console and log.txt via NPM simple-node-logger
        // parse the body of the site and recover the title, release year, imdb rating, country, language, plot, actors, rotten tomatoes rating, and rotten tomatoes url
        parsedBody = JSON.parse(body);
        console.log('================ Movie Info ================');
        console.log("Title: " + parsedBody.Year);
        console.log("Release Year: " + parsedBody.Year);
        console.log("IMdB Rating: " + parsedBody.imdbRating);
        console.log("Country: " + parsedBody.Country);
        console.log("Language: " + parsedBody.Language);
        console.log("Plot: " + parsedBody.Plot);
        console.log("Actors: " + parsedBody.Actors);
        console.log("Rotten Tomatoes Rating: " + parsedBody["Ratings"][0].Value);
        console.log("Rotten Tomatoes URL: " + parsedBody.tomatoURL);
        console.log("================= THE END ==========");
    } else {
        //else - throw error
        console.log("Error occurred.")
    }
    //Response if user does not type in a movie title
    if (movieName === "The Secret Window") {
        console.log("-----------------------");
        console.log("If you haven't watched 'The Secret Window,' then you should: https://www.imdb.com/title/tt0363988/?ref_=fn_al_tt_1");
        console.log("It's on Netflix!");
    }
  }
    request(url, callback);
};

  // node liri.js do-what-it-says

  function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      // console.log(error,data)
      var response = data.split(",")
      userPick(response[0], response[1]);
    });
  }






