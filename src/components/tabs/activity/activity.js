/* @flow */
'use strict';

var React = require('react-native');

var { Icon, } = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

/*
  <Icon
    name='material|accounts-alt'
    size={70}
    color='#3b5998'
    style={styles.beer}
  />
*/

var Icons = ['favorite-outline', 'favorite', 'card', 'camera', 'time', 'facebook-box', 'facebook', 'twitter', 'account', 'accounts-alt', 'search', 'settings', 'money'];

var API = require('../../../api/challenges/challenges');
var DetailChallenge = require('../detailChallenge');

var Activity = React.createClass({

  componentDidMount: function(){
    var self = this;
    // Loader
    self.state.isLoading = true;
    // Async Storage
    AsyncStorage.getItem('token')
      .then((token) => {
        // API
        API.getAllChallenges(token)
          .then(function(challenges){
            console.log('all challenges : ', challenges);
            // Loader
            self.state.isLoading = false;
            // State
            self.setState({
              dataSource: self.getDataSource(challenges),
            })
          })

      })
      .done();
  },

  getInitialState: function(){
    return {
      isLoading: false,
      photoURL: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          renderSeparator={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
        />
      </View>
    );
  },

  _renderRow: function(rowData){
    // console.log('Redner row... : ', rowData);
    // var challengedPhoto = rowData.Challenged.photoURL;
    // console.log('challenged : ', challengedPhoto);
    return (
      <TouchableHighlight 
        onPress={() => this._showDetailView(rowData)}
        key={rowData.id}
        underlayColor='transparent'
        style={styles.row}>
        <View style={styles.rowContainer}>
          <View style={styles.leftRow}>

          </View>
          <View style={styles.rightRow}>
            <View style={styles.rowData}>
              <Icon
                name='ion|beer'
                size={150}
                color='#887700'
                
              />
              <Text style={styles.rowDataTitle}>{rowData.title}</Text>
              <Text style={styles.rowDataDescription}>{rowData.description}</Text>
            </View>
            <View style={styles.rowSocial}>
              <Text style={styles.rowSocialText}>{rowData.charityAmount}</Text>
              <Text style={styles.rowSocialText}>{rowData.likes}</Text>
              <Text style={styles.rowSocialText}>{rowData.issuedDate}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  _showDetailView: function(challenge){

    console.log('challenge : ', challenge);

    this.props.navigator.push({
      title: challenge.title,
      component: DetailChallenge,
      passProps: {challenge: challenge}
    });
  },

  _renderFooter: function(){
    if (this.state.isLoading === true) {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    }
  },

  _renderSeparator: function(){
    return <View style={styles.separator}/>
  },

  getDataSource: function(challenges: Array<any>): ListView.DataSource{
    return this.state.dataSource.cloneWithRows(challenges);
  }

});

var styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    marginTop: 60,
  },

  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },

  // List View
  row: {
    marginBottom: 5,
    marginTop: 5,
  },
  separator: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowPhoto: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  // title & description
  rowData: {

  },
  rowDataTitle: {
    color: '#546979',
    fontSize: 18,
  },
  rowDataDescription: {
    color: '#546979',
    fontSize: 16,
  },
  // likes, time, charity amount
  rowSocial:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowSocialText:{
    color: '#546979',
    fontSize: 14,
  },
  leftRow: {
    flex: 1,
    backgroundColor: 'blue',
  },
  rightRow: {
    flex: 4,
    alignSelf: 'center',
  },

});


module.exports = Activity;
