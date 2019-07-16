import ViewerUtilis from './ViewerUtilis.js';
import ControllerPlatform, {jQuery} from "../Controllers/ControllerPlatform.js";
import ViewerTXT from "./ViewerTXT.js";
import PanelCreator from "../Viewers/widgets/PanelCreator.js";
import Highlight from "../Viewers/widgets/Highlight.js";
import RenamingModule from "../Viewers/widgets/RenamingModule.js";
import TaskbarModule from "../Viewers/widgets/TaskbarModule.js";
import ViewerIcon from "./ViewerIcon.js";
import ViewerProperties from "./ViewerProperties.js";
export default class ViewerPlatform {


	/**
	 *
	 *Resets modules on which module that called this function doesn't depends.
	 * @param {object} modulesToReset - modules to reset.
	 * @returns {void}
	 */
	resetConcreteModules(modulesToReset) {
		
		
		for (var i = 0; i <modulesToReset.length; ++i ) {
			
			var moduleName = modulesToReset[i];
			var module = this.features[moduleName];
			if (module)
				module.reset();
		}
		
		
		
	}
	

	/**
	 *
	 *Checks activness of modules on which module that called this function depends.
	 * @param {object} modulesToCheck - modules to check.
	 * @returns {boolean}
	 */

	checkDependency(modulesToCheck) {
		
		for ( var i=0; i < modulesToCheck.length; ++i) {
			
			var moduleName = modulesToCheck[i];
			var module = this.features[moduleName];
			if ( module.isActive() )
				return false;
				
			
			
		}
		
		return true;
		
	}
	

	
	/**
	 *
	 * Init taskbar module unit.
	 * @returns {void}
	 */
	
	initTaskBarModule() {
		
		
		var params = {
			
			taskbarModule: {
				viewer_as_arg: this,
				actionDependOn: [],
				actionResetModules: ["highlightModule", "renamingModule", "rightMouseClickModule"],
				
				callbacks: {
					appendChildCustom: this.appendChildCustom.bind(this),
					getUserName: this.getUserName.bind(this),
					logOff: this.logOff.bind(this),
					logSystemError: this.controller.logSystemError.bind(this),
					getLogger: this.getLogger.bind(this)
				}
			} 
			
		};
		
		this.features["taskbarModule"] = new TaskbarModule(params);
	}
		
	
	/**
	 *
	 * Init renaming module unit.
	 * @returns {void}
	 */
	initRenamingModule() {
		
		
		var params = {
			
			renamingModule: {
				viewer_as_arg: this,
				actionDependOn: [],
				actionResetModules: [],
				
				callbacks: {
					logSystemError: this.controller.logSystemError.bind(this)
				}
			} 
			
		};
		
		this.features["renamingModule"] = new RenamingModule(params);
	}
		
	/**
	 *
	 * Init right click module unit.
	 * @returns {void}
	 */
	initRightClickPanelsFeature(){
		
		
		var params = {
			
			rightClickPanel: {
				viewer_as_arg: this,
				actionDependOn: [],
				actionResetModules: ["highlightModule", "renamingModule"],
				friendModules: {
					renamingModule: this.features["renamingModule"]
				},
				callbacks: {
					appendChildCustom: this.appendChildCustom.bind(this),
					getSelectedIcon: this.getSelectedIcon.bind(this),
					setSelectedIcon: this.setSelectedIcon.bind(this),
					deleteSelectedIcon: this.deleteSelectedIcon.bind(this),
					getIconsDictionary: this.getIconsDictionary.bind(this),
					resetPositionIconPointer: this.resetPositionIconPointer.bind(this),
					getPositionIconPointer: this.getPositionIconPointer.bind(this),
					movePositionIconPointer: this.movePositionIconPointer.bind(this),
					makeIconAndShow: this.makeIconAndShow.bind(this),
					logSystemError: this.controller.logSystemError.bind(this)	
				},
				userPriv: this.controller.user_priv
			} 
			
		};
		
		this.features["rightMouseClickModule"] = new PanelCreator(params);
	}	
		
	
	/**
	 *
	 * Init highlight module unit.
	 * @returns {void}
	 */
	initHighlightFeature(){
		
		
		var dependency = ["rightMouseClickModule", "renamingModule"];
		var resetOnAction = [];
		
		var params = {
			
			highlightModule: {
				viewer_as_arg: this,
				actionDependOn: dependency,
				actionResetModules: resetOnAction,
				
				callbacks: {
					getIconsDictionary: this.getIconsDictionary.bind(this)
				}
			}
			
		};
		
		this.features["highlightModule"] = new Highlight(params);
	}
	

