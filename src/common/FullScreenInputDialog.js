import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DialogContainer from './DialogContainer';
import InputDialog from './InputDialog';
import TopStatusBar from './TopStatusBar';

const ITEM_HEIGHT = 40;
export default class FullScreenInputDialog extends InputDialog {
  static propTypes = {
    leftIconFontSize: PropTypes.number,
    rightIconFontSize: PropTypes.number,
  };

  static defaultProps = {
    leftIconFontSize: 17,
    rightIconFontSize: 17,
  };

  // Override
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
          <TopStatusBar
            centerText={this.props.title}
            leftIcons={[{
              icon: this.props.leftControllerText,
              fontSize: this.props.leftIconFontSize,
              handlePress: () => super.onLeftControllerPress(),

            }]}
            rightIcons={[{
              icon: this.props.rightControllerText,
              fontSize: this.props.rightIconFontSize,
              enable: this.props.initialValue !== this.state.value,
              handlePress: () => super.onRightControllerPress(),
            }]}
          />
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
              onChangeText={value => super.onChangeText(value)}
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
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor,
  },
  content: {
    borderColor,
  },
  contentText: {
    flex: 1,
    alignSelf: 'stretch',
    color: textColor,
  },
  tipsText: {
    color: tipsColor,
    marginLeft: 5,
    fontSize: 12,
  },
});
