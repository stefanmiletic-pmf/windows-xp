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

registerActions(loginFormButtons);

document.addEventListener("keydown", function(e) {

	if ( checkIfVisible(registerPanel) ) {
		_on_key_pressed(e.keyCode, registerFormButtons);
	} else {
		_on_key_pressed(e.keyCode, loginFormButtons);
	}
	
});


const ENTER = 13;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

function _on_key_pressed(key, buttons) {
	
	var buttons_list = buttons.buttons;
	var currentActiveIndex = buttons.currHighlightIndex;
	
	var buttons_keys = Object.keys(buttons_list);
	
	
	
	switch(key) {
		
		case ENTER:
			
			var currentActiveKey = buttons_keys[currentActiveIndex];
			var currentActiveObj = buttons_list[currentActiveKey];
			currentActiveObj.dom.click()
			
			break;
		case LEFT_ARROW:
			highlighNextOneWithKey(buttons, -1)
			break;
			
		case RIGHT_ARROW:
			highlighNextOneWithKey(buttons, 1)
			break;
			
		
		
	}
	
}




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

registerActions(registerFormButtons);

function registerActions(buttons) {
	
	
	var buttons_list = buttons.buttons;
	var keys = Object.keys(buttons_list);
	
	for ( var i = 0; i < keys.length; ++i ) {
		
		var key = keys[i];
		var btn = buttons_list[key];
		var dom = btn.dom;
		
		var btn_actions_keys = Object.keys(btn.actions);
		for ( var j = 0; j < btn_actions_keys.length; ++j ) {
			
			var btn_action_key = btn_actions_keys[j];
			var action = btn.actions[btn_action_key]
			
			dom.addEventListener(btn_action_key, action);
			
		}
		
	}
	
}

function highlighNextOneWithKey(buttons, shift) {
	
	
	var buttons_list = buttons.buttons
	
	var keys = Object.keys(buttons_list);
	
	var prev_active_dom = buttons_list[keys[buttons.currHighlightIndex]].dom;
	prev_active_dom.className = prev_active_dom.className.replace("active", '');
	
	
	buttons.currHighlightIndex += shift
	
	if ( buttons.currHighlightIndex < 0 )
		buttons.currHighlightIndex = keys.length - 1
	
	buttons.currHighlightIndex %= keys.length
	
	
	var curr_active_dom = buttons_list[keys[buttons.currHighlightIndex]].dom;
	curr_active_dom.className += " active";
	
	
}


