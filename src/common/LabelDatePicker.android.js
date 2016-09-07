import React, { Component, PropTypes } from 'react';
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LabelDatePicker extends Component {
  static propTypes = {
    handleChangeDate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    initialDate: PropTypes.number,
    height: PropTypes.number,
    labelWidth: PropTypes.number,
    margin: PropTypes.number,
    marginHorizontal: PropTypes.number,
    marginVertical: PropTypes.number,
    labelFontSize: PropTypes.number,
    labelFontColor: PropTypes.string,
    textFontSize: PropTypes.number,
    textFontColor: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    borderColor: PropTypes.string,
  };

  static defaultProps = {
    initialDate: 0,
    height: 35,
    labelWidth: 80,
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 5,
    labelFontSize: 15,
    labelFontColor: 'rgba(50, 50, 50, 1)',
    textFontSize: 15,
    textFontColor: 'rgba(10, 10, 10, 1)',
    placeholder: '',
    placeholderTextColor: 'rgba(150, 150, 150, 1)',
    borderColor: 'rgba(150, 150, 150, 1)',
  };

  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
    };

    this.dateObject = new Date();

    this.selectDate = this.selectDate.bind(this);
  }

  componentWillMount() {
    let dateString = this.props.placeholder;
    if (this.props.initialDate) {
      this.dateObject = new Date(this.props.initialDate);
      dateString = this.dateFormat(this.dateObject.getFullYear(),
        this.dateObject.getMonth() + 1, this.dateObject.getDate());
    }
    this.setState({
      dateString,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate) {
      this.dateObject = new Date(nextProps.initialDate);
      const dateString = this.dateFormat(this.dateObject.getFullYear(),
        this.dateObject.getMonth() + 1, this.dateObject.getDate());
      this.setState({
        dateString,
      });
    }
  }

  async selectDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.dateObject,
        minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = this.dateFormat(year, month + 1, day);
        this.dateObject = new Date(year, month, day);
        this.setState({
          dateString: selectedDate,
        });

        const millisecond = new Date(year, month, day) * 1;
        this.props.handleChangeDate(millisecond);
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  dateFormat(year, month, day) {
    let monthString = `${month}`;
    let dayString = `${day}`;
    if (month < 10) {
      monthString = `0${month}`;
    }
    if (day < 10) {
      dayString = `0${day}`;
    }

    return `${year}-${monthString}-${dayString}`;
  }

  render() {
    return (
      <View
        style={[
          styles.labelDatePicker,
          {
            height: this.props.height,
            margin: this.props.margin,
            marginHorizontal: this.props.marginHorizontal,
            marginVertical: this.props.marginVertical,
          },
        ]}
      >
        <View style={[styles.label, { width: this.props.labelWidth }]}>
          <Text
            style={[
              styles.labelText,
              {
                fontSize: this.props.labelFontSize,
                color: this.props.labelFontColor,
              },
            ]}
          >
          {this.props.label}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.dateTextWrapper,
            {
              borderColor: this.props.borderColor,
            },
          ]}
          onPress={() => this.selectDate()}
        >
          <Text
            style={[
              styles.dateText,
              {
                fontSize: this.props.textFontSize,
                color: (this.state.dateString === this.props.placeholder) ?
                  this.props.placeholderTextColor : this.props.textFontColor,
              },
            ]}
          >
            {this.state.dateString}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelDatePicker: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  label: {
    justifyContent: 'center',
    paddingRight: 5,
  },
  labelText: {
    textAlign: 'right',
  },
  dateTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  dateText: {
    margin: 5,
    padding: 0,
  },
});
