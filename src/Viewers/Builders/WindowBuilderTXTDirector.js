import WindowBuilder from "./WindowBuilder.js";
import ViewerUtilis from "../ViewerUtilis.js";
export default class WindowBuilderTXTDirector {

		/**
   * Makes textual window for editing textual files.
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
		builder.makeHeaderLeftPanelIcon(ViewerUtilis.ICON_TXT_FILE);
		builder.makeHeaderLeftPanelText();
		
		builder.makeHeaderRightPanel();
		builder.makeHeaderRightPanelMinBtn();
		builder.makeHeaderRightPanelMaxBtn();
		builder.makeHeaderRightPanelExitBtn();
		
		
		builder.makeWindowBody();
		builder.makeMenuFileOptionFilePanel();
		builder.makeMenuFile();
		
		builder.makeDomDraggable();
		
		return builder.buildDom();
	}
	
}