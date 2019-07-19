import PanelCreator from "../../Viewers/widgets/PanelCreator.js";
import ViewerUtilis from "../ViewerUtilis.js";
import {getZindex} from "../ViewerUtilis.js";
import ControllerFileBase from "../../Controllers/ControllerFileBase.js";


export default class WindowBuilder {
		
	 /**
   * creates a instance of WindowBuilder.
   */
	constructor(file_controller, user_priv, taskbarModule) {
		
			/**
		 * User privilege.
		 * @type {string} 
		 * @public
		 */
		this.user_priv = user_priv;
			/**
		 * File controller for which this window is building.
		 * @type {ControllerFileBase} 
		 * @public
		 */
		this.file_controller = file_controller;
			/**
		 * Window header.
		 * @type {DOM} 
		 * @public
		 */
		this.HEADER = null;
			/**
		 * Window header left side.
		 * @type {DOM} 
		 * @public
		 */
		this.HEADER_LEFT = null;
			/**
		 * Window header right side.
		 * @type {DOM} 
		 * @public
		 */
		this.HEADER_RIGHT_PANEL =null;
			/**
		 * Window body.
		 * @type {DOM} 
		 * @public
		 */
		this.WINDOW_BODY = null;
			/**
		 * Below header menu.
		 * @type {DOM} 
		 * @public
		 */
		this.FILE_MENU = null;
		
			/**
		 * Below header file menu.
		 * @type {DOM} 
		 * @public
		 */
		
		this.FILE_MENU_FILE_PANEL = null;
		
			/**
		 * Window DOM.
		 * @type {DOM} 
		 * @public
		 */
		
		this.DOM = document.createElement("div");
		//this.DOM.id = name;
		this.DOM.className = "window-base ui-draggable ui-draggable-handle";
		this.DOM.id = file_controller.getName();
		this.DOM.style.zIndex = getZindex(this.DOM);
		var type = this.file_controller.getType();
		var cssExtension = "";
		
		switch(type) {
			case ViewerUtilis.CONST_FILE_PROPERTIES:
				cssExtension = " file-properties";
				break;
			case ViewerUtilis.CONST_FILE_TEXT:
				cssExtension = " file-txt";
				break;
			
		}
		
		this.DOM.className += cssExtension;
		this.DOM.addEventListener('contextmenu', function(e) {
		
			
			e.preventDefault();
			e.stopPropagation();
		
		}, false);
		
		var domAsArg = this.DOM;
		this.DOM.addEventListener('click', function(e) {
		
			e.stopPropagation();
		
			domAsArg.style.zIndex = getZindex(domAsArg);
			
			if ( taskbarModule.checkIfWindowIsCurrentlyActive(file_controller.getName() ) )
				return;
			
			taskbarModule.switchActiveTaskTo(file_controller.getName());
			//e.preventDefault();
			//e.stopPropagation();
		
		
		}, false);
		
		
		
	}
	

	
	/**
	 * Makes header base.
	 * @returns {void}
	 */
	makeHeaderBase() {
		
		this.HEADER = document.createElement("div");
		this.HEADER.className = "window-base-header";
		//HEADER.className = "header";
		
		
		
		
		this.DOM.appendChild(this.HEADER);
	}
	
	
	/**
	 * Makes header left panel base.
	 * @returns {void}
	 */
	makeHeaderLeftPanel() {
		
		if (!this.HEADER)
			return;
		
		// header-left
		this.HEADER_LEFT = document.createElement("div");
		this.HEADER_LEFT.className = "header-left";
		
		
		this.HEADER.appendChild(this.HEADER_LEFT);
		
	}
		
