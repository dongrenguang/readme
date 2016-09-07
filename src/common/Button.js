import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Button extends Component {
  static propTypes = {
    handlePress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    adaptiveWidth: PropTypes.bool,
    adaptiveHeight: PropTypes.bool,
    alignSelf: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    borderRadius: PropTypes.number,

  };

  static defaultProps = {
    width: 60,
    height: 30,
    adaptiveWidth: false,
    adaptiveHeight: false,
    alignSelf: 'center',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    fontSize: 15,
    color: 'rgba(10, 10, 10, 1)',
    borderRadius: 5,
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handlePress}
        style={[
          styles.button,
          this.props.adaptiveWidth ? {} : { width: this.props.width },
          this.props.adaptiveHeight ? {} : { height: this.props.height },
          {
            backgroundColor: this.props.backgroundColor,
            marginTop: this.props.marginTop,
            marginRight: this.props.marginRight,
            marginBottom: this.props.marginBottom,
            marginLeft: this.props.marginLeft,
            borderRadius: this.props.borderRadius,
            alignSelf: this.props.alignSelf,
          },
        ]}
      >
        <View
          style={{
            paddingTop: this.props.paddingTop,
            paddingRight: this.props.paddingRight,
            paddingBottom: this.props.paddingBottom,
            paddingLeft: this.props.paddingLeft,
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: this.props.fontSize,
                color: this.props.color,
              },
            ]}
          >
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
