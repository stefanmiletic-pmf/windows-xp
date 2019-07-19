import HighlightButtons from "../Viewers/widgets/HighlightButtons.js";


var loginForm = document.getElementById("login-form");

var loginFormButtons = {
	currHighlightIndex: 0,
		buttons: {
			
			ok: {
				dom: document.getElementsByClassName("login_btn_ok")[0],
				actions: {
					"click": function() { loginForm.submit() } ,
				}
			},
			cancel: {
				dom: document.getElementsByClassName("login_btn_cancel")[0],
				actions: {
					"click": BSOD ,
				}
			},
			options: {
				dom: document.getElementsByClassName("login_btn_options")[0],
				actions: {
					"click": swap_panel,
				}
			}
			
		}
}


function BSOD() {
	
	document.body.innerHTML = "<div class='bsod'></div>";
	
}

HighlightButtons.registerActions(loginFormButtons);

document.addEventListener("keydown", function(e) {

	if ( checkIfVisible(registerPanel) ) {
		HighlightButtons._on_key_pressed(e.keyCode, registerFormButtons);
	} else {
		HighlightButtons._on_key_pressed(e.keyCode, loginFormButtons);
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









var registerForm = document.getElementById("register-form");

var registerFormButtons = {
	currHighlightIndex: 0,
	buttons: {
		
		ok: {
			dom: document.getElementsByClassName("register_btn_ok")[0],
			actions: {
				"click": function() { registerForm.submit() },
			}
		},
		cancel: {
			dom: document.getElementsByClassName("register_btn_cancel")[0],
			actions: {
				"click": swap_panel,
			}
		}
	}
	
};

HighlightButtons.registerActions(registerFormButtons);


