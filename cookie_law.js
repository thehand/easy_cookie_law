cookie_law_check();

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) {
			end = dc.length;
		}
	}
	return unescape(dc.substring(begin + prefix.length, end));
} 

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function cookie_law_check() {
	var hostname = window.location.hostname;
	var checkCk = getCookie("cookie_law_" + hostname);

	if (checkCk == null) {
		cookie_law_addBannerTag();
	} else {
		var el = document.getElementById("cookie_law_banner");
		if (el) el.parentElement.removeChild(el);
	}
}

function cookie_law_disableBanner() {
	var hostname = window.location.hostname;
	setCookie("cookie_law_" + hostname,new Date(),90);
	cookie_law_check();
}

function cookie_law_addBannerTag() {
	var font = document.createElement("link");
	font.href = "http://fonts.googleapis.com/css?family=Open+Sans:300,800";
	font.rel = "stylesheet";
	font.type = "text/css";
	document.body.appendChild(font);

	var css = document.createElement("link");
	css.href = "/cookie_law/style.css";
	css.rel = "stylesheet";
	css.type = "text/css";
	document.body.appendChild(css);

	var el = document.createElement("div");
	el.id = "cookie_law_banner";
	el.innerHTML = '<p>Questo sito utilizza i Cookies al fine di offrire agli utenti un servizio migliore.&nbsp;<a href="javascript:void(0)" onclick="cookie_law_disableBanner();" class="cookie_law_banner_btn">Ok, ho capito</a>&nbsp;&nbsp;<small><a href="javascript:void(0);" onclick="cookie_law_showInfos();">Vuoi saperne di pi&ugrave;?</a></small></p>';
	document.body.appendChild(el);
	document.getElementById("cookie_law_banner").className += " opened";
}

function cookie_law_showInfos() {
	var div = document.createElement("div");
	div.id = "cookie_law_info_window";
	
	var iframe = document.createElement("iframe");
	iframe.id = "cookie_law_info_window_iframe";
	iframe.src = "/cookie_law/info_cookies.php";
	div.appendChild(iframe);
	
	var closeBtn = document.createElement("a");
	closeBtn.id = "cookie_law_info_window_close";
	closeBtn.href = "javascript:void(0);";
	closeBtn.onclick = function () {
		var info_window = document.getElementById("cookie_law_info_window");
		info_window.parentNode.removeChild(info_window);
	};
	closeBtn.innerHTML = "X";
	div.appendChild(closeBtn);
	
	document.body.appendChild(div);
	document.getElementById("cookie_law_info_window").className += " opened";
}
