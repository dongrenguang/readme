import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TouchableTextBox extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    textMarginTop: PropTypes.number,
    textMarginBottom: PropTypes.number,
    displayBorder: PropTypes.bool,
    borderColor: PropTypes.string,
    handlePress: PropTypes.func,
    displayRemoveIcon: PropTypes.bool,
    handleRemovePress: PropTypes.func,
  };

  static defaultProps = {
    width: 50,
    height: 20,
    backgroundColor: 'rgba(250, 250, 250, 0.5)',
    textColor: 'rgba(100, 100, 100, 1)',
    fontSize: 15,
    textMarginTop: 0,
    textMarginBottom: 0,
    displayBorder: true,
    borderColor: 'rgba(80, 80, 80, 1)',
    handlePress: () => {},
    displayRemoveIcon: false,
    handleRemovePress: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      textColor: null,
      displayRemoveIcon: false,
    };

    this.minLength = Math.min(this.props.width, this.props.height);
    this.innerBoxWidthScale = 0.8;
    this.innerBoxHeightScale = 0.6;
    this.minScale = (this.props.width > this.props.height) ? this.innerBoxHeightScale : this.innerBoxWidthScale;
  }

  componentWillMount() {
    this.setState({
      textColor: this.props.textColor,
      displayRemoveIcon: this.props.displayRemoveIcon,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      textColor: nextProps.textColor,
      displayRemoveIcon: nextProps.displayRemoveIcon,
    });
  }

  renderRemoveIcon() {
    if (!this.state.displayRemoveIcon) {
      return null;
    }

    const removeIconSize = this.minLength * (1 - this.minScale) * 0.8;
    let top = this.props.height * (1 - this.innerBoxHeightScale) * 0.5 - removeIconSize * 0.5;
    let left = this.props.width * (1 - this.innerBoxWidthScale) * 0.5 - removeIconSize * 0.5;
    top = (top < 0) ? 0 : top;
    left = (left < 0) ? 0 : left;
    return (
      <TouchableOpacity
        onPress={this.props.handleRemovePress}
        style={[
          styles.removeIcon,
          {
            height: removeIconSize,
            width: removeIconSize,
            top: top + 4,
            left: left + 4,
            borderRadius: removeIconSize * 0.5,
          },
        ]}
      >
        <Text style={styles.removeIconText}>×</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[styles.textBox, { width: this.props.width, height: this.props.height }]}>
        <TouchableOpacity onPress={this.props.handlePress}>
          <View
            style={[
              styles.innerBox,
              {
                width: this.props.width * 0.8,
                height: this.props.height * 0.6,
                backgroundColor: this.props.backgroundColor,
                borderColor: this.props.borderColor,
                borderWidth: (this.props.displayBorder ? 1 : 0),
                borderRadius: this.props.displayBorder ? (this.minLength * 0.15) : 0,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: this.state.textColor,
                  fontSize: this.props.fontSize,
                  marginTop: this.props.textMarginTop,
                  marginBottom: this.props.textMarginBottom,
                },
              ]}
            >
            {this.props.text}
            </Text>
          </View>
        </TouchableOpacity>
        {this.renderRemoveIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    justifyContent: 'center',
  },
  innerBox: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  removeIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(180, 180, 180, 1)',
    justifyContent: 'center',
  },
  removeIconText: {
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'rgba(250, 250, 250, 1)',
    fontSize: 16,
    marginBottom: 2,
  },
});
