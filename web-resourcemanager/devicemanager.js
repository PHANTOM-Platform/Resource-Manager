/**
* Copyright (c) 2018
*
* HLRS
*
* @summary Code for interaction of the Web Interface with the RESTful interface of the PHANTOM server
* @author Jose Miguel Montañana <montanana@hlrs.de>
*
* Last modified  : 2018-10-17 17:28:40
*/

/**https://github.com/okfn/elasticsearch.js */

var appserver = "localhost";
var appport = 8500;

var deviceserver = appserver;
var deviceport = 8600;

var execserver = appserver;
var execport = 8700;

function checktoken() {
	var menu_phantom = document.getElementById("menu_phantom");
	var requestToken = document.getElementById("requestToken");
	var title_login = document.getElementById("title_login");
	if(!sessionStorage.token || sessionStorage.token == undefined ) {
		if(menu_phantom) document.getElementById("menu_phantom").style.display = "none";
		if(requestToken) document.getElementById("requestToken").style.display = "block";
		if(title_login) document.getElementById("title_login").style.display = "block";
	}else if (sessionStorage.token.length == 0) {
		if(menu_phantom) document.getElementById("menu_phantom").style.display = "none";
		if(requestToken) document.getElementById("requestToken").style.display = "block";
		if(title_login) document.getElementById("title_login").style.display = "block";
	}else{
		if(menu_phantom) document.getElementById("menu_phantom").style.display = "block";
		if(requestToken) document.getElementById("requestToken").style.display = "none";
		if(title_login) document.getElementById("title_login").style.display = "none";
	}
// 	if(sessionStorage.token != undefined)
// 	if(title_login) document.getElementById("title_login").innerHTML = " "+JSON.stringify(sessionStorage);
	return false;
}

function message_broadcast( ) {//hace que pida las variables de los otros
	localStorage.setItem('getSessionStorage', 'sessionStorage.token');
	localStorage.removeItem('getSessionStorage', 'sessionStorage.token');
}

function share_session_storage_new(){
	// Ask other tabs for session storage (this is ONLY to trigger event)
	message_broadcast( );
	window.addEventListener('storage', function(event) {
		if (event.key == 'sessionStorage'){// && isEmpty(memoryStorage)) {
			sessionStorage.setItem('token', JSON.parse(event.newValue));
			checktoken();
		}
	});
	window.onbeforeunload = function() {
// 		sessionStorage.clear();
	};
	checktoken();
	return false;
}

function request_share_session_storage(){
	message_broadcast();
	localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage.token));
	return false;
}


function share_session_storage_login(){
	// Ask other tabs for session storage (this is ONLY to trigger event)
	window.addEventListener('storage', function(event) {
		if (event.key == 'getSessionStorage') {
			// Some tab asked for the memoryStorage -> send it
			localStorage.clear();
			localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage.token));
		}
	});
	window.onbeforeunload = function() {
// 		sessionStorage.clear();
	};
	checktoken();
	return false;
}

function savetoken(mytoken) {
	if(typeof(Storage) !== "undefined") {
		if (sessionStorage.token) {//update with new token 
			sessionStorage.setItem('token', mytoken);
		}else {//not defined token before
			sessionStorage.setItem('token', mytoken);
		}
		request_share_session_storage();
		document.getElementById("debug_phantom").style.display = "none";
	}else {
		document.getElementById("demoreplaceb").innerHTML = "Sorry, your browser does not support web storage...";
		document.getElementById("debug_phantom").style.display = "block";
	}
}

function start_page_login() {
	share_session_storage_login();
	checktoken();
	return false;
}

function start_page_new() {
	share_session_storage_new();
	checktoken();
	return false;
}

function logout() {
	sessionStorage.setItem('token', '');
	request_share_session_storage();
	checktoken();
	return false;
}

// var s = 'a string', a = [], o = {}, i = 5;
function getType(p) {
	if (Array.isArray(p)) return 'array';
	else if (typeof p == 'string') return 'string';
	else if (p != null && typeof p == 'object') return 'object';
	else return 'other';
}