	/**
	 *
	 * Returns selected icon viewer.
	 * @returns {ViewerIcon}
	 */
	getSelectedIcon() {
		return  this.properties.selectedIconProperty;
	}
	


	/**
	 *
	 * Sets selected icon viewer.
	 * @param {ViewerIcon} icon - Viewer icon.
	 * @returns {void}
	 */
	setSelectedIcon(icon) {
		this.properties.selectedIconProperty = icon;
	}
	
	/**
	 *
	 * Deletes selected icon viewer.
	 * @param {ViewerIcon} iconViewer - Viewer icon.
	 * @returns {void}
	 */
	deleteSelectedIcon(iconViewer){

		if ( iconViewer != this.properties.selectedIconProperty )
			console.log("NE PODUDARAJU SE");
		else
			console.log(" PODUDARAJU SE");

		this.dom.removeChild(iconViewer.getDom());
		delete this.icons[iconViewer.getName()];
				
	}
	
	/**
	 *
	 * Renames selected icon viewer.
	 * @param {string} old_name - old name.
	 * @param {string} new_name - new name.
	 * @returns {void}
	 */
	renameIcon(old_name, new_name) {
		
		this.icons[new_name] = this.icons[old_name];
		delete this.icons[old_name];
	}
	/**
	 *
	 * Returns module.
	 * @param {string} name - Module name.
	 * @returns {ModuleBase}
	 */
	getModule(name) {
		return this.features[name];
		
	}
	

	
	/**
	 * creates a instance of ViewerPlatform
	 * @param {ControllerPlatform} controller - platform controller.
	 */
	constructor(controller) {
		
			/**
		 * Platform controller.
		 * @type {ControllerPlatform} 
		 * @public
		 */
		this.controller = controller;
			/**
		 * Total number of files.
		 * @type {ControllerPlatform} 
		 * @private
		 */
		this.totalFileNumber = 0;

		
		/**
		 * Icons.
		 * @type {ControllerPlatform} 
		 * @private
		 */
		this.icons = {};
		
		
		/**
		 * Properties.
		 * @type {object} 
		 * @private
		 */
		this.properties = {untitledCounterProperty: -1,
							selectedIconProperty: null};

		/**
		 * Features - modules.
		 * @type {object} 
		 * @public
		 */	
		this.features = {
			highlightModule: null,
			rightMouseClickModule: null,
			renamingModule: null,
			taskbarModule: null
						
		};

		/**
		 * Position pointer.
		 * @type {object} 
		 * @public
		 */
		this.iconPositionPointer = {
			
			x: 10,
			y: 10
			
		};
		
		
		
		
		this.initEventHudClicked()
		
		
		
		this.dom = this.createPlatformView();
		
		this.z_index = 5;
		
		
		
		
		document.body.appendChild(this.dom);
		
		
		
	}
	/**
	 *
	 * Loads available modules.
	 * @returns {void}
	 */
	loadAvailableModules() {

		this.initRenamingModule();		
		this.initRightClickPanelsFeature();
		this.initHighlightFeature();
		this.initTaskBarModule();
	
	}
	/**
	 *
	 * Returns next z index.
	 * @returns {void}
	 */
	getNextZindex(){
		this.z_index+=1;
		return this.z_index;
	}
	/**
	 *
	 * Creates platform view.
	 * @returns {void}
	 */
	createPlatformView() {
		var HUD = document.createElement("div");
		HUD.className = "hud";
	
		
		return HUD;
	}

	
	/**
	 *
	 * Resets all modules.
	 * @returns {void}
	 */
	resetModules() {
		var keys = Object.keys(this.features);
			
			for ( var i = 0; i <keys.length; ++i) {
			
				var key = keys[i];
				var module = this.features[key];
				module.reset();
			
			}
		
			
			
	}

