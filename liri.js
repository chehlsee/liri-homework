//vars
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
//var Spotify = require('spotify-web-api-node');
var SpotifyPackage = require('node-spotify-api');
//creates log.txt file
var filename = 'log.txt';
console.log(filename);

//return on dontenv to load up environment variables from .env file
var dotEnv = require("dotenv").config();
console.log(dotEnv);

//argv[2] chooses users actions; argv[3] is input parameter, ie; movie title
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

//concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}

// Fetch Spotify Keys
var spotify = new SpotifyPackage(keys.spotify);

// Writes to the log.txt file
var getArtistNames = function (artist) {
    return artist.name;
};

// Function for running a Spotify search - Command is spotify-this-song
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

//Switch command
function mySwitch(userCommand) {

    //choose which statement (userCommand) to switch to and execute
    switch (userCommand) {

        case "spotify-this-song":
            getSpotify(secondCommand);
            break;

        case "movie-this":
            getMovie(secondCommand);
            break;

            case "concert-this":
            getEvent(secondCommand);
            break;        
            case "artist-this":
            getArtist(secondCommand);
            break;

        case "do-what-it-says":
            doWhat();
            break;
    }
}

//OMDB Movie - command: movie-this
function getMovie() {
    // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
    var movieName = secondCommand;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            console.log('================ Movie Info ================');
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
            console.log('==================THE END=================');

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
    });
}

//Function for command do-what-it-says; reads and splits random.txt file
//command: do-what-it-says
function doWhat() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        //split text with comma delimiter
        var cmds = data.toString().split(',');
    });
}


// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

//Bands in Town - command: concert-this
function getEvent() {
    // following OMDB code 
    var artistName = secondCommand;
    // Then run a request to the Bands in town API with the event information 
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=c64e7377ddf9167af5426b26689ba3f7";
  
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
  
        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
  
            //Simultaneously output to console and log.txt via NPM simple-node-logger
            console.log('================ Event Info ================');
            console.log(body[0])
            console.log('==================THE END=================');

            //function that prints the parts of one item you want


            for(var x = 0; x < body.length; x++){
                var event = body[x];
                console.log(
`Country: ${event.venue.country}
City: ${event.venue.city}
${4+4}`    
                )
            }

            // for loop that walks through each item of the array, and calls that function on it
  
        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in an event title
        if (artistName === "Taking Back Sunday") {
            console.log("-----------------------");
            console.log("If you haven't heard of them,' then you should");
            console.log("It's on Youtube!");
        }
    });
  }

  https://rest.bandsintown.com/artists/u2?app_id=c64e7377ddf9167af5426b26689ba3f7
  function getArtist() {
    // following OMDB code 
    var artistName = secondCommand;
    // Then run a request to the Bands in town API with the event information 
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=c64e7377ddf9167af5426b26689ba3f7";
  
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
  
        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
  
            //Simultaneously output to console and log.txt via NPM simple-node-logger
            console.log('================ Event Info ================');
            console.log("ID: " + body.id);
            console.log("Name: " + body.name);
            console.log("URL: " + body.url);
            console.log("Image_URL: " + body.image_url);
            console.log("Thumb_URL: " + body.thumb_url);
            console.log("Facebook_Page_URL: " + body.facebook_page_url);
            console.log('==================THE END=================');
  
        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in an event title
        if (artistName === "Taking Back Sunday") {
            console.log("-----------------------");
            console.log("If you haven't heard of them,' then you should");
            console.log("It's on Youtube!");
        }
    });
  }


//Closes mySwitch func - Everything except the call must be within this scope

//Call mySwitch function
mySwitch(userCommand);