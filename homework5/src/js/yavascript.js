import $ from 'jquery';
import Storage from './modules/storage';

$(() => {
  const inputName = 'main-input';
  const existingValue = Storage.load(inputName);
  const $input = $(`input[name="${inputName}"]`);

  if (existingValue) {
    $input.val(existingValue);
  }

  $input.on('keyup', (e) => {
    Storage.save(e.target.value, e.target.name);
  });
});
