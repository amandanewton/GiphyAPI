	// Variables 
	// =====================================================================================

	var topics = [
		"Cardi B",
		"Taylor Swift",
		"Justin Beieber",
		"Kim Kardashian",
		"Ariana Grande",
		"Kanye West",
		"Miley Cyrus",
		"Beyonce",
		"Chrissy Teigen",
		"Britney Spears",
		"Dwayne Johnson",
		"Brad Pitt",
		"Jennifer Lawrence",
		"Chris Pratt",
		"Adele",
		"Kylie Jenner",
		"Howard Stern",
		"Ryan Seacrest",
		"Ellen DeGeneres",
		"Chris Hemsworth",
		"Amy Poehler"
	];

	// Functions 
	// =====================================================================================

	// Create buttons on top of screen using array of topics 
	function createRowOfButtons() {
		// Empty current div of buttons
		$('#celebrityButtons').empty();
		// Loop through list of celebrites and create buttons for each listing
		for (var i = 0; i < topics.length; i++) {
			var $celebButton = $('<button>');
			$celebButton.attr("data-celeb", topics[i]);
			$celebButton.addClass("celebButton");
			$celebButton.addClass("btn");
			$celebButton.text(topics[i]);
			$('#celebrityButtons').append($celebButton);
		};
	}

	$(document).ready(function(){

		// Create celebrity buttons on top of screen
		createRowOfButtons();

		// Allow user to add a celebrity button using the submit button
		$("#addCelebrity").on("click", function(e) {
			// Collect user input
			var userCeleb = $("#celebrity-input").val().trim();
			// Check if user entered input is already in array. Alert user if found.
			if (topics.indexOf(userCeleb) >= 0) {
				alert("That celebrity button already exists!\nLet's get another celebrity in here!");
			// Check if user entered some input to prevent creation of empty buttons
			} else if (userCeleb.length > 0) {
				topics.push(userCeleb);
				// Refresh buttons on top of page
				createRowOfButtons();
			} 
		});

		// When celebrity button is clicked, add 10 images using Giphy API
		$("#celebrityButtons").delegate(".celebButton", "click", function() {
			// Collect the name of the celebrity stored in the data attribute
	    	var celeb = $(this).attr("data-celeb");
	    	// API query and request, limited to 10 gifs
	    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&api_key=Su8yLiz6okgSl5WLjpwgFOMYO6U1Zf39&limit=10";

	      	$.ajax({
	        	url: queryURL,
	          	method: "GET"
	        })
	        
	        .done(function(response) {
	        	var results = response.data;
	        	// Create 10 divs, each containing one celebrity gif still and gif rating
	        	for (var i = 0; i < results.length; i++) {
	        		var gifDiv = $("<div>");
	        		gifDiv.addClass('gifDiv')
	        		var rating = results[i].rating;
	        		var ratingParagraph = $("<p>")
	        		ratingParagraph.text("Rating: " + rating);
	            	var celebImage = $("<img>");
	            	celebImage.addClass('celebImage');
	            	var stillImage = results[i].images.fixed_height_still.url
	            	var animatedImage = results[i].images.fixed_height.url
	            	celebImage.attr("data-still", stillImage);
	            	celebImage.attr("data-animate", animatedImage);
	            	celebImage.attr("data-state", "still");
	            	celebImage.attr("src", stillImage);
	            	gifDiv.append(ratingParagraph);
	            	gifDiv.append(celebImage);
	            	$("#topics").prepend(gifDiv);
	          	}
	          	
	          	// When a gif still is clicked, animate the gif. When an animated gif if clicked, display a still.
	        	$(".celebImage").on('click', function () {
	        		// Collect the current state of the gif stored in the data attribute
	        		var state = $(this).attr('data-state');  

	    			if (state === "still") {
	      				$(this).attr('data-state', 'animate');
	      				$(this).attr('src', $(this).attr('data-animate'));  
	    			};
	    
	    			if (state === "animate") {
	      				$(this).attr('data-state', 'still');
	      				$(this).attr('src', $(this).attr('data-still'));
	    			};
	        	});
	        });
	    });
	});