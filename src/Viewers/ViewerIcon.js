import ViewerUtilis from './ViewerUtilis.js';
import ControllerFileTXT from '../Controllers/ControllerFileTXT.js';
import RenamingModule from './widgets/RenamingModule.js';
import Highlight from './widgets/Highlight.js';
import TaskbarModule from './widgets/TaskbarModule.js';


export default class ViewerIcon {
	
	
	/**
	 *Creates an instance of ViewerIcon.
	 * @param {ViewerPlatform} viewer_platform
	 * @param {ControllerFileTXT} txt_controller
	 * @param {integer} position_x
	 * @param {integer} position_y
	 */
	constructor(viewer_platform, txt_controller, position_x, position_y) {
			/**
		 * Viewer platform.
		 * @type {ViewerPlatform} 
		 * @public
		 */
		this.viewer_as_arg = viewer_platform;
			/**
		 * Textual controller.
		 * @type {ControllerFileTXT} 
		 * @public
		 */
		this.txt_controller = txt_controller;
			/**
		 * Friend module: renaming module.
		 * @type {RenamingModule} 
		 * @public
		 */
		this.renamingModule = this.viewer_as_arg.getModule("renamingModule");
		/**
		 * Friend module: highlight module.
		 * @type {Highlight} 
		 * @public
		 */
		this.highlightModule = this.viewer_as_arg.getModule("highlightModule");
		/**
		 * Friend module: taskbar module.
		 * @type {TaskbarModule} 
		 * @public
		 */
		this.taskbarModule = this.viewer_as_arg.getModule("taskbarModule");
		
		/**
		 * Dom of this viewer.
		 * @type {DOM} 
		 * @public
		 */
		this.dom = this.make_new_icon(txt_controller, position_x, position_y);
		

		/**
		 * Timeout object for controlling icon double clicking.
		 * @type {object} 
		 * @public
		 */
		this.timeoutClick = {
			clickedCounter: 0,
			callback: null
		};
		
		this.timeoutClick.callback = function() {
				
				
				if ( this.timeoutClick.clickedCounter == 2 ) {
					this.renamingModule.stopRenaming();				
					this.txt_controller.show();
				} 
					
				this.timeoutClick.clickedCounter = 0;
				
		}.bind(this);
		
	}


	/**
   * Returns dom that represent title of the icon.
   * @returns {DOM}
   */
	getIconTitleDOM() {
		return this.dom.getElementsByClassName("txt-icon-title")[0];
	}
	
	
	/**
	 * Returns dom for the renaming field.
	 * @returns {DOM}
	 */
	getRenameFieldDOM() {
		return this.dom.getElementsByClassName("txt-icon-title-rename")[0];
	}
	

	
	/**
	 * Returns textual controller.
	 * @returns {ControllerFileTXT}
	 */	
	getController() {
		return this.txt_controller;
	}

	

	/**
	 * Returns main viewer DOM.
	 * @returns {DOM}
	 */	
	getDom() {
		return this.dom;
	}
	

	/**
	 * Returns name of the icon.
	 * @returns {string}
	 */	
	getName() {
		return this.txt_controller.getName();
	}
	
	
	
