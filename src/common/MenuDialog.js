import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DialogContainer from './DialogContainer';

export default class MenuDialog extends Component {
  static propTypes = {
    /* 'values' format:
    [
      {
        name(necessary),
        handlePress(necessary),
        hideBottomLine(optional),
        marginTop(optional),
        marginBottom(optional),
      },
      ...
    ]
    */
    values: PropTypes.array.isRequired,

    itemHeight: PropTypes.number,
    backgroundColor: PropTypes.string,
    itemBackgroundColor: PropTypes.string,
    bottomLineColor: PropTypes.string,
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
    itemHeight: 50,
    backgroundColor: 'rgba(150, 150, 150, 0)',
    itemBackgroundColor: 'rgba(220, 220, 220, 1)',
    bottomLineColor: 'rgba(150, 150, 150, 1)',
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

    this.onPress = this.onPress.bind(this);
  }

  onPress(value) {
    value.handlePress();
  }

  render() {
    return (
      <DialogContainer {...this.props}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: this.props.backgroundColor,
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
        {
          this.props.values.map((value, index) =>
            <TouchableOpacity
              key={index}
              onPress={() => this.onPress(value)}
              style={{
                height: this.props.itemHeight,
                backgroundColor: this.props.itemBackgroundColor,
                borderBottomWidth: value.hideBottomLine ? 0 :
                  StyleSheet.hairlineWidth,
                borderBottomColor: this.props.bottomLineColor,
                marginTop: value.marginTop || 0,
                marginBottom: value.marginBottom || 0,
              }}
            >
              <View
                style={[
                  styles.itemTextWrapper,
                  {
                    opacity: value.opacity !== undefined ? value.opacity : 1,
                  },
                ]}
              >
                <Text style={styles.itemText}>{value.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        </View>
      </DialogContainer>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
  itemTextWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: 'rgba(20, 20, 20, 1)',
    fontSize: 18,
  },
});
