$(document).ready(function() {
  $('#animalForm').on('submit', addAnimal);
  getAnimals();
});

function addAnimal(event) {
  event.preventDefault();
  var animal = {};
  animal.animalType = $('#animalType').val();

  console.log(animal);

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function(result) {
      // post to server
      console.log(result);
      getAnimals();
    }
  });
}

function getAnimals() {
  $.get('/animals', function(data) {
    appendAnimals(data);
  });
}

function appendAnimals(animals) {
  $('#animal-container').empty();
  animals.forEach(function(animal) {
    $('#animal-container').append('<div></div>');
    var $el = $('#animal-container').children().last();
    $el.append('<h3>' + animal.animal_type + '</h3>');
    $el.append('<p>Population: ' + animal.population + '</p>');
  });
}
