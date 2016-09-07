import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ProgressBar extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    messageColor: PropTypes.string,
    processBarColor: PropTypes.string,
    processBarSize: PropTypes.oneOf(['small', 'large']),
    backgroundColor: PropTypes.string,
    hideIndicator: PropTypes.bool,
  };

  static defaultProps = {
    messageColor: 'rgba(100, 100, 100, 1)',
    processBarColor: 'rgba(200, 200, 200, 1)',
    processBarSize: 'small',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    hideIndicator: false,
  };

  render() {
    return (
      <View style={styles.processBar}>
      {
        !this.props.hideIndicator &&
          <View style={styles.indicator}>
            <ActivityIndicator
              animating
              color={this.props.processBarColor}
              size={this.props.processBarSize}
            />
          </View>
      }

        <View>
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
    );
  }
}

const styles = StyleSheet.create({
  processBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  indicator: {
    width: 40,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
