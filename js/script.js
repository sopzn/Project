function el(el){
	return document.getElementById(el);
}

function validate(type, data, msg=null, opt=null){
	switch(type){
		case "firstname":
		case "lastname":
		case "name":
			if (data == "" || data == null) {
				return (msg == null) ? "Name cannot be empty" : msg;
			}
			break;

		case "matric":
			if (data == "" || data == null) {
				return (msg == null) ? "Matric number cannot be empty" : msg;
			}
			else if (data.length < 8){
				return (msg == null ? "Matric number is too short" : msg);
			}
			break;
	}
	return false;
}

/**
* Send a form via AJAX
*
* @param type ("POST"/"GET", default = "GET"), url (including query string for GET, formID)
* @return Response Object response(status, message)
*
*/
function ajaxForms(type = "GET", url, form = null){

	let postType = type.toUpperCase();
	let xhttp = new XMLHttpRequest();
	let response;

	xhttp.onreadystatechange = function(){
		if (this.readyState == 4){
			response = new Object();
			response.status = this.status;
			response.message = this.responseText;
			//return response;
		}
	}

	switch (postType){
		case "GET":
			xhttp.open("GET", url, true);
			xhttp.send();
			break;

		case "POST":
			let formData = new FormData(el(form));
			xhttp.open("POST", url, true);
			xhttp.send(formData);
			break;		
	}
}

let confirmPwd = function(pwd, pwd2) {
	return (pwd == pwd2) ? true : false;
}

let changeFormType = function(){
	let usertype = document.getElementsByName('usertype');

	for (let i = 0; i < usertype.length; i++){
		if (usertype[i].checked){
			if (usertype[i].value == "Supervisor") {
				el('supervisorSignup').classList.remove("hidden");
				el('studentSignup').classList.add("hidden");	
			}
			else {
				el('supervisorSignup').classList.add("hidden");
				el('studentSignup').classList.remove("hidden");	
			}
			break;
		}
	}
}

let submitStudent = function(){
	let matric = el('matricno').value;
	let pwd = el('stuPwd').value;
	let pwd2 = el('stuPwdTwo').value;
	let errorMsg = el('studentErrorMessage');
	let valid = validate("matric", matric);
	let btn = el('studentSubmit');

	if (!valid && confirmPwd(pwd, pwd2)) {
		let xhttp = new XMLHttpRequest();
		let response;

		xhttp.onreadystatechange = function(){
			if (this.readyState == 4){
				response = new Object();
				response.status = this.status;
				response.message = this.responseText;
				console.log(response.message);
				setTimeout(function(){
					btn.value = "Sign Up";
					btn.disabled = false;
				}, 3000);
			}
		}
		let formData = new FormData(el('studentSignupForm'));
		xhttp.open("POST", "../php/test.php", true);
		xhttp.send(formData);
		btn.value = "Signing Up...";
		btn.disabled = true;
	}
	else {
		if (!confirmPwd(pwd, pwd2)) {
			errorMsg.innerHTML = "Passwords do not match";
		}
		else {
			errorMsg.innerHTML = valid;
		}
	}
}


let submitSupervisor = function(){
	let start = el('startTime').value;
	let end = el('endTime').value;

	let pwd = el('supPwd').value;
	let pwd2 = el('supPwdTwo').value;
	let errorMsg = el('supervisorErrorMessage');
	let btn = el('supervisorSubmit');

	if ((end > start) && confirmPwd(pwd, pwd2)) {
		let xhttp = new XMLHttpRequest();
		let response;
		errorMsg.innerHTML = "";

		xhttp.onreadystatechange = function(){
			if (this.readyState == 4){
				response = new Object();
				response.status = this.status;
				response.message = this.responseText;
				console.log(response.message);
			}
		}
		let formData = new FormData(el('supervisorSignupForm'));
		xhttp.open("POST", "../php/test.php", true);
		xhttp.send(formData);

	}
	else {
		if (!confirmPwd(pwd, pwd2)) {
			errorMsg.innerHTML = "Passwords do not match";
		}
		else {
			errorMsg.innerHTML = "Session start time cannot be later than end time";
		}
	}
}