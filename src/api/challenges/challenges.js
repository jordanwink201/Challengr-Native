var API = require('../api');

// Routes
var userChallengesURL = `${API.rootUrl}challenge/user`;
var allChallengesURL = `${API.rootUrl}challenge/`;

var UserAPI = {

  getChallenges: function(token){
    return API.fetchJSON(userChallengesURL, 'GET', null, token)      
      .then(function(json){
        return json;
      })
      .catch((err) => {
        console.log('ERROR : ', err)
      });
  },

  getAllChallenges: function(token){
    return API.fetchJSON(allChallengesURL, 'GET', null, token)      
      .then(function(json){
        return json;
      })
      .catch((err) => {
        console.log('ERROR : ', err)
      });
  }

}

module.exports = UserAPI;