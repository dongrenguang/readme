import React, { Component, PropTypes } from 'react';
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  TimePickerAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LabelDateTimePicker extends Component {
  static propTypes = {
    handleChangeDate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    initialDateTime: PropTypes.number,
    height: PropTypes.number,
    labelWidth: PropTypes.number,
    margin: PropTypes.number,
    marginHorizontal: PropTypes.number,
    marginVertical: PropTypes.number,
    labelFontSize: PropTypes.number,
    labelFontColor: PropTypes.string,
    textFontSize: PropTypes.number,
    textFontColor: PropTypes.string,
    datePlaceholder: PropTypes.string,
    timePlaceholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    borderColor: PropTypes.string,
  };

  static defaultProps = {
    height: 35,
    labelWidth: 80,
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 5,
    labelFontSize: 15,
    labelFontColor: 'rgba(50, 50, 50, 1)',
    textFontSize: 15,
    textFontColor: 'rgba(10, 10, 10, 1)',
    datePlaceholder: '',
    timePlaceholder: '',
    placeholderTextColor: 'rgba(150, 150, 150, 1)',
    borderColor: 'rgba(150, 150, 150, 1)',
  };

  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      timeString: '',
    };

    this.dateTime = {
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
    };

    this.selectDate = this.selectDate.bind(this);
    this.selectTime = this.selectTime.bind(this);
  }

  componentWillMount() {
    let dateString = this.props.datePlaceholder;
    let timeString = this.props.timePlaceholder;
    if (this.props.initialDateTime) {
      const dateObject = new Date(this.props.initialDateTime);
      dateString = this.dateFormat(dateObject.getFullYear(),
        dateObject.getMonth() + 1, dateObject.getDate());
      timeString = this.timeFormat(dateObject.getHours(), dateObject.getMinutes());
    }

    this.setState({
      dateString,
      timeString,
    });
  }

  async selectDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.dateTime.year ?
          new Date(this.dateTime.year, this.dateTime.month, this.dateTime.day)
          : new Date(),
        minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = this.dateFormat(year, month + 1, day);
        this.setState({
          dateString: selectedDate,
        });

        [this.dateTime.year, this.dateTime.month, this.dateTime.day] = [year, month, day];

        if (this.isValidDateTime(this.dateTime)) {
          const millisecond = new Date(this.dateTime.year, this.dateTime.month,
            this.dateTime.day, this.dateTime.hour, this.dateTime.minute) * 1;
          this.props.handleChangeDate(millisecond);
        }
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async selectTime() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.dateTime.hour !== null ? this.dateTime.hour : 12,
        minute: this.dateTime.minute !== null ? this.dateTime.minute : 0,
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const selectedTime = this.timeFormat(hour, minute);
        this.setState({
          timeString: selectedTime,
        });

        [this.dateTime.hour, this.dateTime.minute] = [hour, minute];

        if (this.isValidDateTime(this.dateTime)) {
          const millisecond = new Date(this.dateTime.year, this.dateTime.month,
            this.dateTime.day, this.dateTime.hour, this.dateTime.minute) * 1;
          this.props.handleChangeDate(millisecond);
        }
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  isValidDateTime(dateTime) {
    let isValid = true;
    for (const value of Object.values(dateTime)) {
      if (value === null || value === undefined) {
        isValid = false;
        break;
      }
    }

    return isValid;
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

  timeFormat(hour, minute) {
    let hourString = `${hour}`;
    let minuteString = `${minute}`;
    if (hour < 10) {
      hourString = `0${hour}`;
    }
    if (minute < 10) {
      minuteString = `0${minute}`;
    }
    return `${hourString}:${minuteString}`;
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
                color: (this.state.dateString === this.props.datePlaceholder) ?
                  this.props.placeholderTextColor : this.props.textFontColor,
              },
            ]}
          >
            {this.state.dateString}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeTextWrapper,
            {
              borderColor: this.props.borderColor,
            },
          ]}
          onPress={() => this.selectTime()}
        >
          <Text
            style={[
              styles.timeText,
              {
                fontSize: this.props.textFontSize,
                color: (this.state.timeString === this.props.timePlaceholder) ?
                  this.props.placeholderTextColor : this.props.textFontColor,
              },
            ]}
          >
            {this.state.timeString}
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
    flex: 3,
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 5,
  },
  dateText: {
    margin: 5,
    padding: 0,
  },
  timeTextWrapper: {
    flex: 2,
    justifyContent: 'center',
    borderWidth: 1,
    marginLeft: 5,
  },
  timeText: {
    margin: 5,
    padding: 0,
  },
});
