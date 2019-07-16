import WindowBuilder from "./WindowBuilder.js";
import ViewerUtilis from "../ViewerUtilis.js";
import TaskbarModule from "../widgets/TaskbarModule.js";
export default class WindowBuilderFilePropertiesDirector {
	
	/**
   * Makes Properties window.
	* @param {ControllerFileBase} file_controller - Controller for which properties window is building.
	* @param {string} user_priv - User privilege.
	* @param {TaskbarModule} taskbarModule - Taskbar module.
  * @returns {WindowBuilder}
   */
	static 
	build(file_controller, user_priv, taskbarModule) {
		
		var builder = new WindowBuilder(file_controller, user_priv, taskbarModule);
		builder.makeHeaderBase();
		builder.makeHeaderLeftPanel();
		builder.makeHeaderLeftPanelText(file_controller.getName());
		
		builder.makeHeaderRightPanel();
		builder.makeHeaderRightPanelExitBtn();
		
		
		builder.makeWindowBody();
		
		builder.makeDomDraggable();
		
		return builder.buildDom();
	}
	
}