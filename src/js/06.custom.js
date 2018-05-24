if (window.location.href.indexOf('localhost')) {

	addTheme();	
	tmpServer();
};


//URL TRICK


function addTheme() {
	var themename = document.getElementById("theme").href.split('/').pop().split('.min.css').slice(0);
	var theme = themename[0];
	console.log("this page uses the " + theme + " theme!");

	var newtheme = document.createElement("link");
	newtheme.rel = "stylesheet";
	newtheme.href = "css/" + theme + ".css";

	var head = document.getElementsByTagName("head")[0];

	head.appendChild(newtheme);

};



//ACTIVATES LIGHTBOX

$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});



//SLIDEOUT LINKS

/* Open the sidenav */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    }

/* Close/hide the sidenav */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// ADDS MATCHING THEME,  CONTAINER CLASS TO MAIN TAG WHEN SERVING LOCALLY


		
function tmpServer() {
	document.getElementsByTagName("body")[0].classList.add("container");
	var str = "../siteassets/style.min.css";
	document.getElementById("css").innerHTML = res;
	var theme = document.getElementById("theme");

	theme.href="../siteassets/service.min.css";
	
	
};


