/* @flow */
'use strict';

var React = require('react-native');

var { TabBarIOS } = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var {
  StyleSheet,
  View,
  Text,
} = React;

var CreateChallenge = require('./createChallenge/tabChallenge');
var ActivityTab = require('./activity/tabActivity');
var ProfileTab = require('./profile/tabProfile');

var Tabs = React.createClass({

  getInitialState: function(){
    return {
      selectedTab : 'activityTab'
    }
  },

  render: function() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#c1d82f'}
        barTintColor={'#000000'}
        styles={styles.tabBar}>
        <TabBarItemIOS
            iconName={'ion|ios-paper-outline'}
            selectedIconName={'ion|ios-paper'}
            title={'create challenge'}
            iconSize={32}
            selected={this.state.selectedTab === 'createChallengeTab'}
            onPress={() => {
            this.setState({ selectedTab: 'createChallengeTab', });
          }}>
          <CreateChallenge/>
        </TabBarItemIOS>
        <TabBarItemIOS
            iconName={'ion|chatboxes'}
            title={'activity'}
            iconSize={32}
            selected={this.state.selectedTab === 'activityTab'}
            onPress={() => {
            this.setState({ selectedTab: 'activityTab' });
          }}>
          <ActivityTab/>
        </TabBarItemIOS>
        <TabBarItemIOS
            iconName={'ion|ios-gear-outline'}
            selectedIconName={'ion|ios-gear'}
            title={'profile'}
            iconSize={32}
            selected={this.state.selectedTab === 'profileTab'}
            onPress={() => {
            this.setState({ selectedTab: 'profileTab' });
          }}>
          <ProfileTab/>
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
});


var styles = StyleSheet.create({

});


module.exports = Tabs;
