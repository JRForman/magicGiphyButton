var magicMarvel = ["Captain America", "Thor", "Iron Man", "Black Widow", "Wolverine", "Hulk", "Deadpool", "Black Panther", "Star Lord", "Gamora", "Nebula"];


for (x in magicMarvel) {
    buttonGenerator(magicMarvel[x]);

};

function buttonGenerator(queryWord) {

    var newBtn = $("<button>").addClass("magicButton").text(queryWord).attr("id", queryWord);


    $("#buttonContainer").append(newBtn);
}


$("#submitButton").on("click", function () {
    if(($("#addButtonQuery").val())!=""){
    console.log($("#addButtonQuery").val());
    buttonGenerator($("#addButtonQuery").val())
    }
});

$("#buttonContainer").on("click", function (e) {
    if (event.target != this) {
        var person = $(e.target).attr("id");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + " Marvel"+ "&api_key=g63epu2bWdVI23mQ1kKiB58btNkpvA3Z&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                var imgCon = $("#imagesContainer");
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var resultImage = $("<img>");
                        resultImage.addClass("gif");
                        resultImage.attr("src", results[i].images.fixed_height_still.url);
                        resultImage.attr("still", results[i].images.fixed_height_still.url);
                        resultImage.attr("moving", results[i].images.fixed_height.url);
                        resultImage.attr("state", "still");

                        imgCon.prepend(resultImage);
                    }
                }
            })
    }
});

$("#imagesContainer").on("click", function (e) {
    if ((e.target != this) && (e.target.class = "gif")) {
        if ($(e.target).attr("state") == "still") {
            $(e.target).attr("src", ($(e.target).attr("moving")))
            $(e.target).attr("state", "moving")
        } else {
            $(e.target).attr("src", ($(e.target).attr("still")))
            $(e.target).attr("state", "still")
        }
    }
});