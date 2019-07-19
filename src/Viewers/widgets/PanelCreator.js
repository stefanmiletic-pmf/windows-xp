import {getZindex} from "../ViewerUtilis.js";
import ModuleBase from "./ModuleBase.js";

export default class PanelCreator extends ModuleBase{
	
	/**
	 *Creates an instance of PanelCreator.
	 * @param {*} params
	 */
	constructor(params) {
		super(params.rightClickPanel.viewer_as_arg,
		params.rightClickPanel.actionDependOn,
		params.rightClickPanel.actionResetModules);

		var params = params["rightClickPanel"];
		
		
		var callbacks = params["callbacks"];
		
		/**
		 * Appends child to the viewer platform.
		 * @type {function} 
		 * @public
		 */
		this.appendChildCustom = callbacks["appendChildCustom"];
		/**
		 * Gets selected icon on the viewer platform.
		 * @type {function} 
		 * @public
		 */
		this.getSelectedIcon = callbacks["getSelectedIcon"];
		/**
		 * Sets selected icon on the viewer platform.
		 * @type {function} 
		 * @public
		 */
		this.setSelectedIcon = callbacks["setSelectedIcon"];

		/**
		 * Deletes viewer icon of the selected icon.
		 * @type {function} 
		 * @public
		 */
		this.deleteSelectedIcon = callbacks["deleteSelectedIcon"];

		/**
		 * Get icons dictionary callback from viewer platform.
		 * @type {function} 
		 * @public
		 */
		this.getIconsDictionary = callbacks["getIconsDictionary"];

		/**
		 * Resets next position of the pointer for the next new icon.
		 * @type {function} 
		 * @public
		 */
		this.resetPositionIconPointer = callbacks["resetPositionIconPointer"];

		/**
		 * Gets position pointer for the next new icon.
		 * @type {function} 
		 * @public
		 */
		this.getPositionIconPointer = callbacks["getPositionIconPointer"];

		/**
		 * Moves position pointer for the next new icon.
		 * @type {function} 
		 * @public
		 */
		this.movePositionIconPointer = callbacks["movePositionIconPointer"];

		/**
		 * Makes new icon and show.
		 * @type {function} 
		 * @public
		 */
		this.makeIconAndShow = callbacks["makeIconAndShow"];

		/**
		 * Logs system error.
		 * @type {function} 
		 * @public
		 */
		this.logSystemError = callbacks["logSystemError"];
		
		/**
		 * Friend modules: renamingModule.
		 * @type {dictionary} 
		 * @public
		 */
		this.friendModules = params["friendModules"];
		

		
		/**
		 * User privilege.
		 * @type {string} 
		 * @public
		 */
		this.userPriv = params["userPriv"];
		



		/**
		 * Panel that is active at the moment.
		 * @type {DOM} 
		 * @public
		 */
		this.activePanel = null;


		/**
		 * Indicator if right click hud panel is visible(active).
		 * @type {boolean} 
		 * @public
		 */
		this.is_right_click_hud_active = false;
		/**
		 * Dom of right click hud panel.
		 * @type {DOM} 
		 * @public
		 */
		this.right_click_hud_panel_dom = null;
		
		/**
		 * Indicator if right click icon panel is visible(active).
		 * @type {boolean} 
		 * @public
		 */
		this.is_right_click_icon_active = false;
		/**
		 * Dom of right click icon panel.
		 * @type {DOM} 
		 * @public
		 */
		this.right_click_icon_panel_dom = null;

		this.addRightClickFunctionality();
		

		
		
		
	}
	
	
	/**
	 * Returns activness of this module.
	 * @returns {boolean}
	 */	
	isActive() {
		return this.get_icon_panel_visiblity()
		|| this.get_hud_panel_visibility();
	}
	

	
	/**
	 * Resets this module.
	 * @returns {void}
	 */	
	reset() {
		
		this.hide_hud_panel();
		this.hide_icon_panel();
	}
	

