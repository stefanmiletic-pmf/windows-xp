import ViewerBase from "../Viewers/ViewerBase.js";

export default class ControllerFileBase {


    
	 /**
   * Creates an instance of ControllerFileBase.
   * @param {integer} type -Type of the file this controller hold.
   * @param {File} model - File model this controller represents.
   */
	constructor(type, fileType, model) {

		  /**
		   * Controller's type.
		 * @type {integer}
		 * @public
		 */
		this.type = type;
		
		 /**
		   * Controller's file type.
		 * @type {integer}
		 * @public
		 */
		this.fileType = fileType;
        
        
		  /**
		   * Model.
		 * @type {File}
		 * @public
		 */
		this.model = model;


		 /**
		   * Viewer.
		 * @type {object}
		 * @public
		 */
		this.viewer = null;

    }
	
	/**
   * Returns controller's type.
   * @returns {integer} 
   */
	
 	getType() {
    	return this.type;
    }

	/**
	 * Returns controller's file type.
	 * @returns {integer} 
	 */
	
 	 getFileType() {
		return this.fileType;
	}
    
    
	/**
	 * Returns name.
	 * @returns {string} 
	 */
	getName(){
		return this.model.name;
    }
    
    		
	/**
	 *  Sets name for controller's model.
	 * @param {string} value - name.
	 * @returns {void}
	 */
	setName(value) {
		this.model.setName(value);
	}
	


    		
	/**
	   * Sets viewer.
  	 * @param {ViewerBase} viewer - viewer.
  	 * @returns {void}
   */
	
	setViewer(viewer) {
		this.viewer = viewer;
	}
	/**
	 * Returns viewer.
	 * @returns {ViewerBase} 
	 */	
	getViewer() {
		return this.viewer;
    }
    
  



}