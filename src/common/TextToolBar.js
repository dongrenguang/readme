import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class TextToolBar extends Component {
  static propTypes = {
    handlePress: PropTypes.func,
    height: PropTypes.number,
    marginTop: PropTypes.number,
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string,
    content: PropTypes.string,
    contentPosition: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
    contentColor: PropTypes.string,
    hideBottomLine: PropTypes.bool,
    actionColor: PropTypes.string,
    actionSize: PropTypes.number,
    hideActionIcon: PropTypes.bool,
  };

  static defaultProps = {
    height: 44,
    marginTop: 0,
    titleColor: 'rgba(50, 50, 50, 1)',
    content: '',
    contentPosition: 'flex-end',
    contentColor: 'rgba(143, 142, 148, 1)',
    hideBottomLine: false,
    actionColor: 'rgba(187, 186, 193, 1)',
    actionSize: 30,
    hideActionIcon: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentWillMount() {
    this.setState({
      content: this.props.content,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.content,
    });
  }

  compress(text, maxLength = 20) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) < 128) {
        count ++;
      }
      else {
        // ASCII >= 128, like Chinese character.
        count += 2;
      }

      if (count >= maxLength) {
        return `${text.slice(0, i + 1)}...`;
      }
    }

    return text;
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          marginTop: this.props.marginTop,
        }}
        onPress={this.props.handlePress}
      >
        <View
          style={[
            styles.textToolBar,
            {
              height: this.props.height,
            },
            !this.props.hideBottomLine ? styles.bottomLine : null,
          ]}
        >
          <View style={styles.title}>
            <Text
              numberOfLines={1}
              style={[
                styles.titleText,
                {
                  color: this.props.titleColor,
                },
              ]}
            >
            {this.props.title}
            </Text>
          </View>

          <View style={styles.content}>
            <Text
              numberOfLines={1}
              style={[
                styles.contentText,
                {
                  color: this.props.contentColor,
                  alignSelf: this.props.contentPosition,
                },
              ]}
            >
            {this.compress(this.state.content)}
            </Text>
          </View>

          <View style={styles.action}>
          {
            !this.props.hideActionIcon &&
              <Icon
                name={'angle-right'}
                color={this.props.actionColor}
                size={this.props.actionSize}
              />
          }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textToolBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingLeft: 15,
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  title: {
    width: 120,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 17,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  contentText: {
    fontSize: 15,
  },
  action: {
    width: 30,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: 'rgba(234, 234, 234, 1)',
    borderBottomWidth: 1,
  },
});
