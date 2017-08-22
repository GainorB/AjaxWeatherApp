//Document on load
$(function(){

    $('#zip').focus();

    const API_KEY = '';

    //grab submit button and create on click event
    $('#submit').on('click', function(){
        
        let zip = $('#zip').val();
        
        if(zip == ""){
            $('#error').html("Please input a valid zip code");
            $('#error').css("color", "red");
        } else if(zip != "") {
            $('#error').html("");

            $.ajax({
                url: "https://accesscontrolalloworiginall.herokuapp.com/" + 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial&appid=' + API_KEY
            })
            .done(data => {
                $('#icon').html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
                $('#city').html(data.name);
                $('#humidity').html(data.main.humidity  + "% humidity");
                $('#current_temperature').html("Temperature: " + isCold(data.main.temp) + "˚ F");
                $('#weather_description').html("Weather Description: " + data.weather[0].description);
                $('#min_temp').html("Low: " + Math.floor(data.main.temp_min) + "˚ F");
                $('#max_temp').html("High: " + Math.floor(data.main.temp_max) + "˚ F");

                function isCold(temp){
                    temp = Math.floor(data.main.temp);

                    if(temp < 40){
                        $('#current_temperature').css("color", "blue");
                    }else if(temp > 90){
                        $('#current_temperature').css("color", "red");
                    }

                    return temp;
                }
            })

            $('#zip').val("");
        }
    });

    $('#reset').on('click', function(){
        location.reload();
    })
});