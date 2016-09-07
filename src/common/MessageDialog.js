import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import DialogContainer from './DialogContainer';

export default class MessageDialog extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    messageColor: PropTypes.string,
    processBarColor: PropTypes.string,
    processBarSize: PropTypes.oneOf(['small', 'large']),
    backgroundColor: PropTypes.string,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
  };

  static defaultProps = {
    messageColor: 'rgba(250, 250, 250, 1)',
    processBarColor: 'rgba(200, 200, 200, 1)',
    processBarSize: 'large',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  render() {
    return (
      <DialogContainer {...this.props}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: this.props.backgroundColor,
              marginTop: this.props.marginTop,
              marginBottom: this.props.marginBottom,
              marginLeft: this.props.marginLeft,
              marginRight: this.props.marginRight,
              paddingTop: this.props.paddingTop,
              paddingBottom: this.props.paddingBottom,
              paddingLeft: this.props.paddingLeft,
              paddingRight: this.props.paddingRight,
            },
          ]}
        >
          <View style={styles.processBar}>
            <ActivityIndicator
              animating
              color={this.props.processBarColor}
              size={this.props.processBarSize}
            />
          </View>

          <View style={styles.message}>
            <Text
              style={[
                styles.messageText,
                {
                  color: this.props.messageColor,
                },
              ]}
            >
            {this.props.message}
            </Text>
          </View>
        </View>
      </DialogContainer>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
  },
  processBar: {
    width: 50,
  },
  message: {
    marginHorizontal: 20,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 18,
  },
});