function load_header(){
	var menuhtml="<ul class=\"menuphantom\">";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_list.html\">List of registered DEVICEs</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_new.html\">Register new DEVICE with a JSON file</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update.html\">Update a DEVICE with a JSON file</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update_form.html\">Register a DEVICE with a Form</a></li>";
// 	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update1.json\">Download JSON example</a></li>";
// 	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update2.json\">Download JSON example 2</a></li>";
// <!-- <li class="menuphantom"><a class="active" href="download_file.html">Download File</a></li> -->
// <!-- <li class="menuphantom"><a href="query_metadata.html">Query metadata</a></li> -->
	menuhtml+="	<li class=\"phantomlogo\" style=\"float:right\" >";
	menuhtml+="	<img src=\"phantom.gif\" alt=\"PHANTOM\" height=\"32\" style=\"background-color:white;\"></img>";
	menuhtml+="	</li>";
	menuhtml+="	<li class=\"menuphantomR\">";
	menuhtml+="		<p><a onClick=\"logout();return false;\" href=\"PleaseEnableJavascript.html\">LogOut</a></p></li>";
	menuhtml+="</ul>";
	menuhtml+="<ul class=\"menuphantom\">";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_mf_config_list.html\">List the MF config of the registered DEVICEs</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_mf_config_reg.html\">Register/Update an MF-Configuration with a JSON file</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_mf_config_form.html\">Register an MF configuration with a Form</a></li>";
	menuhtml+="</ul>";
	menuhtml+="<ul class=\"menuphantom\">";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_status_list.html\">Current load of the registered DEVICEs</a></li>";
	menuhtml+="</ul>";
	document.getElementById("menu_phantom").innerHTML = menuhtml;
}

function load_footer(){
	var menuhtml="<hr /><div class=\"greyfont\" >PHANTOM project: 2018<br />";
	menuhtml+="	Licensed under the Apache License, Version 2.0<br />";
	menuhtml+="	You may obtain a copy of the License at:<br />";
	menuhtml+="	<a href=\"http://www.apache.org/licenses/LICENSE-2.0\">";
	menuhtml+="	http://www.apache.org/licenses/LICENSE-2.0</a>";
	menuhtml+="	</div>";
	document.getElementById("foot_phantom").innerHTML = menuhtml;
}

function load_header_footer(){
	load_header();
	load_footer();
}

function applogin(user,password){
	var url="http://"+appserver+":"+appport+"/login?email="+user+"\&pw="+password+"";//?pretty='true'";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.status == 200) {
			var serverResponse = xhr.responseText;
			savetoken(serverResponse);
			checktoken();
		}else{
			var serverResponse = xhr.responseText;
			document.getElementById("demoreplaceb").innerHTML = "Error: "+ serverResponse;
			document.getElementById("debug_phantom").style.display = "block";
			logout();
			checktoken();
		}
	};
	xhr.send(null);
	return false;
}

function resourcelogin(user,password){
	var url="http://"+deviceserver+":"+deviceport+"/login?email="+user+"\&pw="+password+"";//?pretty='true'";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.status == 200) {
			var serverResponse = xhr.responseText;
			savetoken(serverResponse);
			checktoken();
		}else{
			var serverResponse = xhr.responseText;
			document.getElementById("demoreplaceb").innerHTML = "Error: "+ serverResponse;
			document.getElementById("debug_phantom").style.display = "block";
			logout();
			checktoken();
		}
	};
	xhr.send(null);
	return false;
}

function execlogin(user,password){
	var url="http://"+execserver+":"+execport+"/login?email="+user+"\&pw="+password+"";//?pretty='true'";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.status == 200) {
			var serverResponse = xhr.responseText;
			savetoken(serverResponse);
			checktoken();
		}else{
			var serverResponse = xhr.responseText;
			document.getElementById("demoreplaceb").innerHTML = "Error: "+ serverResponse;
			document.getElementById("debug_phantom").style.display = "block";
			logout();
			checktoken();
		}
	};
	xhr.send(null);
	return false;
}



// In case it is not defined, we define the function here.
if (!String.prototype.endsWith) {
String.prototype.endsWith = function(searchString, position) {
	var subjectString = this.toString();
	if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
		position = subjectString.length;
	}
	position -= searchString.length;
	var lastIndex = subjectString.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};
}