	/**
	 * Powerful panel creator.
	* @param {string} panel_parent_className - Parent panel class.
	* @param {string} options_className_prefix - Children class prefix.
	* @param {string} options_name - Children name.
	* @param {string} options_callbacks - Children name + callbacks.
	* @param {string} options_disabled - Which children are disabled.
	* @param {string} callback_hide_panel - Callback for panel closing on end of the action.
	* @returns {DOM}
	*/	
	static
	right_click_panel_generator_5000(panel_parent_className, options_className_prefix, options_name,
						options_callbacks, options_disabled, callback_hide_panel) {
	
			
	var OPTION_LIST = document.createElement("ul");
	OPTION_LIST.className = panel_parent_className;
	
	if ( callback_hide_panel == undefined ) {
		callback_hide_panel = function() {
			OPTION_LIST.style.visibility = "hidden";
		}
		
	}
		
	
	
	
	var keys = Object.keys(options_callbacks);
	
	
	if ( options_name != undefined ){
	
		//console.log(options_name);
		if ( options_name.length != keys.length) {
			return;
		}
	}
	
	
	for (var i = 0; i < keys.length ; ++i ){
		
	
		
		var key = keys[i];
		var node_dom = null;
		
		if ( key.startsWith("HR") ) {
			
			node_dom = document.createElement("hr");
			
		} else {
			
			node_dom = document.createElement("li");
			
			
			var node_class_sufix = key.split(" ")[0].toLowerCase();
			
			node_dom.className = options_className_prefix+ node_class_sufix;
			
			
			
			var a = document.createElement("a");
			if ( options_name != undefined ) 
				a.innerHTML = options_name[i];
			else
				a.innerHTML = key;
			node_dom.appendChild(a);
			
			if ( !(key in options_disabled) ) {
				
				if ( options_callbacks[key] != null ) {
					
					var OPTION_callbacks = options_callbacks[key];
					////console.log(OPTION_callbacks);
					var keys_Y = Object.keys(OPTION_callbacks);
					
					for ( var y = 0; y < keys_Y.length; ++y ) {
						
						var key_Y = keys_Y[y];
						
						var callbackOn = key_Y;
						var callback = OPTION_callbacks[key_Y];
						//console.log("callbackOn: " + callbackOn);
						//console.log(callback);
						node_dom.addEventListener(callbackOn, function(e) {
						
							//console.log("gde si ");
							this.callback(e);
							this.callback_hide_panel();
							
							e.stopPropagation();
						}.bind({callback:callback, callback_hide_panel: callback_hide_panel }), false);
						
					}
					
					
					
				}
				
				
			} else 
				node_dom.className += options_disabled[key];
			
			if ( options_callbacks[key] == null ) 
				node_dom.className += " not-implemented";
			
		}
		
		
		OPTION_LIST.appendChild(node_dom);

		
	}
	
	return OPTION_LIST;
		
	}


	
	
	/**
	 * Returns hud(main) panel position.
	 * @returns {object}
	 */	
	get_hud_panel_position_px() {
		return {
				"x": this.right_click_hud_panel_dom.style.left,
				"y": this.right_click_hud_panel_dom.style.top
		}; 
		
	}

	
	/**
	 * Returns hud(main) panel visibility.
	 * @returns {boolean}
	 */	
	get_hud_panel_visibility() {
		return 
		this.is_right_click_hud_active;
	}

	
	/**
	 * Hides hud(main) panel.
	 * @returns {void}
	 */	
	hide_hud_panel() {
		
		this.activePanel = null;
		this.right_click_hud_panel_dom.style.visibility = "hidden";
		this.is_right_click_hud_active = false;
	}
	/*
		description:
			Shows right click hud panel
		returns:
			void
	*/
	/**
	 * Shows hud(main) panel.
	* @param {integer} pos_x_px - position on x axis with "px".
	* @param {integer} pos_y_px - position on x axis with "px".
	 * @returns {void}
	 */	
	show_hud_panel(pos_x_px, pos_y_px) {
		
		
		
		this.activePanel = this.right_click_hud_panel_dom;
		this.right_click_hud_panel_dom.style.visibility = "visible";
		this.right_click_hud_panel_dom.style.zIndex = getZindex(this.right_click_hud_panel_dom);
		this.is_right_click_hud_active = true;
		
		this.right_click_hud_panel_dom.style.left = pos_x_px;
		this.right_click_hud_panel_dom.style.top = pos_y_px;
	
	}

