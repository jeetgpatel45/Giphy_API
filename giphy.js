$(document).ready(function () {
    var marvelGiphy = ["Spiderman", "Deadpool", "X-Men", "Doctor Strange", "Avengers", "Captain America", "Iron Man", "Thor", "The Incredible Hulk"]
    $(".btn-primary").on("click", function button() {
    $(".btn-primary").remove();

    // CREATING BUTTONS OF AN ARRAY USING LOOPS
    for (var i = 0; i < marvelGiphy.length; i++) {
        var a = $("<button>");
        a.addClass("giphy-buttons");
        a.attr("giphy-name", marvelGiphy[i]);
        a.text(marvelGiphy[i]);
        $("#start").append(a);
    }
})

    // GETTING THE API'S BY CLICKING THE BUTTON
    $(".giphy-buttons").on("click", function giphy() {
        $("#giphy-here").html("")
        var giphy = $(this).attr("giphy-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            giphy + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var giphyRating = $("<p>").text("Rating: " + rating);
                gifDiv.append(giphyRating);

                var giphyImage = $("<img>");
                giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                giphyImage.attr("data-still", results[i].images.fixed_height_still.url)
                giphyImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(giphyImage);

                $("#giphy-here").prepend(gifDiv);
            }
        });
    });

    $("#search").on("click", function(event) {
        event.preventDefault();
        var newGiphy = $(".form-control").val().trim();
        marvelGiphy.push(newGiphy);
        button()
    })
})