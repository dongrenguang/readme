import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
export default class Footer extends Component {
  static propTypes = {
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
  };

  static defaultProps = {
    marginTop: 0,
    marginBottom: 0,
  };

  render() {
    return (
      <View
        style={[
          styles.footer,
          {
            marginTop: this.props.marginTop,
            marginBottom: this.props.marginBottom,
          },
        ]}
      >
        <Image
          source={require('../../res/icons/footer-line.png')}
          style={styles.footerImage}
          resizeMode={'contain'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 30,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerImage: {
    width: WIDTH * 0.7,
  },
});
