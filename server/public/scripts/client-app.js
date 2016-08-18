$(document).ready(function() {
    getAnimals();

    $('#animal-submit').on('click', postAnimal);
    //going to need to add the getAnimals function to change a bit.
    //the AJAX call should go to the app.js
    //from the app.js it should route through the '/animals' to be processed
    //once finished in that route it then should be sent off to the '/randomNum' route
    //

    function getAnimals() {
        $.ajax({
            type: 'GET',
            url: '/animals',
            success: function(animals) {
                console.log('GET /animals returns:', animals);
                appendAnimal(animals);

            },

            error: function(response) {
                console.log('GET failed and you retrieved nothing..');
            },
        });
    }

    function appendAnimal(animals) {
        animals.forEach(function(animal) {
            var $el = $('<div></div>');
            var animalProperties = ['description', 'quantity'];

            animalProperties.forEach(function(property) {
                var inputType = 'text';
                // if (property == 'quantity') {
                //   anima    POSSIBLY COME BACK AND APPLY THE RANDOM NUMBER FUNCTION HERE?
                // }

                var $input = $('<input type="' + inputType + '" id="' + property + '" name="' + property + '" />');
                $input.val(animal[property]);
                $el.append($input);
            });

            $el.data('animalId', animal.Id);
            // $el.append('<button class="update">Update</button>');
            // $el.append('<button class="delete">Delete</button>');

            $('#animal-list').append($el);



        });

    };

    function postAnimal() {
        event.preventDefault();

        var animal = {};

        $.each($('#animal-form').serializeArray(), function(i, field) {
            animal[field.name] = field.value;
        });

        console.log(animal);

        $.ajax({
            type: 'POST',
            url: '/animals',
            data: animal,
            success: function() {
                console.log('Your post request is working it');
                $('#animal-list').empty();
                getAnimals();
            },

            error: function(response) {
                console.log('Your post request is not set up man :/');
            },
        });
    }





});
