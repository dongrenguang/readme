import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';

export default class TextArea extends Component {
  static propTypes = {
    handleChangeText: PropTypes.func.isRequired,
    initialText: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    stretch: PropTypes.bool,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    placeholderTextColor: PropTypes.string,
  };

  static defaultProps = {
    initialText: '',
    height: 60,
    width: 200,
    stretch: true,
    fontSize: 15,
    color: 'rgba(10, 10, 10, 1)',
    placeholderTextColor: 'rgba(150, 150, 150, 1)',
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

  render() {
    return (
      <TextInput
        style={[
          styles.textArea,
          {
            height: this.props.height,
            fontSize: this.props.fontSize,
            color: this.props.color,
          },
          this.props.stretch ? { alignSelf: 'stretch' } : { width: this.props.width },
        ]}
        value={this.state.text}
        onChangeText={(text) => {
          this.setState({
            text,
          });
          this.props.handleChangeText(text);
        }}
        multiline
        underlineColorAndroid={'rgba(0, 0, 0, 0)'}
        placeholderTextColor={this.props.placeholderTextColor}
      />
    );
  }
}

const styles = StyleSheet.create({
  textArea: {
    textAlignVertical: 'top',
    margin: 0,
    padding: 3,
  },
});
