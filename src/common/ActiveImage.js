import React, { Component, PropTypes } from 'react';
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

export default class ActiveImage extends Component {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.number.isRequired]),
    resizeMode: PropTypes.oneOf(['contain', 'cover', 'stretch']),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    resizeMode: 'contain',
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    return (
      <View style={styles.imageWrapper}>
        <Image
          style={[
            this.props.style,
            {
              width: this.props.width,
              height: this.props.height,
            },
          ]}
          source={this.props.source}
          resizeMode={this.props.resizeMode}
          onLoad={this.onLoad}
        />
        {
          (!this.state.loaded && this.props.width > 0 && this.props.height > 0) ?
            <View style={styles.loadingView}>
              <ActivityIndicator
                animating
                color={'rgba(250, 250, 250, 1)'}
                size={'large'}
              />
            </View>
          :
            null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
