const ENTER = 13;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;


export default class HighlightButtons {
	

	static
	_on_key_pressed(key, buttons) {
		
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
				HighlightButtons.highlighNextOneWithKey(buttons, -1)
				break;
				
			case RIGHT_ARROW:
				HighlightButtons.highlighNextOneWithKey(buttons, 1)
				break;
				
			
			
		}
		
	}

	
	static
	highlighNextOneWithKey(buttons, shift) {
	
		
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


	static
	registerActions(buttons) {
		
		
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
	
	
}