//_filter_workflw_taskid_experimentid
function jsontotable(myjson,count,first,level,lastwascoma,mtitle,filtered_fields){
	var html ="";
//	var i;
// 	if(first==true){ html ="{"; }
	var mainc=mtitle;
	if(mtitle==true){
		html += "<div ><table style='border:1px solid black'>\n";// style='width:100%'>";
	}
	var countseries=0;
	myjson.forEach(function(val) {
// 		if (count != 1 && lastwascoma==false) {
// 			if(countseries==0) {
// 				html += ",<br>" ;
// 			}else{
// 				html += "<br>},{<br>" ;
// 			}
// 		};//this is not the first element
		lastwascoma=true;
		var keys = Object.keys(val);
		keys.forEach(function(key) {
			if (getType(val[key]) == "string" || getType(val[key]) == "other" ){
				var tobefiltered=false;
				for (i=0;i< filtered_fields.length;i++){
					if (key.endsWith(filtered_fields[i], key.length)== true) {
						tobefiltered=true;
					}
				}
				if (tobefiltered== false) {//it is stored the length of the strings, not need to show
// 					if (count != 1 && lastwascoma==false) html +=  ',<br>';
// 					for (i = 0; i < level; i++) {
// 						if (count != 1) html += '&emsp;';
// 					}
					if(mtitle==true){
						if(count>1){
							html += "</table></div></td><br>\n";
							html += "<div ><table  style='border:1px solid black'>\n";// style='width:100%'>";
						}
						html += "<tr><th><strong>\""+ key +"\"</strong>: \"" + val[key] +"\"</th></tr>\n";
						mtitle=false;
					}else{
						html += "<tr><td><strong>\"" + key +"\"</strong>: \"" + val[key] +"\"</td></tr>\n";
					}
					count++;
					lastwascoma=false;
				}
			}else if (getType(val[key]) == "array" ) {
// 					if (count != 1) html += ',<br>';
// 					for (i = 0; i < level; i++) {
// 						if (count != 1) html += '&emsp;';
// 					}
					if(mtitle==true){
						html += "<tr><th><strong>\"" +  key + "\"</strong>: </th>\n";
						mtitle=false;
					}else{
						html += "<tr><td><strong>\"" +  key + "\"</strong>: </td>\n";
					}
					count++;
					lastwascoma=false;
					html += "<td><div><table style='width:100%; border:0px solid black'>\n";//  style='width:100%'>";
					html += jsontotable(  ([ val[key] ]), count, true, level+1 ,lastwascoma,false,filtered_fields);
					html += "</table></div></td>\n";
			}else if (getType(val[key]) == "object" ) {
				html += jsontotable( ([ val[key] ]), count, false, level+1,lastwascoma,false,filtered_fields);
			};
		});
		mtitle=true;
		countseries++;
	});
// 	if(first==true){ html += "<br>}"; }
	if(mainc==true)
		html += "</table></div>\n";
	return html;
}
 

function jsontotable_only_device_names(myjson,count,first,level,lastwascoma,mtitle,fields_toshow){
	var html ="";
//	var i;
// 	if(first==true){ html ="{"; }
	var mainc=false;
	if(mtitle==true && level==1){
		mainc=true;
		html += "<div ><table>\n";//  style='border:1px solid black'>\n";// style='width:100%'>";
	}
	var countseries=0;
	myjson.forEach(function(val) {
// 		if (count != 1 && lastwascoma==false) {
// 			if(countseries==0) {
// 				html += ",<br>" ;
// 			}else{
// 				html += "<br>},{<br>" ;
// 			}
// 		};//this is not the first element
		lastwascoma=true;
		var keys = Object.keys(val);
		keys.forEach(function(key) {
			if (getType(val[key]) == "string" || getType(val[key]) == "other" ){
				var tobefiltered=true;
				for (i=0;i< fields_toshow.length;i++){
					if (key.endsWith(fields_toshow[i], key.length)== true) {
						tobefiltered=false;
					}
				}
				if (tobefiltered== false) {//it is stored the length of the strings, not need to show				
// 					if (count != 1 && lastwascoma==false) html +=  ',<br>';
// 					for (i = 0; i < level; i++) {
// 						if (count != 1) html += '&emsp;';
// 					}
					if(mtitle==true){
// 						if(count>1){
// 							html += "</table></div></td><br>\n";
// 							html += "<div ><table  style='border:1px solid black'>\n";// style='width:100%'>";
// 						}
						html += "<tr><th><strong>\""+ key +"\"</strong>: \"" + val[key] +"\"</th></tr>\n";	
						mtitle=false;
// 					}else{
// 						html += "<tr><td><strong>\"" + key +"\"</strong>: \"" + val[key] +"\"</td></tr>\n";
					}
					count++;
					lastwascoma=false;
				}
			}else if (getType(val[key]) == "array" ) {
// 					if (count != 1) html += ',<br>';
// 					for (i = 0; i < level; i++) {
// 						if (count != 1) html += '&emsp;';
// 					}
// 					if(mtitle==true){
// 						html += "<tr><th><strong>\"" +  key + "\"</strong>: </th>\n";	
// 						mtitle=false;
// 					}else{
// 						html += "<tr><td><strong>\"" +  key + "\"</strong>: </td>\n";
// 					}
					count++;
					lastwascoma=false;
// 					html += "<td><div  ><table style='width:100%; border:0px solid black'>\n";//  style='width:100%'>";
					html += jsontotable_only_device_names(  ([ val[key] ]), count, true, level+1 ,lastwascoma,true,fields_toshow);
// 					html += "</table></div></td>\n";
			}else if (getType(val[key]) == "object" ) {
				html += jsontotable_only_device_names( ([ val[key] ]), count, false, level+1,lastwascoma,true,fields_toshow);
			};
		});
		mtitle=true;
		countseries++;
	});
// 	if(first==true){ html += "<br>}"; }
	if(mainc==true)
		html += "</table></div>\n";
	return html;
}
 