	/**
	 *
	 * Init hud click.
	 * @returns {void}
	 */
	initEventHudClicked() {
		document.addEventListener("click", function(e){
				
			this.resetModules();
			
			this.closeMenu();
			//var icon_viewer = this.slectedIcon.icon;
			//icon_viewer.stopRenaming();
			
			
		
			e.preventDefault();
		}.bind(this), false);
	}

	/**
	 *
	 * Sets next untitled number.
	 * @param {integer} value - next untitled number.
	 * @returns {void}
	 */
	setUntitledCounter(value) {
		this.properties["untitled_counter"] = value;	
	}	
	
	/**
	 *
	 * Returns logger.
	 * @returns {Logger}
	 */
	getLogger() {
		
		return this.controller.logger;
		
	}

	/**
	 *
	 * Icons pagination.
	 * @returns {void}
	 */
	icons_pagination() {
		
		if ( this.totalFileNumber > 30 ) {
			
			console.log("PAGINATION");
			var icon_array = document.getElementsByClassName("txt-icon");
							
			for(var i = 0;i < icon_array.length; ++i) {
				
				icon_array[i].className += " zoomed";
				
			}
		}
		
		
	}
	
	
	/**
	 *
	 * Shows file controller viewer. *
	 *  @param {ControllerFileBase} file_controller - controller which's viewer need to be showed.
	 * @returns {void}
	 */
	show(file_controller) {
		
		if ( file_controller.getViewer() != null )
			return;
		
		
		//console.log(txt_controller);
									//txt_controller, this-me-as-viewer-parent, positions....
		
		var file_type = file_controller.getType();
		var file_viewer = null;
		
		var position_x = 50 + Math.random()*90
		var position_y = 50 + Math.random()*90
		
		var modules = {
			
			taskbarModule: this.features["taskbarModule"]
			
		};
		
		switch(file_type) {
			
			case ViewerUtilis.CONST_FILE_TEXT:
				file_viewer = new ViewerTXT(file_controller, this.controller.user_priv, modules,  position_x, position_y, ViewerUtilis.CONST_FILE_SIZE_X, ViewerUtilis.CONST_FILE_SIZE_Y);
				break;
			case ViewerUtilis.CONST_FILE_PROPERTIES:
				file_viewer = new ViewerProperties(file_controller, this.controller.user_priv, modules, position_x, position_y, ViewerUtilis.CONST_PROPERTIES_SIZE_X, ViewerUtilis.CONST_PROPERTIES_SIZE_Y);
				break;	
			default:
				this.controller.logSystemError("File type: " + file_type + " not supported.");
				return;
			
		}
		
		this.features["taskbarModule"].addTask(file_controller.getName());
		
		file_controller.setViewer(file_viewer);
		this.dom.appendChild(file_controller.getViewer().getDom());
		
	}

	/**
	 *
	 * Removes file controller viewer.
	 * @param {ControllerFileBase} file_controller - controller which's viewer need to be destroyed.
	 * @returns {void}
	 */
	removeView(file_controller) {
		
		//console.log(txt_controller);
		
		
		this.features["taskbarModule"].removeTask(file_controller.getName());
		
		this.dom.removeChild(file_controller.getViewer().getDom());
		
		
		delete file_controller.viewer;
		
	}

