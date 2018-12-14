// header effects
$(window).on("scroll touchmove", function (){
  $('#header').toggleClass('tiny', $(document).scrollTop() > 0);
  $('.logo-container img').toggleClass('logo_tiny', $(document).scrollTop() > 0);
  $('.sub-header-language-options').toggleClass('sub_header_vanish', $(document).scrollTop() > 0);
  //$('hotel-main-picture-container').toggleClass('hotel-video-toggled', $(document).scrollTop() > 0);
});
// header effects
// Google maps, location content
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
  		center: {lat: 29.591208, lng: 107.768198},
  		zoom: 8
	});

	var marker = new google.maps.Marker({
		position: {lat: 29.591208, lng: 107.768198},
		map: map
	});
}
// Google maps, location content
// header list options in mobile
!function(){
	var map_array = Array.prototype.map;
	var option_list_close_button = document.querySelector(".options-list-mob-close-button-container button");
	var options_mob_button = document.querySelector("#header-options-list-button-mob");
	var options_list_container_mob = document.querySelector(".options-list-container-mob");
	var options_mob_texts = document.querySelectorAll(
		".options-list-container-mob li a," +
		".options-list-container-mob h3," + 
		"#hotel-mark-and-close-button h2"
	);

	options_mob_button.addEventListener("click", function(){
		this.style.visibility = "hidden";
		options_list_container_mob.style.width = "350px";

		setTimeout(function(){
			option_list_close_button.style.display = "block";
			map_array.call(options_mob_texts, function(elem){
				elem.style.display = "block"; 
			});
		}, 450);
	});

	option_list_close_button.addEventListener("click", function(){
		options_mob_button.style.visibility = "visible";
		options_list_container_mob.style.width = "0px";
		option_list_close_button.style.display = "none";

		map_array.call(options_mob_texts, function(elem){
			elem.style.display = "none"; 
		});
	});

	// VIDEO AUTO PLAY
	if(window.innerWidth > 1150){
		var interval_id = setInterval(function(){
			try{
				document.querySelector("#video_default").play();
				document.querySelector("#video_lower_height").play();
			}catch(error){}
		}, 600);
		// VIDEO AUTO PLAY 
	}else{ // MAIN CONTENT TITLE CHANGE FOR VIDEO DISPLAYED NONE
		document.querySelector("#content-presentation-title").innerText = "We want to help you having a wonderful experience";
	}
}();
// header list options in mobile
