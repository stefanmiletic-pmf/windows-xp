import ModuleBase from "./ModuleBase.js";

export default class RenamingModule extends ModuleBase{
	
		/**
		 *Creates an instance of RenamingModule.
		 * @param {*} params
		 */
		constructor(params) {
			super(params.renamingModule.viewer_as_arg,
			params.renamingModule.actionDependOn,
			params.renamingModule.actionResetModules);
			
			var params = params["renamingModule"];
			
		
	
			var callbacks = params["callbacks"];
			
			/**
			 * Logs system error.
			 * @type {function} 
			 * @public
			 */
			this.logSystemError = callbacks["logSystemError"];
			
			/**
			 * Selected icon at the moment.
			 * @type {function} 
			 * @public
			 */
			this.selectedIcon = null;
			
			/**
			 * Renaming active indicator.
			 * @type {function} 
			 * @public
			 */
			this.renamingActive = false;
			
		}
			
		/**
		 * Returns activness of this module.
		 * @returns {boolean}
		 */	
		isActive() {
			return this.renamingActive;
		}
		
		/**
		 * Sets renaming module.
		 * @param {boolean} isOn - Indicator if renaming is active.
		 * @param {ViewerIcon} selectedIcon - Viewer icon on which renaming is active.
		 * @returns {void}
		 */	
		setActive(isOn, selectedIcon) {
			
			this.selectedIcon = selectedIcon;
			this.renamingActive = isOn;
		}
	
	
		/**
	 * Resets this module.
	 * @returns {void}
	 */	
		reset() {
			
			if ( ( !!this.selectedIcon && this.renamingActive )
				!= ( !!this.selectedIcon || this.renamingActive ) ) {
				
					this.logSystemError("RenamingModule::reset");
					return;
				}
			

			if ( this.selectedIcon ) {
				
				this.selectedIcon.stopRenaming();
				this.selectedIcon = null;
				this.renamingActive = false;
			}
			
			
		}
		
		
			/**
		 * Stops renaming.
		 * @returns {void}
		 */	
		stopRenaming(){
			this.reset();
		}
	
	
}