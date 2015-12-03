var React = require('react-native');

var {
  StyleSheet,
  Text,
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
      email: '',
      password: '',
      errorMessage: '',
    }
  },

  render: function(){
    return (
      <View style={styles.container}>
      
        <Text>Sign In</Text>

        <Text>{this.state.errorMessage}</Text>

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
          text={'Sign In'}
          onPress={this.signIn}/>

        <Link
          text={'Create Account'}
          onPress={this.createAccount}/>  

      </View>
    )
  },

  createAccount: function(){
    // navigate to signup page
    this.props.navigator.push({name: 'createAccount'})
  },

  signIn: function(){

    var self = this;

    // Validation
    if (self.state.email !== '' && self.state.password !== '') {

      // API 
      API.signin(self.state.email, self.state.password)
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
          } else{
            // Clear State & Show Error
            self.setState({
              email: '',
              password: '',
              errorMessage: data.message
            });
          }

        })

    } else {
      self.setState({
        errorMessage: 'Please fill in an email and password'
      });
    }

  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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