	/**
	 *
	 * Closes start menu.
	 * @returns {void}
	 */
	closeMenu() {
			var menu = document.getElementsByClassName("main-menu")[0];
			
			menu.style.visibility = "hidden";
	}
	
	
	

	
	/**
	 *
	 * Makes icon.
	 * @param {string} fileName - name of the file.
	 * @param {string} fileController - controller of the file.
	 * @param {string} isFromPanel - is request made from right click module.
	 * @returns {void}
	 */
	makeIconAndShow(fileName, fileController, isFromPanel) {

			var x;
			var y;
			var name = "";
			var new_file = null;
			
			var position = this.iconPositionPointer;
				
			x = position.x;
			y = position.y;


			if ( fileName == undefined ){


				if ( isFromPanel ) {
				
					var module = this.getModule("rightMouseClickModule");
	
						var hud_panel_position = module.get_hud_panel_position_px();
						x = hud_panel_position["x"];
						y = hud_panel_position["y"];
						
						
						x = parseInt(x.substring(0, x.search("p")))- 30;
						y = parseInt(y.substring(0, y.search("p"))) - 40;
						
	
	
					
					
				}

				
				name = "Untitled text " + this.properties["untitled_counter"];
				this.properties["untitled_counter"] += 1;


				var info = {
					name:name,
					type: ViewerUtilis.CONST_FILE_TEXT,
					sizeInBits: 0,
					sizeOnDiskInBits: 0,
					createdByName: this.controller.user_name,
					createdTimestamp: new Date().getTime()
				
				};

				new_file = this.controller.createNewFile(info,  true);	
				
			} else {
				this.movePositionIconPointer();
				
				name = fileName;
				new_file = fileController;
			}
			
		
			
				
			
			
			
			var icon_viewer = new ViewerIcon(this, new_file, x, y);
			this.icons[name] = icon_viewer;
			this.dom.appendChild(icon_viewer.dom);
		
		
			
			
			
			
		
			this.totalFileNumber += 1;
			this.icons_pagination();
				 
		
	}
	
	/**
	 *
	 * Moves pointer for the next icon.
	 * @returns {void}
	 */
	movePositionIconPointer() {
			
		// move pointer
		var screen_height = 480;
		var icon_width = 100;
		var icon_height = 90;
		
		var offset_x = 0;
		var offset_y = 0;
	
		this.iconPositionPointer.y += offset_y + icon_height;
			
			
	
		if (this.iconPositionPointer.y > screen_height-icon_height) {
			
			this.iconPositionPointer.y = 10;
			this.iconPositionPointer.x += offset_x + icon_width;
			
			
		}
	}
	
	/**
	 *
	 * Resets pointer for the next icon.
	 * @returns {void}
	 */
	resetPositionIconPointer() {
		
		this.iconPositionPointer.x = 10;
		this.iconPositionPointer.y = 10;
		
	}
	

	
	/**
	 *
	 * Gets pointer for the next icon.
	 * @returns {object}
	 */
	getPositionIconPointer() {
		return this.iconPositionPointer;
	}
	


	/**
	 *
	 * Gets icons dictionary.
	 * @returns {object}
	 */
	getIconsDictionary() {
		return this.icons;
	}
	
	/*
	
		name: iconExists
		description:
			Cheks if icon with name exist.
		return:
			true: if icon exists
			false: !true
	
	*/

	
	/**
	 *
	 * Checks if icon exists.
	 * @param {string} name - name of the icon.
	 * @returns {boolean}
	 */
	iconExists(name) {
		
		return (name in this.icons);
		
	}
	
	/*
	
		name:appendChildCustom
		description:
			appends function's argument to the dom
		returns:
			void
	*/

	/**
	 *
	 * Appends to the viewer main dom.
	 * @param {DOM} child - Child's dom.
	 * @returns {void}
	 */
	appendChildCustom(child) {
		
		this.dom.appendChild(child);
		
	}

	/**
	 *
	 * Returns name of the user currently logged in.
	 * @returns {string}
	 */
	getUserName() {
		
		return this.controller.user_name;
		
	}
	/**
	 *
	 * Logs off user.
	 * @returns {void}
	 */
	
	logOff() {
		this.controller.logOff();
	}
	
}