	/**
	 * Makes hud(main) panel.
	 * @returns {void}
	 */	
	make_right_click_hud_panel() {
		
		
		
		
		
		var arrange_by_name_callback = function(e) {
			
			this.resetPositionIconPointer();
		
		
			var icons = this.getIconsDictionary();
		
			var keys = Object.keys(icons).sort(function(a, b) {
					  return a.toUpperCase().localeCompare(b.toUpperCase());
					});
			
			for (var i = 0; i < keys.length; ++i ) {
				
				
				var icon_viewer = icons[keys[i]];
				var dom = icon_viewer.getDom();
			
				var position = this.getPositionIconPointer();
			
				dom.style.position = "absolute";
				dom.style.left = position.x + "px";
				dom.style.top = position.y + "px";
				
				
				this.movePositionIconPointer();
				
				
			}
			
			
			
			
			
				e.preventDefault();
				e.stopPropagation();
			
		}.bind(this);
		
		var refresh_callback = function() {
			
			var icon_array = document.getElementsByClassName("txt-icon");
							
			for(var i = 0;i < icon_array.length; ++i)
				icon_array[i].style.visibility = "hidden";
		
			setTimeout(function() {
				
				for(var i = 0;i < icon_array.length; ++i)
					icon_array[i].style.visibility = "visible";
		
				
			}, 100);
		
			
		};
		
		var new_txt_file_callback = function(e) {
			
			this.makeIconAndShow(undefined, undefined, true);
							
			e.preventDefault();
			e.stopPropagation();
		}.bind(this);
		
		var panel_parent_className = "right-click-option-list";
		var options_prefix = "right-click-option-list-";
		var options_callbacks = { "Arrange Icons By Name": 
		{ "click": arrange_by_name_callback },
		"Refresh": {"click": refresh_callback}, "HR1": null, "Paste": null, "Paste Shortcut": null, "Undo Move": null, "HR2": null, "New txt file": { "click": new_txt_file_callback }, "HR3": null, "Properties": null}
		var options_disabled = {}
		
		if (this.userPriv == "guest") {
			options_disabled["New txt file"] = " disabled";
		} 
		
		return PanelCreator.right_click_panel_generator_5000(panel_parent_className, options_prefix, undefined, options_callbacks, options_disabled, this.hide_hud_panel.bind(this));
		
	}
	
		/**
	 * Returns icon panel visibility.
	 * @returns {boolean}
	 */	
	get_icon_panel_visiblity() {
		return this.is_right_click_icon_active;
	}

		/**
	 * Hides icon panel.
	 * @returns {void}
	 */	
	hide_icon_panel() {
		this.activePanel = null;
		this.is_right_click_icon_active = false;
		this.right_click_icon_panel_dom.style.visibility = "hidden";
				
	}
	/*
		description:
			Shows right click icon panel
		returns:
			void
	*/

	/**
	 * Shows icon panel.
	* @param {integer} pos_x_px - position on x axis with "px".
	* @param {integer} pos_y_px - position on x axis with "px".
	 * @returns {void}
	 */	
	show_icon_panel(pos_x_px, pos_y_px) {
		this.activePanel = this.right_click_icon_panel_dom;
		this.is_right_click_icon_active = true;
		this.right_click_icon_panel_dom.style.visibility = "visible";
		this.right_click_icon_panel_dom.style.zIndex = getZindex(this.right_click_icon_panel_dom);
				
		this.right_click_icon_panel_dom.style.left = pos_x_px;
		this.right_click_icon_panel_dom.style.top = pos_y_px;
	}

