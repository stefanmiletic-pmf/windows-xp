export default class FunctionsFrontend {
	

	/**
   * Returns time for the clock.
   * @returns {string}
   */
	static getTimeATMForTheClock() {
		
		var today = new Date();
			var hours =  String(today.getHours()).padStart(2, '0');
			var minutes =  String(today.getMinutes()).padStart(2, '0');
			
			return hours + ":" + minutes;
	}

	
	/**
   * Returns time for the query record.
   * @returns {string}
   */
	static getTimeATM() {
		var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			var minutes =  String(today.getMinutes()).padStart(2, '0');
			var hours =  String(today.getHours()).padStart(2, '0');

			var time = dd + '/' + mm + '/' + yyyy + "  " +
				+hours+":" +minutes;
				
			return time;

	}
	

	
	/**
   * Returns time for the log record.
   * @returns {string}
   */
	static getTimeATMForLogRecord() {
		
		var today = new Date();

			var seconds =  String(today.getSeconds()).padStart(2, '0');
			var minutes =  String(today.getMinutes()).padStart(2, '0');
			var hours =  String(today.getHours()).padStart(2, '0');

			var time = hours+":" +minutes+":"+seconds;
				
			return time;
			
	}
	
	/**
   * Returns time for the system log record.
   * @param {BitInt} timestamp - Record's timestamp.
   * @returns {string}
   */
	static getTimeATMForSystemLogRecord(timestamp) {
		var today = new Date();
		today.setTime(timestamp);
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			
			
			var seconds =  String(today.getSeconds()).padStart(2, '0');
			var minutes =  String(today.getMinutes()).padStart(2, '0');
			var hours =  String(today.getHours()).padStart(2, '0');


			var time = dd + '/' + mm + '/' + yyyy + "  " +
				+hours+":" +minutes+":"+seconds;
				
			return time;
			
	}
		
	/**
   * Returns time for the properties created field.
   * @returns {string}
   */
	static getTimeATMformatProperties(timestamp) {
		
		var today = new Date();
		today.setTime(timestamp);
			var dd_unformatedINT = today.getDate();
			var dd = String(today.getDate()).padStart(2, '0');
			
			dd_unformatedINT = dd_unformatedINT%7;
			var dayWord = "";
			switch(dd_unformatedINT) {
				
				case 1:
					dayWord = "Monday"
					break;
				case 2:
					dayWord = "Thuesday";
					break;
				case 3:
					dayWord = "Wendesday";
					break;
				case 4:
					dayWord = "Thursday";
					break;
				case 5:
					dayWord = "Friday";
					break;
				case 6:
					dayWord = "Saturday";
					break;
				case 0:
					dayWord = "Sunday";
					break;
				
			}
			
			var mm_unformatedINT = today.getMonth() + 1;
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			
			var monthWord = "";
			switch(mm_unformatedINT) {
				
				case 1:
					monthWord = "January"
					break;
				case 2:
					monthWord = "February";
					break;
				case 3:
					monthWord = "March";
					break;
				case 4:
					monthWord = "April";
					break;
				case 5:
					monthWord = "May";
					break;
				case 6:
					monthWord = "June";
					break;
				case 7:
					monthWord = "July";
					break;
				case 8:
					monthWord = "Avgust";
					break;
				case 9:
					monthWord = "September";
					break;
				case 10:
					monthWord = "October";
					break;
				case 11:
					monthWord = "November";
					break;
				case 12:
					monthWord = "December";
					break;
				
			}
			
			
			var yyyy = today.getFullYear();

			var minutes =  String(today.getMinutes()).padStart(2, '0');
			var hours =  String(today.getHours()).padStart(2, '0');
			var seconds =  String(today.getSeconds()).padStart(2, '0');

			var dayHalf = "AM";
			if (hours > 12)
				dayHalf = "PM";

			var time = dayWord + ", " + monthWord + " " + dd + ", "+ yyyy + ", " +
				+hours+":" +minutes+":"+seconds + " " + dayHalf;
				
			return time;
		
	}
	
		
}