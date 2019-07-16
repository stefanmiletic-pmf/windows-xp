import ControllerProperties from './ControllerProperties.js';
import ControllerPlatform from './ControllerPlatform.js';
import ControllerFileBase from './ControllerFileBase.js';
import FileText from '../Models/FileText.js';
import ViewerUtilis from '../Viewers/ViewerUtilis.js';

export default class ControllerFileTXT extends ControllerFileBase{
	



	/**
   * Creates an instance of ControllerFileTXT.
   */
	constructor(name, parent_controller) {
		
		super(ViewerUtilis.CONST_FILE_TEXT, ViewerUtilis.CONST_FILE_TEXT,  new FileText(name)) 

		  /**
		   * Parent controller.
		 * @type {ControllerPlatform}
		 * @public
		 */
		this.parent_controller = parent_controller;
		
		
		  /**
		   * Controller properties.
		 * @type {ControllerProperties}
		 * @public
		 */
		this.cntr_properties = null;
		
		
 		
	}
	

		
	/**
	 *
	 *	Inits properties for this file controller.
	 * @param {object} details
	 * @returns {void} 
	 */
	initPropertiesController(details) {
		
		this.cntr_properties = new ControllerProperties(this, details, this.parent_controller.user_priv);
	}
	/**
   * Calls remove view action for the properties controller on parent.
   * @returns {void} 
   */
	removePropertiesView() {
		this.parent_controller.removeView(this.cntr_properties);
	}
	
	/**
   * Calls show action for the properties controller on parent.
   * @returns {void} 
   */
	showPropertiesView() {
		
		this.parent_controller.show(this.cntr_properties);
	}

		
	/**
   * Renames model and call rename action on parent.
   *  @param {string} value - new name.
   * @returns {void} 
   */
	
	rename(value) {
		
		
		
			
			
		
		var oldName = this.model.name;
		var newName = value;
		
		this.model.name = value;
		
		this.cntr_properties.setName(newName);
		
		this.parent_controller.renameFile(oldName, newName);
		
		
	}
			
	/**
   * Calls show action on parent.
   * @returns {void} 
   */
	show() {
		
		this.parent_controller.show(this);
	}
	


	/**
   * Returns content of the file.
   * @returns {string} 
   */
	getModelContent() {
		return this.model.content;		
	}

	/**
   * Updates model, properties and call save action on parent.
   * @returns {void} 
   */
	save() {	
	
	
			var content = this.viewer.domBody.getElementsByClassName("body-txt")[0].value;
			////console.log("content: " +content);
			
			this.model.content = content;
			
			var size_in_bits = content.length * 8;
			
			this.cntr_properties.setSize(size_in_bits);
			
			this.parent_controller.updateContent(this);
			
			
	}

	/**
   * Returns properties's controller.
   * @returns {ControllerProperties} 
   */
	getFileProperties() {
		
		return this.cntr_properties;
		
	}

	/**
	 * Inits content.
	 * @param {string} value - Content. 
	 * @returns {void} 
	 */
	initContent(value) {
		
		
		this.model.content = value;
		
	}

	/**
   * Calls delete file action on parent.
   * @returns {void} 
   */
	deleteFile() {
		
		
		this.parent_controller.deleteFile(this);
		
		
	}
		/**
   * Calls remove view action on parent.
   * @returns {void} 
   */
	removeView() {
		
		
		this.parent_controller.removeView(this);
		
	}
	
}

