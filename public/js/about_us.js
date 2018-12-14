window.__forceSmoothScrollPolyfill__ = true;
!function(){
	var anchors = document.querySelectorAll(".content-container-itself");
	var anchors_to_elements = document.querySelectorAll("#events, #room-service, #structure, #guest");

	for (var i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener("click", (function(){
			var x = i;

			return function function_name() {
				anchors_to_elements[x].scrollIntoView({ behavior: 'smooth' });
			}
		}()));
	}
}();