function domainName() {
	return "http://iamlive.local";
}
function global(ask) {
	switch (ask) {
		case "owner_website_url":
			if (window.location.hostname.indexOf("iamlive.local") > -1){
				return "http://iamlive.local";
			} else {
				return "https://vq.pe";
			}
			break;
		case "main_website_name":
			return window.location.hostname;
			break;
		case "main_website_url":
			return window.location.protocol + '//' + window.location.hostname;
			break;
		case "creator_website_name":
			return window.location.hostname.split(".")[0];
			break;
		case "creator_website_url":
			return window.location.protocol + '//' + '' + $("#website_name").val() + '.' + window.location.hostname;
			break;
	}
}
function setCookie(cname, cvalue, exdays, domain) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let user = getCookie("username");
	if (user != "") {
		alert("Welcome again " + user);
	} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, 365);
		}
	}
}

function deleteCookie(cname) {
	document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }