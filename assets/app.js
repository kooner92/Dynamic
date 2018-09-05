// topics array
var topics = [
    "tennis", "indy car racing", "cricket", "marathon", "swimming", "darts", "basketball", "football", "baseball", "golf"
];

// start function 
// push each topic into variable x

var x = {
    startFunction: function () {

        for (var i = 0; i < topics.length; i++) {
            x.Button(topics[i]);
        }
        x.btnClick();
    },

    Button: function (topics) {
        $("#buttons").prepend(
            "<button class='topicBtn' data-topic='" + topics + "'>" + topics + "</button>"
        );
    },

    btnClick: function () {
        $(".topicBtn").on("click", function (event) {
            var topic = $(this).attr("data-topic");
            x.getGIF(topic);
        });
    },

    // call API and create for loop for results

    getGIF: function (topic) {
        $(".results").html("");
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC" + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var newDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").html("Rating: " + rating);

                // creat variable for still 
                // make new class so we can call it later

                var image = $("<img class='gif' data-state='still'>");

                // add attr for still and animation from API

                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);

                // add image and rating to newDiv

                newDiv.prepend(p);
                newDiv.prepend(image);

                $(".results").prepend(newDiv);
            }
            // make gif animate with on click function
            // push gif to variable x so changes from still to animation
            //
            $(".gif").on("click", function () {
                var gif = $(this);
                x.moveGIF(gif);
            });
        });
    },

    // define the the function that animates
    // if else statement to see what state image is in

    moveGIF: function (gif) {
        if (gif.attr("data-state") === "still") {
            gif.attr("src", gif.attr("data-animate"));
        } else {
            gif.attr("src", gif.attr("data-still"));
        }
    }
};

// ready function

$(document).ready(function () {
    x.startFunction();

});