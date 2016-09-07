import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DialogContainer from './DialogContainer';
import { Colors, LocalizedStrings } from '../../res/main';

const ITEM_HEIGHT = 40;
export default class InputDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    initialValue: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfDisplayLines: PropTypes.number,
    leftControllerText: PropTypes.string.isRequired,
    rightControllerText: PropTypes.string.isRequired,
    handleLeftControllerPress: PropTypes.func.isRequired,
    handleRightControllerPress: PropTypes.func.isRequired,
    underlineColor: PropTypes.string,
    canBeEmpty: PropTypes.bool,
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
    title: '',
    initialValue: '',
    multiline: false,
    numberOfDisplayLines: 1,
    underlineColor: Colors.themeColor,
    canBeEmpty: true,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tips: null,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onLeftControllerPress = this.onLeftControllerPress.bind(this);
    this.onRightControllerPress = this.onRightControllerPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: this.props.initialValue,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.initialValue,
      tips: null,
    });
  }

  onChangeText(value) {
    this.setState({
      value,
    });

    if (!value && !this.props.canBeEmpty) {
      this.setState({
        tips: LocalizedStrings.neverEmpty,
      });
    }
    else {
      this.setState({
        tips: null,
      });
    }
  }

  onLeftControllerPress() {
    this.props.handleLeftControllerPress();
  }

  onRightControllerPress() {
    if (!this.state.value && !this.props.canBeEmpty) {
      this.setState({
        tips: LocalizedStrings.neverEmpty,
      });

      return;
    }
    this.props.handleRightControllerPress(this.state.value);
  }

  render() {
    return (
      <DialogContainer {...this.props}>
        <View
          style={[
            styles.dialog,
            {
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
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>

          <View
            style={[
              styles.content,
              {
                height: ITEM_HEIGHT * this.props.numberOfDisplayLines,
                borderWidth: this.props.multiline ? 1 : 0,
                margin: this.props.multiline ? (ITEM_HEIGHT / 10) : 0,
              },
            ]}
          >
            <TextInput
              style={[
                styles.contentText,
                this.props.multiline ?
                  {
                    marginVertical: 1,
                    paddingVertical: 1,
                    textAlignVertical: 'top',
                  }
                :
                  {},
              ]}
              underlineColorAndroid={this.props.multiline ?
                'rgba(0, 0, 0, 0)' : this.props.underlineColor}
              onChangeText={value => this.onChangeText(value)}
              value={this.state.value}
              multiline={this.props.multiline}
              autoFocus
              keyboardType={'default'}
            />
          </View>
          {
            this.state.tips &&
              <Text style={styles.tipsText}>{this.state.tips}</Text>
          }
          <View style={styles.controller}>
            <TouchableOpacity
              style={styles.controllerButton}
              onPress={() => this.onLeftControllerPress()}
            >
              <View style={styles.controllerButtonTextWrapper}>
                <Text style={styles.controllerButtonText}>
                {this.props.leftControllerText}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controllerButton}
              onPress={() => this.onRightControllerPress()}
            >
              <View
                style={[
                  styles.controllerButtonTextWrapper,
                  styles.controllerButtonTextWrapperRight,
                ]}
              >
                <Text style={styles.controllerButtonText}>
                {this.props.rightControllerText}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DialogContainer>
    );
  }
}

const backgroundColor = 'rgba(250, 250, 250, 1)';
const borderColor = 'rgba(200, 200, 200, 1)';
const tipsColor = 'rgba(250, 0, 0, 1)';
const textColor = 'rgba(50, 50, 50, 1)';
const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor,
  },
  title: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    marginHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    color: textColor,
  },
  content: {
    borderColor,
  },
  contentText: {
    flex: 1,
    alignSelf: 'stretch',
  },
  tipsText: {
    color: tipsColor,
    marginLeft: 5,
    fontSize: 13,
  },
  controller: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
  },
  controllerButton: {
    flex: 1,
    alignSelf: 'stretch',
  },
  controllerButtonTextWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginVertical: 5,
  },
  controllerButtonTextWrapperRight: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: borderColor,
  },
  controllerButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: textColor,
  },
});
