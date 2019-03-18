import React from 'react';
import { Auth } from 'aws-amplify';
import { View, Button } from 'react-native';

export default class Header extends React.Component {
  render() {
    // const { authState } = this.props
    // const signedIn = (authState === 'signedIn')
    return (
      <View>
        <Button title="Sign Out brother" onPress={this.props.signOut} />
      </View>
    );
  }
}
