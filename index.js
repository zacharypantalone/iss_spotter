const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes.response) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});




// const { fetchMyIP } = require("./iss");
// const { fetchCoordsByIP } = require("./iss");
// const { fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// fetchMyIP((error, ip) => {
//   console.log(ip.ip);
  
//   fetchCoordsByIP(ip.ip, (error, data) => {
//     console.log(error, data);
//   });
// });

// const coords = {longitude: '-75.69277954101562', latitude: '45.44422912597656'  };
// const callback = (error, response) => {
//   if (error) {
//     console.error("Didn't work!", error);
//     return;
//   }
//   console.log("These are the fly over times: ", response);
// };

// fetchISSFlyOverTimes(coords, callback);

