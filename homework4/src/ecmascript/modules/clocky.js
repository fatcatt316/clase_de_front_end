import $ from 'jquery';

const clicketyClock = {
  zeroPad(number) {
    return ("0" + number).slice(-2);
  },

  weekdayName(date) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]

    return weekdays[date.getDay()];
  },

  updateTime(date) {
    const seconds = this.zeroPad(date.getSeconds());
    const minutes = this.zeroPad(date.getMinutes());
    const hours = this.zeroPad(date.getHours());

    const timeSquare = $('.chrono-cube .time')

    timeSquare.html(hours + ":" + minutes + ":" + seconds);
  },

  updateWeekday(date) {
    const weekdaySquare = $('.chrono-cube .weekday')

    weekdaySquare.html(this.weekdayName(date));
  },

  updateChronoCube: function() {
    const date = new Date; // Get local time using JS
    this.updateTime(date);
    this.updateWeekday(date);

    // TODO: update AM/PM
  },

  init: function() {
    $('#what-time-it-be').on('click', (e) => {
      e.preventDefault();
      this.updateChronoCube();
    });
  }
};

export default clicketyClock;
