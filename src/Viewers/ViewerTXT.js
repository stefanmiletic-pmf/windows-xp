import ViewerBase from './ViewerBase.js';
import WindowBuilderTXTDirector from './Builders/WindowBuilderTXTDirector.js';
import ControllerFileTXT from '../Controllers/ControllerFileTXT.js';

export default class ViewerTXT extends ViewerBase{
	
	
	/**
	 *Creates an instance of ViewerTXT.
	 * @param {ControllerFileTXT} file_controller
	 * @param {string} user_priv
	 * @param {object} modules
	 * @param {integer} posX
	 * @param {integer} posY
	 * @param {integer} sizeX
	 * @param {integer} sizeY
	 */
	constructor(file_controller, user_priv, modules, posX, posY, sizeX, sizeY) {
		
		super(WindowBuilderTXTDirector, file_controller, user_priv, modules, posX, posY, sizeX, sizeY);
		
		
		
		
		this.setupBodyforTxTInput();
		
		
		
	}
	
	/**
	 * Setups body for text input.
	 * @returns {DOM}
	 */
	setupBodyforTxTInput() {
		
		var textArea = document.createElement("textarea");
		textArea.className = "body-txt";
		textArea.value = this.file_controller.getModelContent();
		
		
		textArea.addEventListener("keydown", function(e) {
			
			
			e.stopPropagation();
			
		},true);
		
		this.domBody.appendChild(textArea);
		
		
	}
	


	
}