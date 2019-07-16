var loginForm = document.getElementById("login-form");

document.getElementsByClassName("btn_ok")[0].addEventListener("click", function () {
  loginForm.submit();
});

document.addEventListener("keydown", function(e) {
	
	if ( e.keyCode == 13 ) {
		
		
		registerPanel.style.visibility == "visible" ? registerForm.submit() : loginForm.submit();
		
	}
	
});







var loginPanel = document.getElementsByClassName("login_panel")[0];
var registerPanel = document.getElementsByClassName("register_panel")[0];


function swap_panel() {
	
	
	loginPanel.style.visibility = 
	(checkIfVisible(loginPanel) ? "hidden" : "visible");
	
	registerPanel.style.visibility =
	(checkIfVisible(registerPanel) ? "hidden" : "visible");
	
}

function checkIfVisible(dom) {
	if ( dom.style.visibility == "visible" 
		|| dom.style.visibility == "")
		return true;
	else
		return false;
}


document.getElementsByClassName("btn_options")[0].addEventListener("click", function () {
	
	swap_panel();
	
});







var registerForm = document.getElementById("register-form");

document.getElementsByClassName("register_btn_ok")[0].addEventListener("click", function () {
  registerForm.submit();
});



document.getElementsByClassName("register_btn_ok")[0].addEventListener("click", function () {
	
	swap_panel();
	
});

document.getElementsByClassName("register_btn_cancel")[0].addEventListener("click", function () {
	
	swap_panel();
	
});


