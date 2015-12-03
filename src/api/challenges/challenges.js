var API = require('../api');

// Routes
var userChallengesURL = `${API.rootUrl}challenge/my`;
var allChallengesURL = `${API.rootUrl}challenge/`;

var UserAPI = {

  getChallenges: function(token){
    return API.fetchJSON(userChallengesURL, 'GET', null, token)      
      .then(function(json){
        return json;
      });
  },

  getAllChallenges: function(token){
    return API.fetchJSON(allChallengesURL, 'GET', null, token)      
      .then(function(json){
        return json;
      });
  }

}

module.exports = UserAPI;