var React = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
} = React;

var Button = require('../common/button');
var Link = require('../common/link');
var API = require('../../api/auth/auth.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
    }
  },

  render: function() {
    return (
      <View style={styles.container}>

        <Text>Create Account</Text>

        <Text>{this.state.errorMessage}</Text>

        <Text>First Name</Text>
        <TextInput 
          value={this.state.firstName}
          onChangeText={(text) => this.setState({firstName: text})}
          style={styles.textInput}/>

        <Text>Last Name</Text>
        <TextInput 
          value={this.state.lastName}
          onChangeText={(text) => this.setState({lastName: text})}
          style={styles.textInput}/>  

        <Text>Email Address</Text>
        <TextInput 
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          style={styles.textInput}/>

        <Text>Password</Text>
        <TextInput 
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          style={styles.textInput}/>

        <Button
          text={'Create Account'}
          onPress={this.createAccount}/>  

        <Link
          text={'Sign In'}
          onPress={this.signIn}/>

      </View>
    );
  },

  createAccount: function(){
    var self = this;

    // Validation
    if (self.state.firstName !== '' && self.state.lastName !== '' && self.state.email !== '' &&self.state.password !== '') {

      API.createAccount(self.state.firstName, self.state.lastName, self.state.email, self.state.password)
        .then(function(data){
          if (data.success === true) {
            // AsyncStorage
            AsyncStorage.setItem('id', data.user.id.toString());
            AsyncStorage.setItem('email', data.user.email);
            AsyncStorage.setItem('firstName', data.user.firstName);
            AsyncStorage.setItem('lastName', data.user.lastName);
            AsyncStorage.setItem('photoURL', data.user.photoURL);
            AsyncStorage.setItem('token', data.token);
            // Navigation
            self.props.navigator.immediatelyResetRouteStack([{ name: 'tabs' }])
          } else {
            // Clear State & Show Error
            self.setState({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              errorMessage: data.message
            });
          }

        })

    } else {
      self.setState({
        errorMessage: 'Please fill out all information to create an account'
      });
    }
    
  },

  signIn: function(){
    this.props.navigator.pop();
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: 200, // width require alignSelf
    padding: 5,
    alignSelf: 'center',
  }
});