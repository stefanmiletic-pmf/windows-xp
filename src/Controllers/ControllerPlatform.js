import ViewerPlatform from "../Viewers/ViewerPlatform.js";
import ViewerUtilis from "../Viewers/ViewerUtilis.js";
import ControllerFileTXT from "./ControllerFileTXT.js";
import FunctionsFrontend from "../Utilis/FunctionsFrontend.js";
import QueryController from "../Utilis/QueryController.js";
import Logger from "../Utilis/Logger.js";
import ControllerFileBase from "./ControllerFileBase.js";

export var jQuery = $;
export default class ControllerPlatform {
	
	
	/**
   * Creates an instance of ControllerPlatform.
   */
	constructor() {	
	
		  /**File controllers.
			 * @type {object}
			 * @public
		 */
		this.controllers = {};	
		
		/**
		 * System viewer.
		 * @type {ViewerPlatform}.
		 * @public
		 */
		this.viewer = null;
			
		/**User id.
		 * @type {integer}
		 * @public
		 */
		this.user_id = null;
		/**User name.
		 * @type {string}
		 * @public
		 */
		this.user_name = null;
		/**User privilege.
		 * @type {string}
		 * @public
		 */
		this.user_priv = null;

		/**
		   * System logger.
		 * @type {Logger}.
		 * @public
		 */
		this.logger = null;
		
		this.initUserAndPlatform();
		
		
	}

	/**
	 * Init system logger.
	 * @param {string} name - Logger name.
	 * @returns {void} 
	 */
	setLogger(name) {

		  
		this.logger = new Logger(name);

	}

	/**
	 * Init user and platform.
	 * @returns {void} 
	 */
	initUserAndPlatform() {
		
			 
		var callback_success = function(responseText) {
			
			var response = JSON.parse(responseText)[0];
			
			
			
			this.user_id = response["id"];
			this.user_name = response["name"];
			this.user_priv = response["priv"];
			
			this.setLogger(this.user_name);
			
			console.log(
				this.logger.push_raw("User '"+ this.user_name + "' logged in")
			);
			this.initPlatform()	
		
			
			
		}.bind(this);
		
		var callback_error =ViewerUtilis.showBSOD;
		
		
		QueryController.executeQuery({"ID": true}, callback_success, callback_error);
	}

	/**
	 * Setup platform viewer and modules.
	 * @returns {void} 
	 */
	initPlatform() {
		
				this.viewer = new ViewerPlatform(this);
				this.viewer.loadAvailableModules();
				
				this.fetchAllFiles();
	}
	
	
	/**
   * Fetch all files from the server and make controllers.
   * @returns {void} 
   */
	fetchAllFiles() {
		
		
			
		var callback_success = function(response) {
			
			var next_number_for_untitled_file = -1;
			
			
			
			var response = JSON.parse(response);
			
			
			console.log(
				this.logger.push(false, ""+ response.length + " files fetched")
			);
			
			
			for ( var i=0; i < response.length; ++i) {
				
				
				var node = response[i];
				var txt = node["txt"];
		
				var info = {
					name: node["name"],
					sizeInBits: node["sizeInBits"],
					sizeOnDiskInBits: node["sizeOnDiskInBits"],
					createdTimestamp: node["createdTimestamp"],
					createdByName: node["createdByName"],
					type: ViewerUtilis.CONST_FILE_TEXT
				};
		
				var cntr = this.createNewFile(info,  false);
				cntr.initContent(txt);
				this.viewer.makeIconAndShow(info["name"], cntr);
				
				
				var number = 0;
				if ( info["name"].startsWith("Untitled text") ){
					var number = parseInt( info["name"].substring("Untitled text".length+1));
					if (number > next_number_for_untitled_file)
						next_number_for_untitled_file = number;
					
				}
				

				
				
				
			}
			
			this.viewer.setUntitledCounter(next_number_for_untitled_file+1);
			
			
		}.bind(this);
		
		var callback_error =ViewerUtilis.showBSOD;
		
		
		
		QueryController.executeQuery({"allFiles": true}, callback_success, callback_error);
		
		
	}
	
