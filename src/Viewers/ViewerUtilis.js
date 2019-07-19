export var zIndex = 10;
var domWithTheHighestZIndex = null;

/**
   * Returns next z index.
   * @returns {integer}
   */
export var getZindex = function(dom) {
	domWithTheHighestZIndex = dom;
	zIndex +=1;
	return zIndex;
}

export var getCurrentZIndex = function() {
	return zIndex;
}


/**
   * Returns dom with the highest z index.
   * @returns {integer}
   */
export var getDomWithHighestZIndex = function() {
	return domWithTheHighestZIndex;
}


export default class ViewerUtilis {
	
	// programs
	static get NOTEPAD_APPLICATION() { return 1; }
	
	
	static get IMAGE_BACKGROUND(){ return "Utilis/images/background.jpg"; }
	
	static get CONST_FILE_PROPERTIES() { return 0; }
	static get CONST_FILE_FOLDER() { return 1; }
	static get CONST_FILE_TEXT() { return 2; }

	
	static get  ICON_TASK_BAR(){ return "Utilis/images/task-bar.png"; }

	static get  ICON_FOLDER(){ return "Utilis/images/FOLDER.png"; }
	static get  ICON_TXT_FILE(){ return "Utilis/images/file-txt-icon.png"; }
	static get  ICON_CONFIG_FILE(){ return "Utilis/images/file-config-icon.png"; }
	

	static get  TEXTURE_HEADBAR(){ return "Utilis/images/WINDOW_HEADER_BAR.png"; }

	static get  FLAG_RESIZE_MAX(){ return 1; }
	static get  FLAG_RESIZE_MIN(){ return 2; }
	
	static get  CONST_PROPERTIES_SIZE_X(){ return 293; }
	static get  CONST_PROPERTIES_SIZE_Y(){ return 351; }
	
	static get  CONST_FILE_SIZE_X(){ return screen.width/3; }
	static get  CONST_FILE_SIZE_Y(){ return 330; }

	static get  CONST_POSITION_X(){ return 100; }
	static get  CONST_POSITION_Y(){ return 100; }

	
	

	
	/**
	 * Shows BSOD.
	 * @returns {void}
	 */
	static showBSOD() {
		
			document.body.innerHTML = "";
			var bsod = document.createElement("div")
			bsod.className = "bsod"
			document.body.appendChild(bsod)
			console.log("BLUE SCREEN OF DEATH")
		
		
	}
		

	/**
	 * Checks if dom is visible.
	 * @param {DOM} dom - Dom.
	 * @returns {boolean}
	 */
	static
	checkIfDomIsVisible(dom) {
		
		return dom.style.visibility == "" ||
				dom.style.visibility == "visible";
		
	}
	
	
	/**
	 * Returns extension for the type.
	 * @param {integer} type - const identifier.
	 * @returns {string}
	 */
	static
	getExtension(type) {
		switch(type) {
			
			case ViewerUtilis.CONST_FILE_TEXT:
				return "txt";
			default:
				console.log("kukaj");
				return;
			
		}
	}
	
}
