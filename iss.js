const request = require('request');


const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  
  request(url, function(error, response, body) {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body));
  });
};

    
const fetchCoordsByIP = function(ip, callback) {
  const coordinateAPI = `https://freegeoip.app/json/${ip.ip}?apikey=F4u9CLCdegKCpG9cNAiYtBvXDXQPHWxgUEQiEcM5`;
  
  request(coordinateAPI, (error, response, body) => {

    const data = JSON.parse(body);
    const long = data.longitude;
    const lat = data.latitude;

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, {long, lat});
  });
};
  

const fetchISSFlyOverTimes = function(coords, callback) {
  const flyOverAPI = `https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.long}`;
  
  request(flyOverAPI, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    
    callback(null,data);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(location, (error, passes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passes);
      });
    });
  });
};
    

module.exports = { nextISSTimesForMyLocation};