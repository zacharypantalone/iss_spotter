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


const callback = function(error, ip) {
  
  console.log(error, ip);

};

fetchMyIP(callback);

module.exports = { fetchMyIP };