	/**
	 * Makes header left panel icon.
	 * @param {string} icon_src - Image path.
	 * @returns {void}
	 */
	makeHeaderLeftPanelIcon(icon_src) {
		
		if (!this.HEADER_LEFT)
			return;
		
		var HEADER_LEFT_ICON = document.createElement("img");
		HEADER_LEFT_ICON.src = icon_src;
		HEADER_LEFT_ICON.className = "header-left-icon";
		
		this.HEADER_LEFT.appendChild(HEADER_LEFT_ICON);
	}
	/**
	 * Makes header left panel title.
	 * @param {string} name - Window title.
	 * @returns {void}
	 */
	makeHeaderLeftPanelText(name) {
		
		
		if (!this.HEADER_LEFT)
			return;
		
		var HEADER_LEFT_TEXT =  document.createElement("h3");
		if ( name != undefined )
			HEADER_LEFT_TEXT.innerHTML = name;
		else
			HEADER_LEFT_TEXT.innerHTML = this.file_controller.getName();
		HEADER_LEFT_TEXT.className = "header-left-text";
		
		this.HEADER_LEFT.appendChild(HEADER_LEFT_TEXT);
	}
	
	
	
	
	/**
	 * Makes header right panel base.
	 * @returns {void}
	 */
	makeHeaderRightPanel() {
		this.HEADER_RIGHT_PANEL = document.createElement("ul");
		this.HEADER_RIGHT_PANEL.className = "header-panel-right";
		
		this.HEADER.appendChild(this.HEADER_RIGHT_PANEL);
		
	}

		
	/**
	 * Makes header right panel exit button.
	 * @returns {void}
	 */
	makeHeaderRightPanelExitBtn() {
			
		if (!this.HEADER_RIGHT_PANEL)
			return;
			
		var HEADER_RIGHT_PANEL_BTN_EXIT = document.createElement("li");	
		var HEADER_RIGHT_PANEL_BTN_EXIT_IMG = document.createElement("div");
		HEADER_RIGHT_PANEL_BTN_EXIT_IMG.className = "header-panel-right-btn-exit";
		HEADER_RIGHT_PANEL_BTN_EXIT.appendChild(HEADER_RIGHT_PANEL_BTN_EXIT_IMG);

		HEADER_RIGHT_PANEL_BTN_EXIT.addEventListener("click", function(e) {
				
			this.file_controller.removeView();
			
			e.preventDefault();
			e.stopPropagation();
			
		}.bind({file_controller: this.file_controller}), true);

		this.HEADER_RIGHT_PANEL.appendChild(HEADER_RIGHT_PANEL_BTN_EXIT);

	}
	/**
	 * Makes header right panel max button.
	 * @returns {void}
	 */
	makeHeaderRightPanelMaxBtn() {
		
		if (!this.HEADER_RIGHT_PANEL)
			return;
		
			var HEADER_RIGHT_PANEL_BTN_MAXIMIZE = document.createElement("li");		
			var HEADER_RIGHT_PANEL_BTN_MAXIMIZE_IMG = document.createElement("div");
			HEADER_RIGHT_PANEL_BTN_MAXIMIZE_IMG.className = "header-panel-right-btn-max";
			HEADER_RIGHT_PANEL_BTN_MAXIMIZE.appendChild(HEADER_RIGHT_PANEL_BTN_MAXIMIZE_IMG);

		this.HEADER_RIGHT_PANEL.appendChild(HEADER_RIGHT_PANEL_BTN_MAXIMIZE);
	}
	
