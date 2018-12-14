// PICTURE VIEW MODE
!function(){
	var pictures = document.querySelectorAll(".picture-container-itself img");
	var overlay = document.querySelector("#overlay");
	var pic_view_mode = document.querySelector("#picture-view-mode-container");
	var pic_view_mode_img = document.querySelector("#picture-view-mode-container img");

	function manage_overlay(darken_or_not){ // true or false
		if(darken_or_not){
			overlay.style.display = "block";
		}else{
			overlay.style.display = "none";
		}
	}

	for(var i = 0; i < pictures.length; i++){
		pictures[i].addEventListener("click", (function(){
			var x = i;

			return function(){
				if((window.innerHeight > 650) && (window.innerWidth > 900)){
					if((this.style.position == "") || (this.style.position == "static")){
						this.style.position = "fixed";
						this.style.zIndex = "500";

						 $(this).animate({
					        height: '480px',
					        width: '800px',
					        left: '50%',
					        top: '50%',
					        marginTop: '-240px',
					        marginLeft: '-400px'
					    });

						manage_overlay(true);
					}else{
						this.style.position = "static";
						this.style.width = "420px";
						this.style.height = "280px";
						this.style.marginTop = "0px";
						this.style.marginLeft = "0px";
						this.style.top = "auto";
						this.style.left = "auto";
						this.style.zIndex = "1";

						manage_overlay(false);
					}
				}
			}
		}()));
	}
}();
// PICTURE VIEW MODE