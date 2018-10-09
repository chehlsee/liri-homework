//import modules and packages
const request= require("request");
const spotify= require("node-spotify-api");
const moment= require("moment");

//return on dontenv to load up environment variables from .env file
require("dotenv").config();
const spotifykeys = require("keys.js");

const spotify= new spotify (spotifykeys.spotify);

