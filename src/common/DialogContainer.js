import React, { Component, PropTypes } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class DialogContainer extends Component {
  static propTypes = {
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    onRequestClose: PropTypes.func.isRequired,
    onShow: PropTypes.func,
    transparent: PropTypes.bool,
    visible: PropTypes.bool,
    verticalPosition: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
    handlePressSpace: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    animationType: 'none',
    onShow: () => {},
    transparent: true,
    visible: true,
    verticalPosition: 'center',
    handlePressSpace: () => {},
  };

  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        onRequestClose={this.props.onRequestClose}
        onShow={this.props.onShow}
        transparent={this.props.transparent}
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback onPress={this.props.handlePressSpace}>
          <View
            style={[
              styles.dialogContainer,
              {
                justifyContent: this.props.verticalPosition,
              },
            ]}
          >
            <TouchableWithoutFeedback>
            {
              this.props.children
            }
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const transparentColor = 'rgba(0, 0, 0, 0.5)';
const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: transparentColor,
  },
});
