const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");

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

