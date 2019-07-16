import FunctionsFrontend from "../../Utilis/FunctionsFrontend.js";
import QueryController from "../../Utilis/QueryController.js";
import {getZindex} from "../ViewerUtilis.js";
import ModuleBase from "./ModuleBase.js";

export default class TaskbarModule extends ModuleBase{
	
	/**
	 *Creates an instance of TaskbarModule.
	 * @param {*} params
	 */
	constructor(params) {
		super(params.taskbarModule.viewer_as_arg,
		params.taskbarModule.actionDependOn,
		params.taskbarModule.actionResetModules);
		
		var params = params.taskbarModule;
		
		var callbacks = params["callbacks"];
		/**
		 * Appends child to the viewer platform.
		 * @type {function} 
		 * @public
		 */
		this.appendChildCustom = callbacks["appendChildCustom"];
		/**
		 * Gets user name.
		 * @type {function} 
		 * @public
		 */
		this.getUserName = callbacks["getUserName"];
		/**
		 * Logs off user.
		 * @type {function} 
		 * @public
		 */
		this.logOff = callbacks["logOff"];
		/**
		 * Gets system logger.
		 * @type {function} 
		 * @public
		 */
		this.getLogger = callbacks["getLogger"];
		
		/**
		 * Taskbar dom.
		 * @type {DOM} 
		 * @public
		 */
		this.taskbar = null;
			
		/**
		 * Tasks in taskbar.
		 * @type {dictionary} 
		 * @public
		 */
		this.tasks = {};
		/**
		 * Currently active tasks in taskbar.
		 * @type {DOM} 
		 * @public
		 */
		this.currentlyActive = null;

		/**
		 * Currently active tasks in taskbar.
		 * @type {DOM} 
		 * @public
		 */
		this.taskbarList = null;
		
		this.initTaskBarView();
	}
	

	/**
	 * Creates taskbar.
	 * @returns {void}
	 */	
	initTaskBarView() {
		
		
		
		this.taskbar = document.createElement("div");
		this.taskbar.className = "taskbar";
		
		this.taskbarList = document.createElement("div");
		this.taskbarList.className = "taskbarList";
		
		this.taskbar.appendChild(this.taskbarList);
		
		var clock = this.createClock();
		this.taskbar.appendChild(clock);
		
		var start_btn = document.createElement("div");
		start_btn.className = "taskbar-btn-start";
		this.taskbar.appendChild(start_btn);
		
		
		var start_menu = this.createMenu(start_btn);
		
		var generators = [{name: "Session report", callback: this.pdf_session_report_generator_callback.bind(this)}];
		
		if ( this.getUserName() == "admin" ) {
			
			generators.push({
				
				name: "System report", 
				callback: this.pdf_system_report_generator_callback.bind(this)
				
			});
			
		}
		
		this.appendGeneratorsIcons(generators, start_menu);
		
		
		
		this.appendChildCustom(start_menu);
		this.appendChildCustom(this.taskbar);
		
	}

	/**
	 * Creates start menu.
	 * @param {DOM} start_btn - Start button dom.
	 * @returns {void}
	 */	
	
	createMenu(start_btn) {
		
		var viewer_as_arg = this;
		
		var menu = document.createElement("div");
		menu.className = "main-menu";
		
		var user_name = document.createElement("span");
		user_name.className = "main-menu-user-name";
		user_name.innerHTML = this.getUserName();
		
		var btn_log_off = document.createElement("div");
		btn_log_off.className = "main-menu-log-off";
		
		btn_log_off.addEventListener("click", function() {
			
			this.logOff();
			
		}.bind(this));
		
		menu.appendChild(user_name);
		menu.appendChild(btn_log_off);
		
		
			
		start_btn.addEventListener("click", function(e) {
			
			if (menu.style.visibility == "visible")
				menu.style.visibility = "hidden";
			else
				menu.style.visibility = "visible";
			
			e.stopPropagation();
			
		}, true);
		
		
		return menu;
		
	}
	
	
	/**
	 * Returns activness of this module.
	 * @returns {boolean}
	 */	
	isActive() {
		return false;
	}
	

	/**
	 * Resets this module.
	 * @returns {void}
	 */	
	reset() {
		
	}
	
	
	/**
	 * Adds task to the taskbar.
	 * @param {string} name - name of the task.
	 * @returns {void}
	 */	
	addTask(name) {
		this.makeCurrentlyActiveTaskUnActive();
		
		var task = document.createElement("div");
		this.currentlyActive = task;
		task.className = "task activeTask";
		this.tasks[name] = task;
		
		var taskIcon = document.createElement("div");
		taskIcon.className = "taskIcon";
		
		var taskTitle = document.createElement("div");
		taskTitle.className = "taskTitle";
		taskTitle.innerHTML = name;
		
		
		task.addEventListener("click", function() {
			this.switchActiveTaskTo(name);
			document.getElementById(name).style.zIndex = getZindex();
			
		}.bind(this));
		
		
		task.appendChild(taskIcon);
		task.appendChild(taskTitle);
		this.taskbarList.appendChild(task);
		
	}
	
	
	/**
	 * Removes task from the taskbar.
	 * @param {string} name - name of the task.
	 * @returns {void}
	 */	
	removeTask(name) { 
		
		var dom = this.tasks[name];
		this.taskbarList.removeChild(dom);
		delete this.tasks[name];
		
	}
		
