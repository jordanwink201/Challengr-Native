/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var API = require('../../../api/challenges/challenges');

var Activity = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  },

});


var styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});


module.exports = Activity;
