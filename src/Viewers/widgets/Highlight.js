import ViewerIcon from "../ViewerIcon.js";
import ModuleBase from "./ModuleBase.js";

export default class Highlight extends ModuleBase {
	
	
	/**
	 *Creates an instance of Highlight.
	 * @param {*} params
	 */
	constructor(params) {
		super(params.highlightModule.viewer_as_arg,
		params.highlightModule.actionDependOn,
		params.highlightModule.actionResetModules);
			
			var params = params["highlightModule"];
			
			var callbacks = params["callbacks"];
			
			/**
			 * Get icons dictionary callback from viewer platform.
			 * @type {dictionary} 
			 * @public
			 */
			this.getIconsDictionary = callbacks["getIconsDictionary"];
			

			
			/**
			 * Track active searched by click.
			 * @type {ViewerIcon} 
			 * @public
			 */
			this.activeSearchedByClick = null;
		
			/**
			 * Track active searched by key.
			 * @type {object} 
			 * @public
			 */
			this.activeSearched = null;
			

			this.addHighlightFunctionality();
	}
	
	
	
	/**
	 * Returns activness of this module.
	 * @returns {boolean}
	 */	
	isActive() {
		return !!this.activeSearched;
	}
	

	
	/**
	 * Resets this module.
	 * @returns {void}
	 */	
	reset() {
		if (this.activeSearched != null) {
				
				this.activeSearched.d.getDom().style.background =  "none";		
				this.activeSearched = null;
			}
			
		if(this.activeSearchedByClick!= null) {
			
				this.activeSearchedByClick.style.background =  "none";		
				this.activeSearchedByClick = null;
		}
	}
		
	/*
	
		name: highlighIcon
		description:
			highlights argument icon
		returns:
			void
	
	*/

		
	/**
	 * Highlights icon.
	* @param {ViewerIcon} iconViewer - Viewer controller.
	* @param {boolean} byClick - if higlight was made by click otherwise is by key.
	 * @returns {void}
	 */	
	highlightIcon(iconViewer, byClick) {
		
		if (byClick) {
			this.activeSearchedByClick = iconViewer;
			var iconDom = iconViewer;
			iconDom.style.background =  "rgba(255, 255, 255, 0.45)";
		} else 
			iconViewer.getDom().style.background =  "rgba(255, 255, 255, 0.45)";
		
	}


		/**
	 * Unhighlights icon highlighted by key.
	* @param {ViewerIcon} iconViewer - Viewer controller.
	 * @returns {void}
	 */	
	unHighlightIcon(iconViewer) {
		
		iconViewer.getDom().style.background =  "none";
		
	}	
	

	
	
		/**
	 * Adds highlight functionality to the viewer platform.
	 * @returns {void}
	 */	
	addHighlightFunctionality() {
		
		document.addEventListener("keydown", function(e) {
			
			if ( this.checkDependency() == false )
				return;
			
			this.resetOtherModules();
			
			if(this.activeSearchedByClick!= null) {
			
				this.activeSearchedByClick.style.background =  "none";		
				this.activeSearchedByClick = null;
			}
			
			// if that key is Escape, simply unhighlight element and delete reference
			if(e.key === "Escape") {
				this.reset();
				return;
			}
			
			
			
		
			// first unhighlight active searched element but keep him in memory because...*
			
			if (this.activeSearched != null) {
				this.unHighlightIcon(this.activeSearched.d);
			}
			
				
		
			
			// if key is alfanumeric key \w stands for,
			// \s stands for
			// | stands for
			// /g stands for
			if(String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
				
				var found = false;
				
				// dictionary of icons
				var dictionary = this.getIconsDictionary();
				
				var keys = Object.keys(dictionary);
				
				// get upper case Ascii representation
				var str = String.fromCharCode(e.keyCode);
				
				
				
				var i = 0;
				
				// get the next one in dictionary
				if (this.activeSearched != null) {
					
					if ( this.activeSearched.number+1 <= keys.length ) {
							i = this.activeSearched.number+1;
					}
					
				}
				
					
				var i_starts_with = i;
				for (; i < keys.length; ++i ) {
					
					var key = keys[i];
				
					if (key.toUpperCase().startsWith(str) ) {
						
						var viewerIcon = dictionary[key];
						
						this.highlightIcon(viewerIcon);
						this.activeSearched = { k: key, d: viewerIcon, number: i};
						found = true;
						break;
						
					}
					
				}
				
				
				if (!found && i_starts_with != 0) {
					
					
					for (var i = 0; i < this.activeSearched.number; ++i ) {
						var key = keys[i];
					
						
						if (key.toUpperCase().startsWith(str) ) {
							
							
							var viewerIcon = dictionary[key];
							
							this.highlightIcon(viewerIcon);
							this.activeSearched = { k: key, d: viewerIcon, number: i};
							
							found = true;
							break;
							
						}
						
					}
					
				}
				
				
				
				if (!found) 
					this.activeSearched = null;
					
				
				
			}
			
			
		
			
			
		
		}.bind(this), false);
	}
	
	
}