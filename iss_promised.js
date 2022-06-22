const request = require('request-promise-native');


const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}?apikey=F4u9CLCdegKCpG9cNAiYtBvXDXQPHWxgUEQiEcM5`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};

module.exports =  { nextISSTimesForMyLocation };
  

    
   
  

