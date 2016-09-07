import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import DialogContainer from './DialogContainer';
import { Colors } from '../../res/main';

const ITEM_HEIGHT = 40;
export default class PickerDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleFontSize: PropTypes.number,
    initialValue: PropTypes.string,
    values: PropTypes.array,
    valuesFontSize: PropTypes.number,
    handlePress: PropTypes.func.isRequired,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    hideLastBorderBottom: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    titleFontSize: 20,
    initialValue: '',
    values: [''],
    valuesFontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    hideLastBorderBottom: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onItemPress = this.onItemPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: this.props.initialValue,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.initialValue,
    });
  }

  onItemPress(value) {
    this.setState({
      value,
    });

    InteractionManager.runAfterInteractions(() => {
      this.props.handlePress(value);
    });
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
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: this.props.titleFontSize,
                },
              ]}
            >
            {this.props.title}
            </Text>
          </View>

          <View style={styles.content}>
          {
            this.props.values.map((value, index) =>
              <TouchableOpacity
                key={index}
                style={[
                  styles.item,
                  (index === (this.props.values.length - 1) &&
                    this.props.hideLastBorderBottom)
                  ?
                    { borderBottomWidth: 0 }
                  :
                    {},
                ]}
                onPress={() => this.onItemPress(value)}
              >
                <View style={styles.valueWrapper}>
                  <Text
                    style={[
                      styles.valueText,
                      {
                        fontSize: this.props.valuesFontSize,
                      },
                    ]}
                  >
                  {value}
                  </Text>
                </View>
                <View style={styles.action}>
                {
                  (value === this.state.value) ?
                    <Icon
                      name={'dot-circle-o'}
                      color={Colors.themeColor}
                      size={20}
                    />
                  :
                    <Icon
                      name={'circle-o'}
                      color={'rgba(200, 200, 200, 1)'}
                      size={20}
                    />
                }

                </View>
              </TouchableOpacity>
            )
          }
          </View>
        </View>
      </DialogContainer>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  title: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleText: {
    textAlign: 'center',
  },
  content: {
    alignItems: 'stretch',
    marginHorizontal: 20,
  },
  item: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(200, 200, 200, 1)',
  },
  valueWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  valueText: {

  },
  action: {
    width: ITEM_HEIGHT,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
