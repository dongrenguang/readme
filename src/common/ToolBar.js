import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ToolBar extends Component {
  static propTypes = {
    height: PropTypes.number,
    icon: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired]),
    iconWidth: PropTypes.number,
    content: PropTypes.string.isRequired,
    contentPosition: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
    contentColor: PropTypes.string,
    showBottomLine: PropTypes.bool,
    showBorderRadius: PropTypes.bool,
    actionColor: PropTypes.string,
    actionSize: PropTypes.number,
    handlePress: PropTypes.func,

  };

  static defaultProps = {
    height: 44,
    iconWidth: 60,
    contentPosition: 'flex-start',
    contentColor: 'rgba(50, 50, 50, 1)',
    showBottomLine: false,
    showBorderRadius: false,
    actionColor: 'rgba(187, 186, 193, 1)',
    actionSize: 30,
  };

  render() {
    const imageScale = 0.66;
    return (
      <TouchableOpacity onPress={this.props.handlePress}>
        <View style={[styles.toolBar, { height: this.props.height }]}>
          <View style={{ width: this.props.iconWidth, alignItems: 'center' }}>
            <Image
              style={{
                height: this.props.height * imageScale,
                width: this.props.height * imageScale,
                borderRadius: (this.props.showBorderRadius ?
                  (this.props.height * imageScale / 2) : 0),
              }}
              source={this.props.icon}
            />

          </View>
          <View
            style={[
              styles.main,
              this.props.showBottomLine ? styles.bottomLine : null,
            ]}
          >
            <View style={styles.textWrapper}>
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  {
                    alignSelf: this.props.contentPosition,
                    color: this.props.contentColor,
                  },
                ]}
              >
              {this.props.content}
              </Text>
            </View>
            <View style={styles.action}>
              <Icon
                name={'angle-right'}
                color={this.props.actionColor}
                size={this.props.actionSize}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  toolBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: 'rgba(234, 234, 234, 1)',
    borderBottomWidth: 1,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 17,
  },
  action: {
    width: 30,
    marginRight: 4,
    alignItems: 'center',
  },
});
