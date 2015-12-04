var API = require('../api');

// Routes
var userChallengesURL = `${API.rootUrl}challenge/my`;
var challengesURL = `${API.rootUrl}challenge/`;

var UserAPI = {

  getChallenges: function(token){
    return API.fetchJSON(userChallengesURL, 'GET', null, token)      
      .then(function(json){
        return json;
      });
  },

  getAllChallenges: function(token){
    return API.fetchJSON(challengesURL, 'GET', null, token)      
      .then(function(json){
        return json;
      });
  },

  updateChallenge: function(token, obj){
    return API.fetchJSON(challengesURL, 'PUT', obj, token)
      .then(function(json){
        console.log('response : ', json);
        return json;
      })    
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  }

}

module.exports = UserAPI;