	/**
	 * Makes icon panel.
	 * @returns {void}
	 */
	make_right_click_icon_panel() {
		
			
	// CALLBACKS		
		var open_callback = function() {
					
			var selectedIcon = this.getSelectedIcon();
			if ( selectedIcon ) {
				var controller = selectedIcon.getController();
				controller.show();
			} else 	
				this.logSystemError("open_callback")			
			
			
		}.bind(this);

		
		var delete_callback = function(e) {
			
			
				var iconViewer =  this.getSelectedIcon();
				
				if ( !iconViewer ) {
					this.logSystemError("delete_callback")	
					return;		
				}
				
				var controller = iconViewer.getController();
				controller.deleteFile();
				
				
			
				this.deleteSelectedIcon(iconViewer);
				this.setSelectedIcon(null);
			
		}.bind(this);
		
		
		var rename_callback = function(e) {
				var renamingModule = this.friendModules["renamingModule"];
				
				if ( !renamingModule ){
					this.logSystemError("rename_callback")	
					return;
				}
					
				if (renamingModule.isActive()){
					
					return;
					
				}
				
				
				
				
				var iconViewer =  this.getSelectedIcon();
				
				renamingModule.setActive(true, iconViewer);
				if ( !iconViewer ){
					this.logSystemError("rename_callback")
					return;
				}
				
				iconViewer.switchTitleAndRenamingField();
				 
				e.stopPropagation(); 
				 
		}.bind(this);
		
		var properties_callback = function() {
			
			var selectedIcon = this.getSelectedIcon();
			if ( selectedIcon ) {
				var controller = selectedIcon.getController();
				controller.showPropertiesView();
			} else 	
				this.logSystemError("open_callback")
			
			
		}.bind(this);
		
		var panel_parent_className = "right-click-icon-option-list";
		var options_prefix = "right-click-icon-option-list-";
		var options_callbacks = { "Open": { "click": open_callback },
		"Run as...": null, "Pin to Start menu": null, "HR1": null, "Send to": null, "HR2": null, "Cut": null, "Copy": null, "HR3": null, "Delete": { "click": delete_callback }, "Rename": { "click": rename_callback }, "HR4": null, "Properties": {"click": properties_callback}}
		var options_disabled = {}
		if (this.userPriv == "guest") {
			options_disabled["Rename"] = " disabled";
		} 
		
		if (this.userPriv != "admin") {
			
			options_disabled["Delete"] = " disabled";
			
		}
		
		return PanelCreator.right_click_panel_generator_5000(panel_parent_className, options_prefix, undefined,options_callbacks, options_disabled, this.hide_icon_panel.bind(this));
			
		
	}
	


	/**
	 * Adds right click functionality.
	 * @returns {void}
	 */
	addRightClickFunctionality() {
		
		
		this.is_right_click_hud_active = false;
		this.right_click_hud_panel_dom = this.make_right_click_hud_panel();
		this.right_click_hud_panel_dom.style.visibility = "hidden";
		
		
		this.is_right_click_icon_active = false;
		this.right_click_icon_panel_dom = this.make_right_click_icon_panel();
		this.right_click_icon_panel_dom.style.visibility = "hidden";
		
		
		
		document.addEventListener('contextmenu', function(e) {
			
			if ( this.checkDependency() == false )
				return;
			
			this.resetOtherModules();
			////console.log("contexmenu hud");
			
			
			if(this.get_icon_panel_visiblity())
				this.hide_icon_panel();
			
			
			this.show_hud_panel(e.clientX+"px", e.clientY+"px");
		
			e.preventDefault();
			
		}.bind(this), false );
			
			
		
		this.appendChildCustom(this.right_click_hud_panel_dom);
		this.appendChildCustom(this.right_click_icon_panel_dom);
		
		 
	}
		
	
	
	
}