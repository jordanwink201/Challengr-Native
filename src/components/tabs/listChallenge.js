/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
} = React;

var API = require('../../api/challenges/challenges');

var ListChallenge = React.createClass({

  render: function() {
    return (
      <TouchableHighlight 
        onPress={() => this.props.showDetailView(this.props.rowData)}
        key={this.props.rowData.id}
        underlayColor='transparent'
        style={styles.row}>
        <View style={styles.rowContainer}>

          <View style={styles.leftRow}>
            <Image 
            style={styles.rowPhoto}
            source={{uri: this.props.rowData.Challenged.photoURL}} />
          </View>

          <View style={styles.rightRow}>
            <View style={styles.rowData}>
              <Text style={styles.rowDataTitle}>{this.props.rowData.title}</Text>
              <Text style={styles.rowDataDescription}>{this.props.rowData.description}</Text>
            </View>

            <View style={styles.rowSocial}>
              <View style={styles.iconText}>
                <Icon
                  name='material|money'
                  size={15}
                  style={styles.icon} />
                <Text style={styles.rowSocialText}>{this.props.rowData.charityAmount * 100}</Text>
              </View>

              <TouchableHighlight
                onPress={() => this.increaseLike(this.props.rowData)}
                underlayColor='transparent'>
                <View style={styles.iconText}>
                  <Icon
                  name='material|favorite-outline'
                  size={15}
                  style={styles.icon} />
                  <Text style={styles.rowSocialText}>{this.props.rowData.likes}</Text>
                </View>
              </TouchableHighlight>

              <View style={styles.iconText}>
                <Icon
                name='material|time'
                size={15}
                style={styles.icon} />
                <Text style={styles.rowSocialText}>{this.props.rowData.issuedDate}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  increaseLike: function(challenge){

    var updateObj = {
      id: challenge.id,
      likes: ++challenge.likes,
      completed: challenge.completed,
      notCompleted: challenge.notCompleted,
    };

    API.updateChallenge(this.props.token, updateObj)
  },

});

// Validation
ListChallenge.propTypes = {
  rowData: React.PropTypes.object.isRequired,
  showDetailView: React.PropTypes.func.isRequired
}

var styles = StyleSheet.create({
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
  iconText: {
    flexDirection: 'row',
  },
  rowSocialText:{
    color: '#546979',
    fontSize: 14,
  },
  leftRow: {
    flex: 1,
    alignSelf: 'center',
  },
  rightRow: {
    flex: 4,
    alignSelf: 'center',
  },

  // icon
  icon: {
    width: 15,
    height: 15,
  }
});


module.exports = ListChallenge;