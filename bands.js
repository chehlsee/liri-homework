//Bands in Town - command: concert-this
function eventName() {
  // following OMDB code 
  var eventName = secondCommand;
  // Then run a request to the Bands in town API with the event information 
  var queryUrl = "https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0" + eventName;

  request(queryUrl, function (error, response, body) {

      // If the request is successful = 200
      if (!error && response.statusCode === 200) {
          var body = JSON.parse(body);

          //Simultaneously output to console and log.txt via NPM simple-node-logger
          console.log('================ Event Info ================');
          console.log("Title: " + body.Title);
          console.log("Event Date: " + body.Date);
          console.log("Country: " + body.Country);
          console.log('==================THE END=================');

      } else {
          //else - throw error
          console.log("Error occurred.")
      }
      //Response if user does not type in an event title
      if (eventName === "Taking Back Sunday") {
          console.log("-----------------------");
          console.log("If you haven't heard of them,' then you should");
          console.log("It's on Youtube!");
      }
  });
}