import File from './File.js';
import ViewerUtilis from '../Viewers/ViewerUtilis.js';

export default class FileText extends File{
	
	 /**
   * Creates an instance of TxtFile.
   * @param {string} name - name.
   */
	constructor(name) {
			super(name, ViewerUtilis.CONST_FILE_TEXT);

		/**
		 * Content of the file.
		 * @type {string} 
		 * @public
		 */
			this.content = "";
	}
		

	
	
	
}
