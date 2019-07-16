import ViewerPlatform from "../ViewerPlatform.js";

export default class ModuleBase {

    /**
	 *Creates an instance of ModuleBase.
	 * @param {ViewerPlatform} viewerPlatform
	 * @param {Array} actionDependOn
	 * @param {Array} actionResetModules
	 */
	constructor(viewerPlatform, actionDependOn, actionResetModules) {


        /**
		 * Viewer platform.
		 * @type {Array} 
		 * @public
		 */
		this.viewer_as_arg = viewerPlatform;
	
        	/**
		 * Modules on which this module depens.
		 * @type {Array} 
		 * @public
		 */
		this.actionDependOn = actionDependOn;
		/**
		 * Modules which will be reseted on this module's action.
		 * @type {Array} 
		 * @public
		 */
		this.actionResetModules = actionResetModules;
		
		
	}
	
	
	/**
	 * Checks activness of modules on which this module depends.
	 * @returns {boolean}
	 */	
	checkDependency() {
		return this.viewer_as_arg.checkDependency(this.actionDependOn);
	}
	
	
	/**
	 * Resets modules on which this module doesn't depends.
	 * @returns {void}
	 */	
	resetOtherModules() {
		this.viewer_as_arg.resetConcreteModules(this.actionResetModules);
	}

	


}