/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} = React;

var ChooseFriend = require('./chooseFriend');

var CreateChallenge = React.createClass({

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: ChooseFriend,
          title: 'Choose Friend',
          passProps: { myProp: 'foo' },
        }}
      />
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


module.exports = CreateChallenge;
