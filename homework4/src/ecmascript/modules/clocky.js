import $ from 'jquery';

const clicketyClock = {
  zeroPad(number) {
    return ("0" + number).slice(-2);
  },

  updateTime: function() {
    // Get the local time using JS
    const date = new Date;
    const seconds = this.zeroPad(date.getSeconds());
    const minutes = this.zeroPad(date.getMinutes());
    const hours = this.zeroPad(date.getHours());

    const digits = $('.clock .digits')

    digits.html(hours + ":" + minutes + ":" + seconds);
    // TODO: update AM/PM
  },

  init: function() {
    $('#what-time-it-be').on('click', (e) => {
      e.preventDefault();
      this.updateTime();
    });
  }
};

export default clicketyClock;
