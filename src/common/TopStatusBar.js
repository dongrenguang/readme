import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../res/main';

const TORSION = Dimensions.get('window').fontScale / Dimensions.get('window').scale;
const DEFAULT_ICON_COLOR = 'rgba(250, 250, 250, 1)';
const DEFAULT_ICON_PADDING_VERTICAL = 10;
const DEFAULT_ICON_ENABLE = true;
const DEFAULT_ICON_HANDLE_PRESS = () => {};
const DEFAULT_ICON_SIZE = 35;
const DEFAULT_ICON_FONT_SIZE = 15;

export default class TopStatusBar extends Component {
  static propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    centerText: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    iconWidth: PropTypes.number,

    /* Array, format:
      [
        { icon, color, paddingVertical, enable, handlePress, iconSize, fontSize },
        {..},
      ]
    */
    leftIcons: PropTypes.array,
    rightIcons: PropTypes.array,
  };

  static defaultProps = {
    height: 50,
    backgroundColor: Colors.themeColor,
    fontColor: 'rgba(250, 250, 250, 1)',
    contentText: '',
    iconWidth: 50,
  };

  constructor(props) {
    super(props);
    this.state = {
      rightIcons: null,
    };
  }

  componentWillMount() {
    this.setState({
      rightIcons: this.props.rightIcons,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rightIcons: nextProps.rightIcons,
    });
  }

  renderIcon(iconObject, index, position) {
    const enable = (iconObject.enable !== undefined) ? iconObject.enable : DEFAULT_ICON_ENABLE;
    const handlePress = iconObject.handlePress || DEFAULT_ICON_HANDLE_PRESS;
    const paddingVertical = iconObject.paddingVertical || DEFAULT_ICON_PADDING_VERTICAL;
    return (
      <TouchableOpacity
        key={`${position}-${index}`}
        style={[styles.iconTouchable, { width: this.props.iconWidth }]}
        onPress={enable ? handlePress : () => {}}
      >
        <View
          style={[
            styles.iconWrapper,
            {
              paddingVertical,
              opacity: enable ? 1 : 0.5,
            },
          ]}
        >
        {
          this.renderIconContent(iconObject)
        }
        </View>
      </TouchableOpacity>
    );
  }

  renderIconContent(iconObject) {
    if (iconObject === null || iconObject === undefined) {
      console.error('Wrong parameter: ', iconObject);
      return null;
    }

    const icon = iconObject.icon;
    const color = iconObject.color || DEFAULT_ICON_COLOR;
    const iconSize = iconObject.iconSize || DEFAULT_ICON_SIZE;
    const fontSize = iconObject.fontSize || DEFAULT_ICON_FONT_SIZE;
    const paddingVertical = iconObject.paddingVertical || DEFAULT_ICON_PADDING_VERTICAL;
    if (typeof icon === 'string') {
      return (
        <Text
          numberOfLines={1}
          style={[
            styles.iconText,
            {
              color,
              fontSize,
            },
          ]}
        >
        {icon}
        </Text>
      );
    }
    else if (typeof icon === 'number') {
      return (
        <Image
          source={icon}
          resizeMode={'contain'}
          style={[
            styles.iconImage,
            {
              height: this.props.height - 2 * paddingVertical,
              width: this.props.height - 2 * paddingVertical,
            },
          ]}
        />
      );
    }
    else if (typeof icon === 'object' && icon.iconName) {
      return (
        <Icon
          name={icon.iconName}
          color={color}
          size={iconSize / TORSION}
          style={styles.iconText}
        />
      );
    }

    console.error('Wrong parameter: ', iconObject);
    return null;
  }

  render() {
    return (
      <View
        style={[
          styles.topStatusBar,
          {
            height: this.props.height,
            backgroundColor: this.props.backgroundColor,
          },
        ]}
      >
        <View style={styles.center}>
          <Text
            numberOfLines={1}
            style={[styles.centerContent, { color: this.props.fontColor }]}
          >
          {this.props.centerText}
          </Text>
        </View>
        <View style={[styles.side, styles.leftSide]}>
        {
          (this.props.leftIcons || []).map((iconObject, index) =>
            this.renderIcon(iconObject, index, 'left')
          )
        }
        </View>
        <View style={[styles.side, styles.rightSide]}>
        {
          (this.props.rightIcons || []).map((iconObject, index) =>
            this.renderIcon(iconObject, index, 'right')
          )
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topStatusBar: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  leftSide: {
    left: 0,
  },
  rightSide: {
    right: 0,
  },
  iconTouchable: {
    alignSelf: 'stretch',
  },
  iconWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  iconImage: {
    alignSelf: 'center',
  },
  iconText: {
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  center: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  centerContent: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
