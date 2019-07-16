import ViewerUtilis from './ViewerUtilis.js';
import WindowBuilder from './Builders/WindowBuilder.js';
import ControllerFileBase from '../Controllers/ControllerFileBase.js';

export default class ViewerBase {
	
	
	/**
	 *Creates an instance of ViewerBase.
	 * @param {WindowBuilder} builder
	 * @param {ControllerFileBase} file_controller
	 * @param {string} user_priv
	 * @param {object} modules
	 * @param {integer} posX
	 * @param {integer} posY
	 * @param {integer} sizeX
	 * @param {integer} sizeY
	 */
	constructor(builder, file_controller, user_priv, modules, posX, posY, sizeX, sizeY) {
		/**
		 * File controller.
		 * @type {ControllerFileBase} 
		 * @public
		 */
		this.file_controller = file_controller;
		/**
		 * Type identificator.
		 * @type {integer} 
		 * @public
		 */
		this.type = this.file_controller.getType();

		/**
		 * Left upper x coord.
		 * @type {integer} 
		 * @public
		 */
		this.posX = posX;
		/**
		 * Left upper y coord.
		 * @type {integer} 
		 * @public
		 */
		this.posY = posY;

		/**
		 * Window width.
		 * @type {integer} 
		 * @public
		 */
		this.sizeX = sizeX;

		/**
		 * Window height.
		 * @type {integer} 
		 * @public
		 */
		this.sizeY = sizeY;
		
		var taskbarModule = modules["taskbarModule"];
		var result = builder.build(file_controller, user_priv, taskbarModule);
		
		/**
		 * Window dom.
		 * @type {integer} 
		 * @public
		 */
		this.dom = result.dom;
		/**
		 * Window body dom.
		 * @type {integer} 
		 * @public
		 */
		this.domBody = result.windowBody;
		
		this.dom.style.left = posX+"px";
		this.dom.style.top = posY+"px";
		this.dom.style.width = sizeX + "px";
		this.dom.style.height = sizeY + "px";
		
		
		
	}
	
	/**
	 *
	 * Returns DOM.
	 * @returns {DOM}
	 */
	getDom() {
		return this.dom;
	}
	
	
}