import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class ViewPagerIndicator extends Component {
  static propTypes = {
    pageCount: PropTypes.number,
    activePage: PropTypes.number,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    indicatorSize: PropTypes.number,
    indicatorGap: PropTypes.number,
  };

  static defaultProps = {
    pageCount: 1,
    activePage: 0,
    activeColor: 'rgba(94, 143, 201, 1)',
    inactiveColor: 'rgba(210, 210, 210, 1)',
    indicatorSize: 8,
    indicatorGap: 8,
  };

  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
    };
  }

  componentWillMount() {
    this.setState({
      activePage: this.props.activePage,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePage: nextProps.activePage,
    });
  }

  render() {
    const indicators = [];
    for (let i = 0; i < this.props.pageCount; i++) {
      indicators.push(
        <View
          key={i}
          style={{
            height: this.props.indicatorSize,
            width: this.props.indicatorSize,
            borderRadius: this.props.indicatorSize / 2,
            backgroundColor: (this.state.activePage === i) ?
              this.props.activeColor : this.props.inactiveColor,
            margin: this.props.indicatorGap / 2,
          }}
        />
      );
    }

    return (
      <View style={styles.viewPagerIndicator}>
      {indicators}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewPagerIndicator: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
