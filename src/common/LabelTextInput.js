import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import TextArea from './TextArea';

export default class LabelTextInput extends Component {
  static propTypes = {
    handleChangeText: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    initialText: PropTypes.string,
    height: PropTypes.number,
    labelWidth: PropTypes.number,
    marginHorizontal: PropTypes.number,
    marginVertical: PropTypes.number,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    labelFontSize: PropTypes.number,
    labelFontColor: PropTypes.string,
    textFontSize: PropTypes.number,
    textFontColor: PropTypes.string,
    autoFocus: PropTypes.bool,
    keyboardType: PropTypes.string,
    multiline: PropTypes.bool,
    borderColor: PropTypes.string,
  };

  static defaultProps = {
    initialText: '',
    height: 35,
    labelWidth: 80,
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 5,
    placeholder: '',
    placeholderTextColor: 'rgba(150, 150, 150, 1)',
    labelFontSize: 15,
    labelFontColor: 'rgba(50, 50, 50, 1)',
    textFontSize: 15,
    textFontColor: 'rgba(10, 10, 10, 1)',
    autoFocus: false,
    keyboardType: 'default',
    multiline: false,
    borderColor: 'rgba(150, 150, 150, 1)',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentWillMount() {
    this.setState({
      text: this.props.initialText,
    });
  }

  onChangeText(text) {
    this.setState({
      text,
    });
    this.props.handleChangeText(text);
  }

  render() {
    return (
      <View
        style={[
          styles.labelTextInput,
          {
            height: this.props.height,
            marginHorizontal: this.props.marginHorizontal,
            marginVertical: this.props.marginVertical,
          },
        ]}
      >
        <View style={[styles.label, { width: this.props.labelWidth }]}>
          <Text
            style={[
              styles.labelText,
              {
                fontSize: this.props.labelFontSize,
                color: this.props.labelFontColor,
              },
            ]}
          >
          {this.props.label}
          </Text>
        </View>
        <View style={[styles.textInputWrapper, { borderColor: this.props.borderColor }]}>
        {
          this.props.multiline ?
            <TextArea
              height={this.props.height}
              stretch
              handleChangeText={this.props.handleChangeText}
              fontSize={this.props.textFontSize}
              color={this.props.textFontColor}
              placeholderTextColor={this.props.placeholderTextColor}
            />
          :
            <TextInput
              style={[
                styles.textInput,
                {
                  fontSize: this.props.textFontSize,
                  color: this.props.textFontColor,
                },
              ]}
              value={this.state.text}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              onChangeText={text => this.onChangeText(text)}
              autoFocus={this.props.autoFocus}
              underlineColorAndroid={'rgba(0, 0, 0, 0)'}
              keyboardType={this.props.keyboardType}
            />
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelTextInput: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  label: {
    justifyContent: 'center',
    paddingRight: 5,
  },
  labelText: {
    textAlign: 'right',
  },
  textInputWrapper: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  textInput: {
    margin: 0,
    padding: 3,
  },
});