	/**
	 * Makes new icon at position x and y.
	* @param {ControllerFileTXT} txt_controller - Textual controller.
	* @param {integer} x - position x axis.
	* @param {integer} y - position y axis.
	 * @returns {DOM}
	 */	
	make_new_icon(txt_controller, x, y) {
	
		
		var icon_file = document.createElement("div");
		icon_file.className = "txt-icon";
		icon_file.style.left = x + "px";
		icon_file.style.top = y + "px";
		
		
		
		var icon = document.createElement("img");
		icon.className = "txt-icon-image";
		if (txt_controller.getName() == "config"){
			icon.src = ViewerUtilis.ICON_CONFIG_FILE;
			icon_file.className += " config-file"
		}
		else
			icon.src = ViewerUtilis.ICON_TXT_FILE;
		
		
		
		
		var icon_txt = document.createElement("h4");
		icon_txt.className = "txt-icon-title";
		icon_txt.innerHTML = txt_controller.getName();
	
		
		
		
		var icon_txt_rename = document.createElement("input");
		icon_txt_rename.className = "txt-icon-title-rename";
		icon_txt_rename.style.visibility = "hidden";
		icon_txt_rename.value = txt_controller.getName();
		
		
		icon_txt_rename.addEventListener("click", function(e) {
			
			e.stopPropagation();
			
		}.bind(this),false);
		
		icon_txt_rename.addEventListener("keyup", function(e) {
			
			
			
			
			  if (e.keyCode === 13) {
				  
				var old_name = this.txt_controller.getName();
				 
				var renameField = this.getRenameFieldDOM();
				var new_name = renameField.value;
				 //console.log("RENAME 13");
				 //console.log(renameField);
				this.rename(old_name, new_name);
	 
				  
				e.preventDefault();
				e.stopPropagation();
			  }
			
		}.bind(this), false);
		
		
		icon_file.appendChild(icon);
		icon_file.appendChild(icon_txt);
		icon_file.appendChild(icon_txt_rename);
		
		icon_file.addEventListener("click", function(e) {
			
			var viewer_as_arg = this.viewer_as_arg;
			
			this.viewer_as_arg.resetModules();
			this.highlightModule.highlightIcon(icon_file, true);
			
			if ( this.timeoutClick.clickedCounter == 0 ) {
				this.timeoutClick.clickedCounter+=1;
				setTimeout(this.timeoutClick.callback,200);			
			} else {
				if(this.timeoutClick.clickedCounter < 2){
					this.timeoutClick.clickedCounter += 1;
				}
			}
			
		
			
			
			
			
			e.stopPropagation();
			
		}.bind(this),false);
		
		icon_file.addEventListener("contextmenu", function(e) {
			
			var viewer_as_arg = this.viewer_as_arg;
			
			this.viewer_as_arg.resetModules();
			//this.highlightModule.reset();
			//this.highlightModule.highlightIcon(icon_file, true);
			
			var module = viewer_as_arg.getModule("rightMouseClickModule");
			
			if ( !module ){
			
				console.log("no module");
				return;
			}
			
			if ( module.checkDependency() == false ){
				console.log("checkDependency false");
				return;
			}
			
			module.hide_hud_panel();
			module.resetOtherModules();
			module.show_icon_panel(e.clientX+"px", e.clientY+"px");
			
			//viewer_as_arg.setSelectedIcon({ controller: txt_controller, icon: icon_file});
			viewer_as_arg.setSelectedIcon(this);
			
			
			e.preventDefault();
			e.stopPropagation();
			
		}.bind(this), false);
		
		
		var viewer_as_arg = this.viewer_as_arg;
		var highlightModule = this.highlightModule;
		
		jQuery(function() {
			 jQuery( icon_file ).draggable({
				start: function(event,ui) {
					
					viewer_as_arg.resetModules();
					highlightModule.highlightIcon(icon_file, true);
					
				},
				stop: function(event, ui) {
					
					//viewer_as_arg.icon_file_click_twice = false;
				
				}
			});
		});
		
		return icon_file;
	}
	

	
	
	/**
	 * Renaming stop action.
	 * @returns {void}
	 */	
	stopRenaming() {
		
		var old_name = this.txt_controller.getName();
		 
		var renameField = this.getRenameFieldDOM();
		var new_name = renameField.value;
		this.rename(old_name, new_name);
			
	}
	

		
	/**
	 * Renames icon with new name.
	* @param {string} old_name - old name.
	* @param {string} new_name - new name.
	 * @returns {void}
	 */	
	rename(old_name, new_name) {
		old_name =  old_name.trim();
		new_name =  new_name.trim();
		
		
		 if (old_name.localeCompare(new_name) != 0 
					 && !this.viewer_as_arg.iconExists(new_name)) {	
					 
				this.txt_controller.rename(new_name);
				this.viewer_as_arg.renameIcon(old_name, new_name);
					 
		 } else {
				this.getRenameFieldDOM().value = old_name;
		 }
	
		this.renamingModule.setActive(false, null);
		this.switchTitleAndRenamingField()
		 
							 
	}
	
	
	

	/**
	 * Toggles title field and renaming field.
	 * @returns {void}
	 */	
	switchTitleAndRenamingField(){
		
		var icon_title_dom = this.getIconTitleDOM();
		var icon_rename_field_dom = this.getRenameFieldDOM();
		
		icon_rename_field_dom.innerHTML = this.txt_controller.getName();
		icon_title_dom.innerHTML = this.txt_controller.getName();
		
		if (icon_title_dom.style.visibility == "visible" || icon_title_dom.style.visibility == "") {
		
			icon_title_dom.style.visibility = "hidden";
			icon_rename_field_dom.style.visibility = "visible";
			
		} else {	  
		
			icon_rename_field_dom.style.visibility = "hidden";
			icon_title_dom.style.visibility = "visible";
			
		}
		
	}
	
}