function jsontohtml(myjson,count,first,level,lastwascoma,filtered_fields){
	var html ="";
	var i;
	if(first==true){ html ="{"; }
	var countseries=0;
	myjson.forEach(function(val) {
		if (count != 1 && lastwascoma==false) {
			if(countseries==0) {
				html += ",<br>" ;
			}else{
				html += "<br>},{<br>" ;
			}
		};//this is not the first element
		lastwascoma=true;
		var keys = Object.keys(val);
		keys.forEach(function(key) {
			if (getType(val[key]) == "string" || getType(val[key]) == "other" ){
				var tobefiltered=false;
				for (i=0;i< filtered_fields.length;i++){
					if (key.endsWith(filtered_fields[i], key.length)== true) {
						tobefiltered=true;
					}
				}
				if (tobefiltered== false) {//it is stored the length of the strings, not need to show
					if (count != 1 && lastwascoma==false) html +=  ',<br>';
					for (i = 0; i < level; i++) {
						if (count != 1) html += '&emsp;';
					}
					html += "<strong>\"" + key + "\"</strong>: \"" + val[key] +"\"";
					count++;
					lastwascoma=false;
				}
			}else if (getType(val[key]) == "array" ) {
					if (count != 1) html += ',<br>';
					for (i = 0; i < level; i++) {
						if (count != 1) html += '&emsp;';
					}
					html += "<strong>\"" + key + "\"</strong>: ";lastwascoma=false;
					count++;
					html += jsontohtml( ([ val[key] ]), count, true, level+1 ,lastwascoma,filtered_fields) +"\n";
					
			}else if (getType(val[key]) == "object" ) {
// 				html += "<tr><td><strong> &emsp;" + key + "</strong>: \"" + JSON.stringify(val[key]) +"\"</td>\n";//this shows a key counter
				html += jsontohtml( ([ val[key] ]), count, false, level+1,lastwascoma,filtered_fields) +"\n";
			};
		});
		countseries++;
	});
	if(first==true){
		html += "<br>}";
	}
	return html;
}
 

function upload_with_token( UploadJSON, url ) {
// 	share_session_storage();
	if(!sessionStorage.token) {
		document.getElementById("demoreplaceb").innerHTML = "Sorry, try login again, missing token...";
		document.getElementById("debug_phantom").style.display = "block";
		return false;
	}
	if((sessionStorage.token !== undefined) && (sessionStorage.token.length>0)) {
		var xhr = new XMLHttpRequest();
		var formData = new FormData();
// 		var resultElement = document.getElementById("demoreplaceb");
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Authorization", "JWT " + sessionStorage.token);
		xhr.addEventListener('load', function() {
			var responseObject = (xhr.responseText);
// 			resultElement.innerHTML = xhr.responseText;
			document.getElementById("demoreplaceb").innerHTML = responseObject + " status: " +xhr.status;
			document.getElementById("debug_phantom").style.display = "block";
		});
		formData.append("UploadJSON", UploadJSON.files[0]);
//formData.append("UploadFile", UploadFile.data);
		xhr.send(formData);//may fault code appear here
	}else {
		document.getElementById("demoreplaceb").innerHTML = "Sorry, try login again, missing token...";
		document.getElementById("debug_phantom").style.display = "block";
	}
	return false;
}

