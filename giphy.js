$(document).ready(function () {

    var marvelGiphy = ["Spiderman", "Deadpool", "Wolverine", "Doctor Strange", "Avengers", "Captain America", "Iron Man", "Thor", "Hulk Smash"]

    $(".btn-primary").on("click", function buttons() {
        $(".btn-primary").remove();

        // CREATING BUTTONS OF AN ARRAY USING LOOPS
        for (var i = 0; i < marvelGiphy.length; i++) {
            var Button = $("<button>");
            Button.addClass("giphy-buttons");
            Button.attr("giphy-name", marvelGiphy[i]);
            Button.text(marvelGiphy[i]);
            $("#start").append(Button);
        }
        
        $(".giphy-buttons").on("click", function giphy() {
            // console.log("you clicked")

            $("#giphy-here").html("")
            var giphy = $(this).attr("giphy-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                giphy + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                //   console.log(response.data.length)
                var results = response.data;
                //   $("#giphy-here").prepend(queryURL)
                for (var i = 0; i < results.length; i++) {
                    var rating = results[i].rating;
                    // console.log(rating)

                    var giphyRating = $("<h4>").html("Rating: " + rating);
                    // console.log(giphyRating)

                    var giphyImage = $("<img>");
                    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                    giphyImage.attr("data-still", results[i].images.fixed_height_still.url)
                    giphyImage.attr("src", results[i].images.fixed_height.url);
                    giphyImage.attr("data-state", "still")
                    giphyImage.addClass("animate");
                    // console.log(giphyImage)

                    var gifDiv = $("<div>");
                    gifDiv.prepend(giphyRating);
                    gifDiv.prepend(giphyImage);
                    // console.log(gifDiv)

                    $("#giphy-here").prepend(gifDiv)

                }
            })
        });    
        $(".btn-outline-success").on("click", function (event) {
            event.preventDefault();
            var newGiphy = $(".form-control").val().trim();
            // console.log(newGiphy)
            marvelGiphy.push(newGiphy);
            // console.log(marvelGiphy)
            buttons()
        })
    });
    $(document).on("click", ".animate", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
})


