
import File from './File.js';

export default class FileProperties extends File{
	
	 /**
   * Creates an instance of FileProperties.
   * @param {string} details - details.
   */
	constructor(details) {
		super(details.name, details.type);
		

		/**
		 * Opens with which application.
		 * @type {integer}
		 * @public
		 */
		this.opens_with = details.opens_with;


		/**
		 * Location on the disk of this file.
		 * @type {string}
		 * @public
		 */
		this.location = details.location


		/**
		 * Size in bits of the file.
		 * @type {BigInt}
		 * @public
		 */
		this.size = details.size;


		/**
		 * Size on disk in bits of the file.
		 * @type {BigInt}
		 * @public
		 */
		this.size_on_disk = details.size_on_disk;


		/**
		 * Timestamp when this file created.
		 * @type {BigInt}
		 * @public
		 */
		this.created = details.created;

		
		
	}

	


	
   
		
							/**
   * Returns opens with indentifier.
   * @returns {integer}
   */		
		
	getOpensWith() {
		return this.opens_with;
	}
			/**
   * Sets opens with.
	* @param {integer} value - const indentifier.
   * @returns {void}
   */					
	setOpensWith(value) {
		this.opens_with = value;
	}
		
							/**
   * Returns location.
   * @returns {string}
   */	
	getLocation() {
		return this.location;
	}	
	
			/**
   * Sets location.
	* @param {string} value - location.
   * @returns {void}
   */	
	setLocation(value) {
		this.location = value;
	}
	
							/**
   * Returns size in bits.
   * @returns {BigInt}
   */			
	getSize() {
		return this.size;
	}	
	
				/**
   * Sets size in bits.
	* @param {string} value - size in bits.
   * @returns {void}
   */	
	setSize(value) {
		this.size = value;
	}
	
							/**
   * Returns size on disk in bits.
   * @returns {BigInt}
   */		
	getSizeOnDisk() {
		return this.size_on_disk;
	}	
	
				/**
   * Sets size on disk in bits.
	* @param {string} value - size on disk in bits.
   * @returns {void}
   */	
	setSizeOnDisk(value) {
		this.size_on_disk = value;
	}
	
					/**
   * Returns created timestamp.
   * @returns {BigInt}
   */			
	getCreated() {
		return this.created;
	}	
	
					/**
   * Sets created timestamp.
	* @param {BigInt} value - timestamp.
   * @returns {void}
   */
	setCreated(value) {
		this.created = value;
	}
	
					
	
	
}
