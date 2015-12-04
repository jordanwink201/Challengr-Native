var API = require('../api');

// Routes
var transactionsURL = `${API.rootUrl}braintree/transactions`;

var BraintreeAPI = {

  getTransactions: function(token){
    return API.fetchJSON(transactionsURL, 'GET', null, token)      
      .then(function(json){
        return json;
      });
  }

}

module.exports = BraintreeAPI;