/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
} = React;

var Button = require('../../common/button');

var Settings = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.props.user.firstName} {this.props.user.lastName}</Text>
        <Text>{this.props.user.email}</Text>

        <Text>Load Billing information</Text>

        <Button
          text={'Sign Out'}
          onPress={this._signout}/>

      </View> 
    );
  },

  _signout: function(){
    // clear the async storage and go to the sign in view
    this.navigator.popToTop();
  }

});

// Validation
Settings.propTypes = {
  user: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


module.exports = Settings;
