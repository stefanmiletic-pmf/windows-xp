import ViewerUtilis from '../Viewers/ViewerUtilis.js';
//import ViewerTXT from './Viewers/ViewerTXT.js';
import FileProperties from '../Models/FileProperties.js';
import FunctionsFrontend from '../Utilis/FunctionsFrontend.js';
import ControllerFileTXT from './ControllerFileTXT.js';
import ControllerFileBase from './ControllerFileBase.js';

export default class ControllerProperties extends ControllerFileBase{
	
	 /**
   * Creates an instance of ControllerProperties.
   * @param {ControllerFileTXT} file_controller - file controller for which properties are created..
   * @param {object} details - details for file controller.
   */
	
	constructor(file_controller, details) {
		super(ViewerUtilis.CONST_FILE_PROPERTIES, file_controller.getFileType(), new FileProperties(details));

		 /**
		 * File controller.
		 * @type {ControllerFileTXT}
		 * @public
		 */
		this.file_controller = file_controller;


 		
	}



		
	/**
   * Removes controller's viewer.
   * @returns {void}
   */	
	removeView() {
		this.file_controller.removePropertiesView();
		
	}
	


	/**
   * Returns name of controller.
   * @returns {string}
   */
	getName(){
		
		
		var type_name = ".";
		var type = this.getFileType();
		switch(type) {
			
			case ViewerUtilis.CONST_FILE_TEXT:
				type_name += "txt";
				break;
			default:
				console.log("BUG");
				return;
			
		}
		
		return this.model.name + type_name + " Properties";
	}
	

	
	/**
   *  Returns name of the file this controller properties represents.
   * @returns {string}
   */
	getFileName() {
		return this.model.getName();
	}	

	

	/**
   *  Sets type for controller's model.
   * @param {string} value - type.
   * @returns {void}
   */	
	setType(value) {
		this.model.setType(value);
	}
		
	/**
   *  Returns opensWith propertie from controller's model.
   * @returns {integer} - const identifier.
   */	
		
	getOpensWith() {
		return this.model.getOpensWith();
	}
	
	/**
   *  Sets opensWith propertie for controller's model.
   * @param {string} value - opensWith.
   * @returns {void}
   */					
	setOpensWith(value) {
		this.model.setOpensWith(value);
	}
		
	/**
   *  Returns location propertie from controller's model.
   * @returns {string}
   */	
	getLocation() {
		return this.model.getLocation();
	}
	/**
   *  Sets location propertie for controller's model.
   * @param {string} value - location.
   * @returns {void}
   */		
	setLocation(value) {
		this.model.setLocation(value);
	}
	
	/**
   *  Returns formated size propertie from controller's model.
   * @returns {string}
   */	
	getSize() {
		
		var size = this.model.getSize();
		
		
		return (size/8/1024).toFixed(1) + " KB(" + (size/8).toFixed(1) + " bytes)";
	}
	
		/**
   *  Sets size propertie for controller's model.
   * @param {BigInt} valueBits - size in bits.
   * @returns {void}
   */
	setSize(valueBits) {
		this.model.setSize(valueBits);
		this.setSizeOnDisk(valueBits+200);
	}
	
			/**
   *  Returns formated sizeOnDisk propertie from controller's model.
   * @returns {string}
   */	
	getSizeOnDisk() {
		var size = this.model.getSizeOnDisk();
		
		
		
		return (size/8/1024).toFixed(1) + " KB(" + (size/8).toFixed(1) + " bytes)";
	}	
	
		/**
   *  Sets size on disk propertie for controller's model.
   * @param {BigInt} valueBits - size in bits.
   * @returns {void}
   */
	setSizeOnDisk(valueBits) {
		this.model.setSizeOnDisk(valueBits);
	}
	
	/**
   *  Returns formated time when file is created.
   * @returns {string}
   */			
	getCreated() {
		return FunctionsFrontend.getTimeATMformatProperties(this.model.getCreated());
	}
	
		/**
   *  Sets time when file is created.
   * @param {BigInt} value - timespamt.
   * @returns {void}
   */
	setCreated(value) {
		this.setCreated(value);
	}
	
	
}

