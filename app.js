var topics = ["sandwich", "soup", "super sandwich", "saiyan", "super saiyan", "piccolo", "pickle", "kakarot",
    "carrot cake", "vegeta"
];

// this function encompassing the code allows the search to run properly
function run() {

    // this function generates all buttons
    function generator() {
        $("#buttons").empty()
        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>');
            button.addClass('btn what bg-dark m-1');
            button.attr('style', "color: rgba(240, 255, 240, 0.87)")
            button.attr('data-name', topics[i]);
            button.text(topics[i])
            $("#buttons").append(button)
        }
    }

    // running the above code
    generator()

    // click event to capture data from button then implement the .ajax to get some data
    $('button').click(function () {
        var clicked = $(this).attr("data-name")
        console.log(clicked)

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            clicked + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            //    loop generating images from the json onto the dom
            for (j = 0; j < 10; j++) {
                var imageUrl = response.data[j].images.fixed_height_small.url;
                var imageUrlStill = response.data[j].images.fixed_height_small_still.url;
                var image = $("<img class='m-1 rounded gif'>");
                image.attr("src", imageUrl);
                image.attr("active", imageUrl);
                image.attr("still", imageUrlStill);
                image.attr("state", "active");
                $("#gifs").prepend(image);
                $("#footer").attr('style',  'position: fixed; left: 0; bottom: 0; width: 100%; background-color: red; color: white; text-align: center; background-color: light-blue')
            }

            // allows for playing and pausing gifs
            $(".gif").on("click", function () {
                var state = $(this).attr("state")

                if (state == "active") {
                    $(this).attr('src', $(this).attr('still'));
                    $(this).attr('state', 'still');

                } else if (state == "still") {
                    $(this).attr('src', $(this).attr('active'));
                    $(this).attr('state', 'active');
                }
            });

        });
    })
}
// creates button of whatever usr has typed
$("#search").click(function () {
    event.preventDefault();
    var inputs = $("#input").val().trim();
    topics.push(inputs)
    run()
   
});
run()