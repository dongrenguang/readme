import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';

import ActiveImage from './ActiveImage';

export default class ImageSlider extends Component {
  static propTypes = {
    imageUris: PropTypes.array.isRequired,
    initialPage: PropTypes.number,
    handleCurrentImageChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialPage: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      pageWidth: 0,
      pageHeight: 0,
    };

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.renderRow = this.renderRow.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll({ nativeEvent }) {
    const offset = nativeEvent.contentOffset.x / this.state.pageWidth;
    if (Math.abs(offset - Math.round(offset)) < Number.EPSILON) {
      this.props.handleCurrentImageChange(Math.round(offset));
    }
  }

  renderRow(rowData) {
    return (
      <View
        style={{
          width: this.state.pageWidth,
          height: this.state.pageHeight,
        }}
      >
        <ActiveImage
          width={this.state.pageWidth}
          height={this.state.pageHeight}
          source={{ uri: rowData }}
          resizeMode={'contain'}
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.imageSlider}
        onLayout={(param) => {
          this.setState({
            pageWidth: param.nativeEvent.layout.width,
            pageHeight: param.nativeEvent.layout.height,
          });
        }}
      >
        <ListView
          ref={(instance) => {
            if (instance) {
              instance.scrollTo({
                x: this.props.initialPage * this.state.pageWidth,
                animated: false,
              });
            }
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.onScroll}

          dataSource={this.ds.cloneWithRows(this.props.imageUris)}
          renderRow={this.renderRow}
          initialListSize={1}
          pageSize={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(50, 50, 50, 1)',
  },
});
