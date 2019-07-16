export default class File {
		

	 /**
   * Creates an instance of File.
   * @param {string} name - name.
   */
	constructor(name, type) {
		/**
		 * Name of the file.
		 * @type {string} - name.
		 * @public
		 */
		this.name = name;
		
		/**
		 * Type of the file.
		 * @type {integer}
		 * @public
		 */
		this.type = type;
	}
	 /**
   * Returns name.
   * @returns {string}
   */
	getName(){
		return this.name;
	}

			/**
   * Sets name.
	* @param {string} value - name.
   * @returns {void}
   */
  setName(value) {
	this.name = value;
	}


	/**
   * Sets type.
	* @param {integer} value - type.
   * @returns {void}
   */	
  	setType(value) {
		this.type = value;
	}

	/**
	 * Returns file type.
	 * @returns {integer}
	 */
	getType(){
		return this.type;
	}
	
}