	/**
	 * Makes currently active task in the taskbar unactive.
	 * @returns {void}
	 */
	makeCurrentlyActiveTaskUnActive() {
		
		if ( !this.currentlyActive)
			return;
		
		var task = this.currentlyActive;
		var class_name = task.className;
		class_name = class_name.replace("activeTask", "");
		task.className = class_name
		this.currentlyActive = null;
	}


	 /**
	 * Creates start menu.
	 * @param {string} name - Name of the tast to be switched to.
	 * @returns {void}
	 */	
	switchActiveTaskTo(name) {
		
		this.makeCurrentlyActiveTaskUnActive();
		this.tasks[name].className += "activeTask";
		this.currentlyActive = this.tasks[name];
		
	}

	/**
	 * Returns if the currently active task having the name.
	 * @param {string} name - name of the task.
	 * @returns {boolean}
	 */
	checkIfWindowIsCurrentlyActive(name) {
		return this.tasks[name] == this.currentlyActive;
	}

	/**
	 * Appends report generator icons.
	 * @param {Array} _generator_array - Generators array.
	 * @param {DOM} start_menu - Start menu dom.
	 * @returns {void}
	 */	
	appendGeneratorsIcons(_generator_array, start_menu) {
		
		
		for(var i=0;i <_generator_array.length; ++i) {
			
			var _generator = _generator_array[i];
			var name = _generator.name;
			var callback = _generator.callback;
			
			
			var icon_file = document.createElement("div");
			icon_file.className = "generator_icon " + name.split(" ")[0].toLowerCase() + "_report " + "pdf-generator-icon";
			
			var icon_txt = document.createElement("h4");
			icon_txt.className = "txt-icon-title";
			icon_txt.innerHTML = name;
			
			icon_file.addEventListener("click", function() {
				
				
				//console.log("cliick generator");
				//console.log(this.callback);
				
				this.callback();
				
			}.bind({callback: callback}), true);
			
			icon_file.appendChild(icon_txt);
			
			start_menu.appendChild(icon_file);
			
			
		}
		
		
		
	}	
	
	/**
	 * Pdf system report callback.
	 * @returns {void}
	 */
	pdf_system_report_generator_callback() {
		
		var callback_success = function(response){
			
			
			//console.log(response);
			
			var response = JSON.parse(response);
			var reportArray = [];
			for ( var i=0; i < response.length; ++i) {
				
				
				var node = response[i];
				
				var record_desc = node["record"];
				var createdBy = node["createdBy"];
				var time = FunctionsFrontend.getTimeATMForSystemLogRecord(node["timestamp"]);
				
				
				var record = time + " | " + record_desc;
				
				if (record.length > 69) {
					for (var j = 0; j < record.length; j+=69) {
							var end = Math.min(j+69, record.length);
							reportArray.push(record.substring(j, end));
							
						}
						
				} else {
					reportArray.push(record);
				
				}
				
				 reportArray.push("Action by: " + createdBy + ".");
			}
			
			
		
			var doc = new jsPDF()
			
			
			
			doc.text(reportArray,20, 20);
			
			
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			
			var time = dd + '-' + mm + '-' + yyyy;
					
			
			
			doc.save(this.getUserName() + '-system-report-' + time + '.pdf');
			
		}.bind(this);
		var callback_error = function(response){
			
			console.log("ERROR REPORTING SYSTEM LOG");
		};
		
		QueryController.executeQuery({"getSystemLog": true}, callback_success, callback_error);
		
	}
	
	/**
	 * Pdf session report callback.
	 * @returns {void}
	 */
	pdf_session_report_generator_callback() {
	
		
		var doc = new jsPDF()
		
		
		
		doc.text(this.getLogger().generate_array_of_strings(),20, 20);
		
		
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		
		var time = dd + '-' + mm + '-' + yyyy;
				
		
		
		doc.save(this.getUserName() + '-session-report-' + time + '.pdf');
		
	}

	/**
	 * Creates clock.
	 * @returns {void}
	 */
	createClock() {
		
		var clockDOM = document.createElement("clock");
		clockDOM.className = "clock";
		clockDOM.innerHTML = FunctionsFrontend.getTimeATMForTheClock();
		return clockDOM;
		
	}
	
	
}