	/**
	 * Makes header right panel min button.
	 * @returns {void}
	 */
	makeHeaderRightPanelMinBtn() {
		
		if (!this.HEADER_RIGHT_PANEL)
			return;
		
			
			var HEADER_RIGHT_PANEL_BTN_MINIMIZE = document.createElement("li");
			var HEADER_RIGHT_PANEL_BTN_MINIMIZE_IMG = document.createElement("div");
			HEADER_RIGHT_PANEL_BTN_MINIMIZE_IMG.className = "header-panel-right-btn-min";
			HEADER_RIGHT_PANEL_BTN_MINIMIZE.appendChild(HEADER_RIGHT_PANEL_BTN_MINIMIZE_IMG);
			
		this.HEADER_RIGHT_PANEL.appendChild(HEADER_RIGHT_PANEL_BTN_MINIMIZE);
	}
	/**
	 * Makes window body.
	 * @returns {void}
	 */
	makeWindowBody() {
		
		this.WINDOW_BODY = document.createElement("div");
		this.WINDOW_BODY.className = "window-body";
		
		this.DOM.appendChild(this.WINDOW_BODY);
	}
	
		
	/**
	 * Makes file options panel for header menu.
	 * @returns {void}
	 */
	makeMenuFileOptionFilePanel() {
		
		
		this.FILE_MENU_FILE_PANEL = WindowBuilder.createFileSubHeader(this.user_priv, this.file_controller);
			
			
			
	}
	
			
	/**
	 * Makes header menu.
	 * @returns {void}
	 */
	makeMenuFile() {
		
			if ( !this.WINDOW_BODY)
				 return;
			
			var FILE_MENU = WindowBuilder.createHeader(this.FILE_MENU_FILE_PANEL);
			
			this.WINDOW_BODY.appendChild(FILE_MENU);
	}

	
	/**
	 * Makes dom draggable.
	 * @returns {void}
	 */
	makeDomDraggable() {
		var DOM_AS_ARG = this.DOM;
		
		jQuery(function() {
             jQuery( DOM_AS_ARG ).draggable({handle: ".window-base-header"});
		 });
	}
	
	/**
	 * Builds dom.
	 * @returns {void}
	 */
	buildDom() {
		return {dom: this.DOM, windowBody: this.WINDOW_BODY};
	}
	
	
	
	/**
	 * Builds header.
	 * @param {DOM} childPanel - Child panel. 
	 * @returns {void}
	 */
	static
	createHeader(childPanel) {
		
		var hide_panel_callback = function() {};
		var panel_parent_className = "file-menu-option-list";
		var options_prefix = "file-menu-option-list-option-";
		
		var file_callback_onmouseover = function() {
			
			childPanel.style.visibility="visible";
		};
		var file_callback_onmouseout = function() {
			
			childPanel.style.visibility="hidden";
		};
		
		
		var options_callbacks = { "File": {"mouseover": file_callback_onmouseover, "mouseout": file_callback_onmouseout},
		"Edit": null, "View": null, "Help": null}
		var options_disabled = {}
		
		var FILE_MENU =  PanelCreator.right_click_panel_generator_5000(panel_parent_className, options_prefix, undefined,options_callbacks, options_disabled, hide_panel_callback);
		
					
		FILE_MENU.appendChild(childPanel);
					
		return FILE_MENU;
	}
	
	/**
	 * Builds sub panel header.
	 * @param {string} user_priv - Child panel. 
	 * @param {ControllerFileBase} file_controller - Child panel. 
	 * @returns {void}
	 */
	static
	createFileSubHeader(user_priv, file_controller) {
		var exit_callback =  function() {
				
			file_controller.removeView();
			
		};
		
		var save_callback = function() {
				
				this.file_controller.save();
				
				
		}.bind({file_controller: file_controller});

		var panel_parent_className = "file-panel";
		var options_prefix = "file-panel-option-";
		var options_name = [
			"New", "Open...", "hr_placeholder", "Save",
			"Save as...","hr_placeholder", 
			"Exit"
		];
		var options_callbacks = { "New": null,
		"Open": null, "HR1": null, "Save": {"click": save_callback}, "Save as": null, "HR2": null, "Exit": {"click": exit_callback}}
		var options_disabled = {}
		if (user_priv == "guest") {
			options_disabled["Save"] = " disabled";
		} 
		
		var FILE_PANEL_EXTRA = PanelCreator.right_click_panel_generator_5000(panel_parent_className, options_prefix, options_name,options_callbacks, options_disabled);

		
				
		FILE_PANEL_EXTRA.addEventListener("mouseover", function() {
			
			FILE_PANEL_EXTRA.style.visibility="visible";
			
		});
		
		FILE_PANEL_EXTRA.addEventListener("mouseout", function(e) {
			
			
			FILE_PANEL_EXTRA.style.visibility="hidden";
			
			e.stopPropagation();
		}, false);
		
		return FILE_PANEL_EXTRA;
		
		
		
		
		
	}
	
}