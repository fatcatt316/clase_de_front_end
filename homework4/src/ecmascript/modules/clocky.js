import $ from 'jquery';

const clicketyClock = {
  zeroPad(number) {
    return ("0" + number).slice(-2);
  },

  weekdayName(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"];

    return weekdays[date.getDay()];
  },

  nonMilitaryHours(hours) {
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    return hours;
  },

  updateTime(date) {
    const seconds = this.zeroPad(date.getSeconds());
    const minutes = this.zeroPad(date.getMinutes());
    const hours = this.zeroPad(this.nonMilitaryHours(date.getHours()));

    const timeSquare = $('.chrono-cube .time')

    timeSquare.html(hours + ":" + minutes + ":" + seconds);
  },

  updateWeekday(date) {
    const weekdaySquare = $('.chrono-cube .weekday')

    weekdaySquare.html(this.weekdayName(date));
  },

  updateAmPm(date) {
    const amPm = (date.getHours() > 11 ? 'PM' : 'AM');
    const amPmSquare = $('.chrono-cube .am-pm')

    amPmSquare.html(amPm);
  },

  updateDate(date) {
    const dateSquare = $('.chrono-cube .date')

    dateSquare.html(date.getFullYear() + '-' + this.zeroPad(date.getMonth() + 1) + '-' + this.zeroPad(date.getDate()));
  },

  updateChronoCube: function() {
    const date = new Date;
    this.updateTime(date);
    this.updateAmPm(date);
    this.updateWeekday(date);
    this.updateDate(date);
  },

  init: function() {
    $('#what-time-it-be').on('click', (e) => {
      e.preventDefault();
      this.updateChronoCube();
    });
  }
};

export default clicketyClock;
