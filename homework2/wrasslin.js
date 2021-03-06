$(function() {
  const $form = $('form');

  /**
  * If valid, log 'VALID' to the console.
  * If invalid, show an alert box to the user with an error message.
  * You can either show a generic error message, or for extra credit,
  * show an error message with specific details about what went wrong.
  */
  var validateForm = function() {
    var errors = [];
    errors = validateSelect(errors);
    errors = validateFive(errors);
    errors = validateAllAnswered(errors);

    if (errors.length) {
      alert("OH NO! Fix these mistakes: \n\n" + errors.join("\n"));
    } else {
      console.log('VALID');
    }
  };

  // For your select field, nothing else except a value of "frogs" will be accepted.
  var validateSelect = function(errors = []) {
    if ($('#baddest-dropdown').val() !== "frogs") {
      errors.push('💩 Wrong choice for "Do you have what it takes"');
    }
    return errors;
  }

  // For your text field, nothing else except a value of 5 will be accepted.
  var validateFive = function(errors = []) {
    if ($form.find('input[name="only-five"]').val() !== '5') {
      errors.push('💩 Wrong answer for "Celebrate with a high..."');
    }
    return errors;
  }

  /* HW instructions said "All 4 fields are required"...
  * I figured that was only if we stopped at 4 fields, yeah?
  * So I made them all required.
  */
  var validateAllAnswered = function(errors = []) {
    const inputFields = {
      'input[name=wrassler-name]': "Wrasslin' Name ",
      'input[name=only-five]': 'Celebrate with a high...',
      'input[name=start-date]': 'Start date',
      'input[name=entrance-music]:checked': 'Entrance music',
      'input[name=spandex-color]': 'Spandex color',
      '#baddest-dropdown': 'Do you have what it takes?'
    }
    $.each(inputFields, function(finderStr, label){
      if (!$(finderStr).val()){
        errors.push('💩 You simply must answer "' + label + '"');
      }
    });
    return errors;
  }

  $form.on('submit', function(event) {
    event.preventDefault();
    validateForm();
  });
});
