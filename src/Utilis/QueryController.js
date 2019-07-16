export default class QueryController {
			
	/**
   * Query server.
	* @param {string} POST_params - params for post action.
	* @param {string} callback_success - callback for successful request.
	* @param {string} callback_error - callback for unsuccessful request.
  * @returns {void}
   */
	static 
	executeQuery(POST_params, callback_success, callback_error) {
		
			var request = QueryController.ajaxRequest();
				request.open("POST", "./php/dataProvider.php", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.onreadystatechange = function() {
					if(this.readyState == 4)
					{
						if (this.status == 200) {
							
								if(this.responseText != null)
								{
									
									if ( callback_success!=undefined)
										callback_success(this.responseText);
									
								}
							
						} else {
							
									if ( callback_error!=undefined)
										callback_error(this.responseText);
						}
						
					}
					
				};
				
			
			
			var keys = Object.keys(POST_params);
			
			var POST_string = "";
			for ( var i = 0; i<keys.length; ++i) {
				
				var key =  keys[i];
				var value = POST_params[key];
				POST_string += key + "=" + value;
				POST_string += "&";
				
			}
			if ( POST_string.length > 1 ) 
				POST_string = POST_string.substring(0, POST_string.length-1);
			
			
			
			request.send(POST_string);
	}

	/**
   	* Returns ajax object.
	* @returns {XMLHttpRequest}
   */
	static 
	ajaxRequest() {

		try {
			var request = new XMLHttpRequest(); // novi browseri
		}
		catch(e1) {
			try {
				request = new ActiveXObject("Maxm12.XMLHTTP"); // IE6
			}
			catch(e2) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP"); // IE...
				}
				catch(e3) {
					request = false;
				}	
			}				
		}
		return request;
	}
	

	
}