import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ArticlePreviewItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    imageUri: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    opacity: PropTypes.number,
    imageResizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat']),
  };

  static defaultProps = {
    opacity: 1,
    imageResizeMode: 'cover',
  };

  constructor(props) {
    super(props);
    this.state = {
      newsId: null,
      opacity: 1,
    };
  }

  componentWillMount() {
    this.setState({
      newsId: this.props.id,
      opacity: this.props.opacity,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newsId: nextProps.id,
      opacity: nextProps.opacity,
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.opacity === this.state.opacity && nextProps.id === this.state.newsId) {
      return false;
    }

    return true;
  }

  dateFormatting(da) {
    const d = new Date(da);
    const year = d.getFullYear();
    const month = ((d.getMonth() + 1) >= 10) ? (d.getMonth() + 1) : `0${d.getMonth() + 1}`;
    const date = (d.getDate() >= 10) ? d.getDate() : `0${d.getDate()}`;

    return `${year}/${month}/${date}`;
  }

  render() {
    return (
      <View style={[styles.newsPreviewItem, { opacity: this.state.opacity }]}>
        <Image
          style={styles.image}
          resizeMode={this.props.imageResizeMode}
          source={
            this.props.imageUri ? { uri: this.props.imageUri }
              : require('../../res/images/placeholder.png')
          }
        />
        <View style={styles.overview}>
          <Text
            numberOfLines={1}
            style={styles.title}
          >
          {this.props.title}
          </Text>
          <Text
            numberOfLines={2}
            style={styles.description}
          >
          {this.props.description}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.date}
          >
          {this.dateFormatting(this.props.date)}
          </Text>
        </View>
      </View>
    );
  }
}

const borderBottomColor = 'rgba(200, 200, 200, 1)';
const titleColor = 'rgba(10, 10, 10, 1)';
const descColor = 'rgba(143, 142, 148, 1)';
const styles = StyleSheet.create({
  newsPreviewItem: {
    height: 90,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginHorizontal: 2,
  },
  image: {
    height: 70,
    width: 100,
  },
  overview: {
    height: 70,
    flex: 1,
    paddingLeft: 5,
    paddingRight: 3,
    flexDirection: 'column',
  },
  title: {
    flex: 1.2,
    fontSize: 15,
    color: titleColor,
  },
  description: {
    flex: 2,
    fontSize: 13,
    color: descColor,
  },
  date: {
    flex: 1,
    alignSelf: 'flex-end',
    marginRight: 3,
    color: descColor,
    fontSize: 12,
  },
});
