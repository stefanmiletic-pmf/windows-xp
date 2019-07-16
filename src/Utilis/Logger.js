import FunctionsFrontend from "./FunctionsFrontend.js";

export default class Logger {
	
	
	 /**
   * creates a instance of Logger.
   */
	constructor(name) {
			/**
		 * Logged actions.
		 * @type {Array} 
		 * @public
		 */
		this.logActions = [];
		this.setName(name);
	}
	
	/**
   * Sets name.
	* @param {string} name - name.
   * @returns {void}
   */	
	setName(name) {
			/**
		 * User for which actions are logged.
		 * @type {Array} 
		 * @public
		 */
		this.user_name = name;
	}

	/**
   * Push raw log record.
	* @param {string} text - record.
   * @returns {string} - formated record.
   */
	push_raw(text) {
		
		this.logActions.push(FunctionsFrontend.getTimeATMForLogRecord() + " | FRONTEND: " + text);
		return text + ".";
	}
	

		/**
   * Push log record.
	* @param {boolean} isFrontend - is front or back end record.
	* @param {string} what - file on which action happend.
	* @param {string} action - which action happend.
   * @returns {string} - formated record.
   */
	push(isFrontend, what, action) {
		var formated
		if (isFrontend)
			formated = Logger.formatFrontendRecord(what, action)
		else 
			formated = Logger.formatBackendRecord(what)
		this.logActions.push(formated);
		return formated;
	}
	
		/**
   * Format log record.
	* @param {string} text - log record.
	 * @returns {string} - formated record.
   */
	static 
	formatBackendRecord(text) {
		
		
		if ( text.startsWith("Error") ) 
			text = text.substring("Error: ".length);
		else if ( text.startsWith("Successful") )
			text = text.substring("Successful: ".length);
			
		
		return FunctionsFrontend.getTimeATMForLogRecord() + " | BACKEND: " + text + ".";
		
	}
	/**
   * Format log record for frontend.
	* @param {string} file - file on which action happend.
	* @param {string} action - which action happend.
   * @returns {string} - formated record.
   */
	static 
	formatFrontendRecord(file, action) {
		
		
		return FunctionsFrontend.getTimeATMForLogRecord() + " | FRONTEND: File ["+file+"] is " + action + ".";
		
		
	}
			/**
   * Returns array of log records.
  * @returns {Array} - generated array of log records.
   */
	generate_array_of_strings() {
		
		
							
		var array_result = [];
		
		array_result.push(FunctionsFrontend.getTimeATM());
		array_result.push("");
		array_result.push("");
		array_result.push("Windows XP report for '" + this.user_name + "'");
		array_result.push("");
		
		
		array_result.push("Actions: ");
		
		for (var i = 0; i < this.logActions.length; ++i) {
			
				var record = this.logActions[i];
				if (record.length > 65) {
					for (var j = 0; j < record.length; j+=65) {
							var start = j;
							var end = Math.min(j+65, record.length);
							array_result.push(record.substring(j, end));
							
						}
						
				} else {
					array_result.push(record);
				}
		}
		
		return array_result;
		
	}
	
	
}