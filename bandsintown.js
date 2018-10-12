// compressed version of wrapper for the BandsInTown events search js API
{/* <script src="./../dist/bit-events.min.js"></script> */}


// Fetch Bands In Town keys
var bandsInTownAPI = new bandsInTownAPIPackage(keys.bandsInTownAPI);

//writes to the log.txt file
var getArtist = function (artist) {
  return artist.name;
};

//Function for running a Bands In Town search - command is concert-this
var getArtistEventList = function (eventName) {
  if (eventName === undefined) {
    eventName = "Taking Back Sunday";
  }

  bandsInTownAPI.search(
    {
      type: "string",
      documentation: "yyyy-mm-dd"
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var event = data.artist.items;

      for (var i = 0; i < event.length; i++) {
        console.log(i);
        console.log("artist(s): " + event[i].artist.map(getArtist));
        console.log("event name: " + event[i].name);
        console.log("-------------------------");
      }


    }
  );
};