function upload_app_with_token( UploadJSON ) {
	var url = "http://"+appserver+":"+appport+"/register_new_project";
	upload_with_token( UploadJSON, url);
	return false;
}

function upload_device_with_token( UploadJSON ) {
	var url = "http://"+deviceserver+":"+deviceport+"/register_new_device";
	upload_with_token( UploadJSON ,url);
	return false;
}

function upload_exec_with_token( UploadJSON ) {
	var url = "http://"+execserver+":"+execport+"/register_new_exec";
	upload_with_token( UploadJSON ,url);
	return false;
}

function update_app_with_token( UploadJSON ) {
	var url = "http://"+appserver+":"+appport+"/update_project_tasks";
	upload_with_token( UploadJSON ,url);
	return false;
}

function update_device_with_token( UploadJSON ) {
	var url = "http://"+deviceserver+":"+deviceport+"/update_device";
	upload_with_token( UploadJSON ,url);
	return false;
}

function update_mf_config_with_token( UploadJSON ) {
	var url = "http://"+deviceserver+":"+deviceport+"/register_mf_config";
// 	var url = "http://"+deviceserver+":"+deviceport+"/update_device_status";
	upload_with_token( UploadJSON ,url);
	return false;
}

function upload_mf_config_with_token( UploadJSON ) {
	var url = "http://"+deviceserver+":"+deviceport+"/register_mf_config";
// 	var url = "http://"+deviceserver+":"+deviceport+"/update_device_status";
	upload_with_token( UploadJSON ,url);
	return false;
}

function update_exec_with_token( UploadJSON ) {
	var url = "http://"+execserver+":"+execport+"/update_exec";
	upload_with_token( UploadJSON ,url);
	return false;
}

// function update_mfconfig_with_form( UploadJSON ) {
// 	var url = "http://"+deviceserver+":"+deviceport+"/myform";
// 	update_config_with_token( UploadJSON ,url);
// 	return false;
// }





function list_results_with_token( mytype ,url,fields_toshow, filtered_fields) {
	if(!sessionStorage.token) {
		document.getElementById("demoreplaceb").innerHTML = "Sorry, try login again, missing token...";
		document.getElementById("debug_phantom").style.display = "block";
		return false;
	}
	if((sessionStorage.token !== undefined) && (sessionStorage.token.length>0)) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.setRequestHeader("Authorization", "JWT " + sessionStorage.token);
		xhr.addEventListener('load', function() {
// 		xhr.onreadystatechange = function() {
			var html = "";// to store the conversion of json to html format 
			if (xhr.readyState === 4 && xhr.status == 200) {
				var responseObject = [ xhr.responseText ];
				// document.getElementById('demoreplacea').innerHTML = serverResponse;//this will show the reponse of the server as txt;
				var myjson = JSON.parse(  responseObject || '{}');
				if(myjson.hits!=undefined) {
					myjson = myjson.hits;
				}else{
					myjson = [ myjson ];
				}
				if(myjson!=undefined) {
					if (mytype== 1) {
						html += jsontotable(myjson,1, true,1,false,true,filtered_fields);
					}else if (mytype == 4){
						html +=  jsontotable_only_device_names(myjson,1, true,1,false,true,fields_toshow);
					}else if (mytype == 2){
						html += jsontohtml(myjson,1,true,1,false,filtered_fields);
					}else{
						html += JSON.stringify(myjson);
					}
				}
			}
			console.log("html is \n"+html);
			document.getElementById("demoreplaceb").innerHTML = html; //+responseObject + " status: " +xhr.status;
			document.getElementById("debug_phantom").style.display = "block";
// 		};
		});
		xhr.send(null);//may fault code appear here
	}else {
		document.getElementById("demoreplaceb").innerHTML = "Sorry, try login again, missing token...";
		document.getElementById("debug_phantom").style.display = "block";
	}
	return false;
}



