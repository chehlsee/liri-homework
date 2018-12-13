# LIRI Bot
### LIRI is like iPhone's SIRI, however, while SIRI is a Speech Interpretation and Recognition Interface,
### LIRI is a Language Interpretation and Recognition Interface. 
### LIRI is a command line node app that takes in on of four parameters and returns the relative data.
`` spotify-this-song ``
`` movie-this ``
`` concert-this ``
`` do-what-it-says ``

1. Deployment
2. Clone repo
3. Run npm install
4. At command prompt run node liri.js <pass in an instruction from above>
5. Screenshot of this Project
6. Liri Bot

## The syntax to run the program is:
### node liri.js spotify-this-song "float on"
![Working Code in Terminal for Spotify-this-song "Float On"](https://github.com/chehlsee/liri-homework/blob/master/spotify-this-song.png "Spotify-this-song") 
* ## Logs the following information:
* artist(s)
* song name
* preview link of the song from spotify
* album
* if no song is provided then the program will output information for the song "What's my age again?" by Blink 182

## The syntax to run the program is:
### node liri.js movie-this " "

 ## Logs the following information:
* Title
* Year
* IMDB Rating
* Country
* Language
* Plot
* Actors
* Rotten Tomatoes Rating
* Rotten Tomatoes URL
* if no movie is provided then the program will output information for the movie "The Secret Window" with Johnny Depp

## The syntax to run the program is:
### node liri.js concert-this " "

## Logs the following information:
* Artist's name
* APP_ID
* Event List
* Dates (yyy-mm-dd)

* ### The program will take the text inside of random.txt and use it to call the first command with the second part as it's parameter
* ### Currently in random.txt, the following text is there:
`` spotify-this-song, "I want it my way" ``

# Technologies Utilized
* NodeJS
* JavaScript
* Spotify API
* Bands in Town API
* OMDB API
* NPM installer
* NPM spotify-web-api-node
* NPM dotenv
* NPM request



``keys.js code for spotify, bandsintown
exports.spotify = {
id:" ",
secret: " "
};
``

  ## Installation

To run the application locally, first clone this repository with the following command.

	git clone git@github.com:chehlsee/liri-homework.git
	
Next, install the application dependencies.

	cd liri-homework
	npm install
	
Finally, run the node server locally.

	node liri.js `spotify-this-song "float on"`, `concert-this "john legend"`, `movie-this "Eternal Sunshine"`, `do-what-it-says`
	

 # Copyright
 (C) Chehlsee 2018. All Rights Reserved.