	/**
   * Creates new file controller.
   * @param {object} info - Details about new file controller.
   * @param {boolean} notExistedBefore - If file not existed in database set to true.
   * @returns {ControllerFileBase} 
   */
	createNewFile(info, notExistedBefore) {
		
		var name = info["name"]
		var sizeInBits = info["sizeInBits"]
		var sizeOnDiskInBits = info["sizeOnDiskInBits"]
		var createdTimestamp = info["createdTimestamp"]
		var createdByName = info["createdByName"]
		var type = info["type"]
		
					
		if (notExistedBefore == true) {
			
			console.log(
				this.logger.push(true, name, "created")
			);
		
			
			var callback_success = this.const_callback_success.bind(this);
			var callback_error =  this.const_callback_error.bind(this);
			
			QueryController.executeQuery({"newFile":name, "createdTimestamp":createdTimestamp}, callback_success, callback_error);
			
			
			
		}
		
		switch(type) {
			

			case ViewerUtilis.CONST_FILE_TEXT:
			
				var infoExtra = {
						name: name,
						type: ViewerUtilis.CONST_FILE_TEXT,
						opens_with: ViewerUtilis.NOTEPAD_APPLICATION,
						location: "C:\/"+createdByName,
						size: sizeInBits,
						size_on_disk: sizeOnDiskInBits,
						created: createdTimestamp
					
				};
			
				 var new_file = new ControllerFileTXT(name, this);
				 new_file.initPropertiesController(infoExtra);
				 this.controllers[name] = new_file;
				 return new_file;
				
			default:
				return;
			
		}
		
	}
	
	/**
	 * Server query action: rename file controller.
	 * @param {string} oldName - Old name of the file controller.
	 * @param {string} newName - New name of the file controller.
	 * @returns {void} 
	 */
	renameFile(oldName, newName) {
		
			console.log(
				this.logger.push(true, oldName, "renamed to ["+newName+"]")
			);
		
		
			var callback_success = this.const_callback_success.bind(this);
			var callback_error =  this.const_callback_error.bind(this);
			
			
			QueryController.executeQuery({"renameFile":oldName, "newFileName": newName}, callback_success, callback_error);
			
		
	}
	/**
	 * Standard response to successful query.
	 * @param {string} response - Response from the server.
	 * @returns {void} 
	 */
	const_callback_success(response) {

			console.log(
				this.logger.push(false, response)
			);	
			
	}	
	/**
	* Standard response to unsuccessful query.
	* @param {string} response - Response from the server.
	* @returns {void} 
	*/	
	const_callback_error(response) {

			console.log(
				this.logger.push(false, response)
			);	
			this.viewer.showError(response);
	}		
	
		
	/**
	* Server query action: update file content.
	* @param {ControllerFileTXT} file_controller - file controller.
	* @returns {void} 
	*/
	
	updateContent(file_controller) {
		
		console.log(
			this.logger.push(true, file_controller.getName(), "edited")
		);
		
		var callback_success = this.const_callback_success.bind(this);
		var callback_error =  this.const_callback_error.bind(this);
			
		QueryController.executeQuery({"changeFile": file_controller.getName(), "content":file_controller.getModelContent()}, callback_success, callback_error);
		
		
	}
	

	
	
	/**
	* Server query action: delete file.
	* @param {ControllerFileTXT} file_controller - file controller.
	* @returns {void} 
	*/
	deleteFile(file_controller) {
		
		var callback_success = this.const_callback_success.bind(this);
		var callback_error =  this.const_callback_error.bind(this);
		
		
		QueryController.executeQuery({"deleteFile": file_controller.getName()}, callback_success, callback_error);
		
		
			
			
		delete this.controllers[file_controller.getName()];
			
		console.log(
			this.logger.push(true, file_controller.getName(), "deleted")
		);
		
		
	}
	


	/**
	* Frontend action: show file viewer.
	* @param {ControllerFileBase} file_controller - file controller.
	* @returns {void} 
	*/
	
	show(file_controller) {
		
		if ( file_controller.getViewer() == null ){
			this.viewer.show(file_controller);
			console.log(
				this.logger.push(true, file_controller.getName(), "opened")
			);	
			
		}
		
		
		
		
	}
	
	/**
	* Frontend action: remove file viewer.
	* @param {ControllerFileBase} file_controller - file controller.
	* @returns {void} 
	*/
	removeView(file_controller) {
		
		console.log(
			this.logger.push(true, file_controller.getName(), "closed")
		);
		
		this.viewer.removeView(file_controller);
	}
	







	/**
	* Logs off user and redirects user to the login page.
	* @returns {void} 
	*/
	logOff() {
		
		var callback_success = function() {	
			window.open("./login/login.php", "_self");
		}.bind(this);
		
		QueryController.executeQuery({"logout": true}, callback_success);
	
	}
	
	


	/**
	* Logs system error.
	* @param {string} desc - record description.
	* @returns {void} 
	*/
	logSystemError(desc) {
	
		
			console.log(
				this.logger.push_raw( "(SYSTEM)Error: " + desc + " at " + FunctionsFrontend.getTimeATM() + "." )
			);
		

	}
	
	
	
}



var WINDOWS_C = new ControllerPlatform();


    
