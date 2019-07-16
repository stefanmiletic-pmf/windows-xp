import ViewerBase from './ViewerBase.js';
import ViewerUtilis from './ViewerUtilis.js';
import WindowBuilderFilePropertiesDirector from './Builders/WindowBuilderFilePropertiesDirector.js';
import ControllerFileBase from '../Controllers/ControllerFileBase.js';

export default class ViewerProperties extends ViewerBase{
	
	
	/**
	 *Creates an instance of ViewerProperties.
	 * @param {ControllerProperties} file_controller
	 * @param {string} user_priv
	 * @param {object} modules
	 * @param {integer} posX
	 * @param {integer} posY
	 * @param {integer} sizeX
	 * @param {integer} sizeY
	 */
	constructor(file_controller, user_priv, modules, posX, posY, sizeX, sizeY) {
		
		super(WindowBuilderFilePropertiesDirector, file_controller,  user_priv,modules, posX, posY, sizeX, sizeY);
		
		
		
		this.setupBodyforDetailsPreview(user_priv);
		
	}
	/**
	 * Setups body for showing file details.
	 * @param {string} user_priv - user privilege.
	 * @returns {void}
	 */
	setupBodyforDetailsPreview(user_priv) {
		
		console.log(this.file_controller);
		var type = ViewerUtilis.getExtension(this.file_controller.getFileType());
		

		var generalDiv = document.createElement("div");
		generalDiv.className = "generalDiv";
		generalDiv.innerHTML = "General";

		var preview = document.createElement("div");
		preview.className = "general-preview";
		
		var firstRow = document.createElement("div");
		firstRow.className = "row firstRow";
		
		var firstRowIcon = document.createElement("img");
		firstRowIcon.className = "firstRowIcon";
		firstRowIcon.src = ViewerUtilis.ICON_TXT_FILE;
		
		var firstRowTitle = document.createElement("div");
		firstRowTitle.className = "firstRowTitle";
		firstRowTitle.innerHTML = this.file_controller.getFileName() + "." + type;
		
		firstRow.appendChild(firstRowIcon);
		firstRow.appendChild(firstRowTitle);
		
		
		var secondRow = document.createElement("div");
		secondRow.className = "row secondRow";
		

		var secondRowTypeOfFile = document.createElement("div");
		secondRowTypeOfFile.className = "secondRowTypeOfFile";
		
		var secondRowTypeOfFileLabel = document.createElement("div");
		secondRowTypeOfFileLabel.className = "label secondRowTypeOfFileLabel";
		secondRowTypeOfFileLabel.innerHTML = "Type of file:";

		var secondRowTypeOfFileTitle = document.createElement("div");
		secondRowTypeOfFileTitle.className = "secondRowTypeOfFileTitle";
		secondRowTypeOfFileTitle.innerHTML = type.toUpperCase() + " File";
		
		
		secondRowTypeOfFile.appendChild(secondRowTypeOfFileLabel);
		secondRowTypeOfFile.appendChild(secondRowTypeOfFileTitle);
		


		

		var secondRowOpensWith = document.createElement("div");
		secondRowOpensWith.className = "secondRowOpensWith";

		var secondRowOpensWithLabel = document.createElement("div");
		secondRowOpensWithLabel.className = "label secondRowOpensWithLabel";
		secondRowOpensWithLabel.innerHTML = "Opens with:";


		var secondRowOpensWithIcon = document.createElement("img");
		secondRowOpensWithIcon.className = "secondRowOpensWithIcon";
		secondRowOpensWithIcon.src = ViewerUtilis.ICON_TXT_FILE;

		var secondRowOpensWithTitle = document.createElement("div");
		secondRowOpensWithTitle.className = "secondRowOpensWithTitle";
		secondRowOpensWithTitle.innerHTML = "Notepad";
		


		secondRowOpensWith.appendChild(secondRowOpensWithLabel);
		secondRowOpensWith.appendChild(secondRowOpensWithIcon);
		secondRowOpensWith.appendChild(secondRowOpensWithTitle);
		


		secondRow.appendChild(secondRowTypeOfFile);
		secondRow.appendChild(secondRowOpensWith);



		
		
		var thirdRow = document.createElement("div");
		thirdRow.className = "row thirdRow";
		
		
		var thirdRowLocationDiv = document.createElement("div");
		thirdRowLocationDiv.className = "thirdRowLocationDiv";
		
		var thirdRowLocationLabel = document.createElement("div");
		thirdRowLocationLabel.className = "label thirdRowLocationLabel";
		thirdRowLocationLabel.innerHTML = "Location:";
		
		var thirdRowLocationTitle = document.createElement("div");
		thirdRowLocationTitle.className = "thirdRowLocationTitle";
		thirdRowLocationTitle.innerHTML = this.file_controller.getLocation();
		
		thirdRowLocationDiv.appendChild(thirdRowLocationLabel);
		thirdRowLocationDiv.appendChild(thirdRowLocationTitle);

		


		
		var thirdRowSizeDiv = document.createElement("div");
		thirdRowSizeDiv.className = "thirdRowSizeDiv";

		var thirdRowSizeLabel = document.createElement("div");
		thirdRowSizeLabel.className = "label thirdRowSizeLabel";
		thirdRowSizeLabel.innerHTML = "Size:";
		
		var thirdRowSizeTitle = document.createElement("div");
		thirdRowSizeTitle.className = "thirdRowSizeTitle";
		thirdRowSizeTitle.innerHTML = this.file_controller.getSize();
		
		thirdRowSizeDiv.appendChild(thirdRowSizeLabel);
		thirdRowSizeDiv.appendChild(thirdRowSizeTitle);



		var thirdRowSizeOnDiskDiv = document.createElement("div");
		thirdRowSizeOnDiskDiv.className = "thirdRowSizeOnDiskDiv";
	
		var thirdRowSizeOnDiskLabel = document.createElement("div");
		thirdRowSizeOnDiskLabel.className = "label thirdRowSizeOnDiskLabel";
		thirdRowSizeOnDiskLabel.innerHTML = "Size on disk:";

		var thirdRowSizeOnDiskTitle = document.createElement("div");
		thirdRowSizeOnDiskTitle.className = "thirdRowSizeOnDiskTitle";
		thirdRowSizeOnDiskTitle.innerHTML = this.file_controller.getSizeOnDisk();
		

		thirdRowSizeOnDiskDiv.appendChild(thirdRowSizeOnDiskLabel);
		thirdRowSizeOnDiskDiv.appendChild(thirdRowSizeOnDiskTitle);

		thirdRow.appendChild(thirdRowLocationDiv);
		thirdRow.appendChild(thirdRowSizeDiv);
		thirdRow.appendChild(thirdRowSizeOnDiskDiv);
		
		
		var fourthRow = document.createElement("div");
		fourthRow.className = "row fourthRow";
		
		


		
		var fourthRowCreatedDiv = document.createElement("div");
		fourthRowCreatedDiv.className = "fourthRowCreatedDiv";

		var fourthRowCreatedLabel = document.createElement("div");
		fourthRowCreatedLabel.className = "label fourthRowCreatedLabel";
		fourthRowCreatedLabel.innerHTML = "Created:";
		
		
		var fourthRowCreatedTitle = document.createElement("div");
		fourthRowCreatedTitle.className = "fourthRowCreatedTitle";
		fourthRowCreatedTitle.innerHTML = this.file_controller.getCreated();
		
		
		fourthRowCreatedDiv.appendChild(fourthRowCreatedLabel);
		fourthRowCreatedDiv.appendChild(fourthRowCreatedTitle);

		fourthRow.appendChild(fourthRowCreatedDiv);
		
		
		
		
		var fifthRow = document.createElement("div");
		fifthRow.className = "row fifthRow";
		
	
		
		var fifthRowAttributes = document.createElement("div");
		fifthRowAttributes.className = "fifthRowAttributes";
		
		var fifthRowAttributesLabel = document.createElement("div");
		fifthRowAttributesLabel.className = "fifthRowAttributesLabel";
		fifthRowAttributesLabel.innerHTML = "Attributes:";
		
		
		
		var fifthRowReadOnlyBox = document.createElement("div");
		fifthRowReadOnlyBox.className = "fifthRowReadOnlyBox";
		
	
		
		if ( user_priv == "guest" ) {
			var fifthRowReadOnlyBoxMarked = document.createElement("div");
			fifthRowReadOnlyBoxMarked.className = "fifthRowReadOnlyBoxMarked";
			
			fifthRowReadOnlyBox.appendChild(fifthRowReadOnlyBoxMarked);
			
		} 


		
		
		var fifthRowReadOnlyBoxLabel = document.createElement("div");
		fifthRowReadOnlyBoxLabel.className = "fifthRowReadOnlyBoxLabel";
		fifthRowReadOnlyBoxLabel.innerHTML = "Read only";
	
		
		fifthRowAttributes.appendChild(fifthRowAttributesLabel);
		fifthRowAttributes.appendChild(fifthRowReadOnlyBoxLabel);
		fifthRowAttributes.appendChild(fifthRowReadOnlyBox);
		fifthRowAttributes.appendChild(fifthRowReadOnlyBoxLabel);
		fifthRow.appendChild(fifthRowAttributes);
		
		
		
		preview.appendChild(generalDiv);
		preview.appendChild(firstRow);
		preview.appendChild(secondRow);
		preview.appendChild(thirdRow);
		preview.appendChild(fourthRow);
		preview.appendChild(fifthRow);
		this.domBody.appendChild(preview);
		this.domBody.className += " properties-details";
		
	}

	
}