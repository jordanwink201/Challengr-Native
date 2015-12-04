/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var Button = require('../common/button');

var DetailChallenge = React.createClass({

  getInitialState: function(){
    return {
      title: this.props.challenge.title,
      type: this.props.challenge.type,
      Challenger: this.props.challenge.Challenger,
      Challenged: this.props.challenge.Challenged,
      description: this.props.challenge.description,
      charityAmount: this.props.challenge.charityAmount,
      expiresDate: this.props.challenge.expiresDate,
      likes: this.props.challenge.likes,
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderMain()}
        {this._renderFooter()}
      </View>
    );
  },

  _renderHeader: function(){
    return(
      <View style={styles.header}>
        <Image 
          style={styles.challengerPhoto}
          source={{uri: this.state.Challenged.photoURL}} />
        <Text style={styles.socialText}>{this.state.charityAmount}</Text>
        <Text style={styles.socialText}>{this.state.expiresDate}</Text>
        <Text style={styles.socialText}>{this.state.likes}</Text>
      </View>
    )
  },

  _renderMain: function(){
    return(
      <View style={styles.main}>
        <Text>{this.state.type}</Text>
        <Text>{this.state.description}</Text>
      </View>
    )
  },

  _renderFooter: function(){
    return(
      <View style={styles.footer}>
        <Button
          text={'Upload Images'}
          onPress={this.signIn}/>
      </View>
    )
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flex: 1,
    marginTop: 66,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  challengerPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  socialText: {
    alignSelf: 'center',
  },
  // Main
  main: {
    flex: 2,
    padding: 10,
  },
  // Footer
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 49,
  },
});


module.exports = DetailChallenge;