function list_results(mytype,url,fields_toshow,filtered_fields){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		var html = "";// to store the conversion of json to html format 
		if (xhr.readyState === 4 && xhr.status == 200) {
			var serverResponse = xhr.responseText;
			// document.getElementById('demoreplacea').innerHTML = serverResponse;//this will show the reponse of the server as txt;
			var myjson = JSON.parse(serverResponse);
			if(myjson.hits!=undefined) {
				myjson = myjson.hits;
			}else{
				myjson = [ myjson ];
			}
			if(myjson!=undefined) {
				if (mytype== 1) {
					html += jsontotable(myjson,1,true,1,false,true,filtered_fields);
				}else if (mytype == 4){
					html +=  jsontotable_only_device_names(myjson,1,true,1,false,true,fields_toshow);
				}else if (mytype == 2){
					html += jsontohtml(myjson,1,true,1,false,filtered_fields);
				}else{
					html += JSON.stringify(myjson);
				}
			}
// 			console.log("html is "+html);
			//document.getElementById('demoreplaceb').innerHTML = JSON.stringify(myjson) + "<br>" + html;// myjson[0].project;
			document.getElementById('demoreplaceb').innerHTML = html;
			document.getElementById("debug_phantom").style.display = "block";
// 		}else{
// 			var serverResponse = xhr.responseText;
// 			document.getElementById('demoreplaceb').innerHTML = serverResponse;
// 			document.getElementById("debug_phantom").style.display = "block";
		}
	};
	xhr.send(null);
	return false;
}



function list_apps(mytype,appname){
	var url="http://"+appserver+":"+appport+"/get_app_list?project=\""+appname+"\"";//?pretty='true'";
	list_results(mytype,url,["host"],["_length"]);
	return false;
}

function list_execs(mytype,execname){
	var url="http://"+execserver+":"+execport+"/get_exec_list?app=\""+execname+"\"";//?pretty='true'";
	list_results(mytype,url,["host"],["_length"]);
	return false;
}

function list_devices(mytype,devicename){
	var url="http://"+deviceserver+":"+deviceport+"/get_device_list?device=\""+devicename+"\"";//?pretty='true'";
// 	console.log("url is "+url+"\n");
	list_results(mytype,url,["device"],["_length"]);
	return false;
}

function list_status_devices(mytype,devicename){
	// get_plugin_status localhost 9400 "node01";
	var url="http://"+deviceserver+":"+deviceport+"/query_device_status?device=\""+devicename+"\"";//?pretty='true'"; 
	list_results_with_token(mytype,url,["host"],["_length","WorkflowID", "ExperimentID", "TaskID"] );
	return false;
}

function list_mf_config_devices(mytype,devicename){ 
	// get_plugin_status localhost 9400 "node01";
	var url="http://"+deviceserver+":"+deviceport+"/query_device_mf_config?device=\""+devicename+"\"";//?pretty='true'"; 
	list_results_with_token(mytype,url,["host"],["_length"] );
	return false;
}

function update_config_with_token( UploadJSON ,url) {
// 	if(!sessionStorage.token) {
// 		document.getElementById("demoreplaceb").innerHTML = "Sorry, try login again, missing token...";
// 		document.getElementById("debug_phantom").style.display = "block";
// 		return false;
// 	}
// 	if((sessionStorage.token !== undefined) && (sessionStorage.token.length>0)) {
		var xhr = new XMLHttpRequest();
		var formData = new FormData();
// 		var resultElement = document.getElementById("demoreplaceb");
		xhr.open('POST', url, true);
// 		xhr.setRequestHeader("Authorization", "JWT " + sessionStorage.token);
		xhr.addEventListener('load', function() {
			var responseObject = (xhr.responseText);
// 			console.log(responseObject);
// 			resultElement.innerHTML = xhr.responseText;
			document.getElementById("demoreplaceb").innerHTML = responseObject + " status: " +xhr.status;
			document.getElementById("debug_phantom").style.display = "block";
		});
		formData.append("UploadJSON", UploadJSON.files[0]);
// formData.append("UploadFile", UploadFile.data);
		xhr.send(formData);
// 	}else {
// 		document.getElementById("demoreplaceb").innerHTML = "Sorry, try login again, missing token...";
// 		document.getElementById("debug_phantom").style.display = "block";
// 	}
	return false;
}

