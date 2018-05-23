//URL TRICK

function updateURL() {
	str.replace("css/style.min.css", "https://wvholdings.sharepoint.com/rovia/support/siteassets/css/.css");
}

$(document).ready(function () {
    if(window.location.href.indexOf("sharepoint") > -1) {
	updateURL();
};});




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

// ADDS CONTAINER CLASS TO MAIN TAG WHEN SERVING LOCALLY
function addWrapper() {

	if (window.location.href.indexOf('?localhost')) {
	document.getElementById("main").classList.add("container");
	var str = "../siteassets/style.min.css";
	document.getElementById("css").innerHTML = res;
	var theme = document.getElementById("theme");

	theme.href="../siteassets/service.min.css";
	
	console.log("fuck!");
}

};
addWrapper();