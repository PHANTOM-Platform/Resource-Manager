var imported = document.createElement("script");
imported.src = "phantom.js";
document.getElementsByTagName("head")[0].appendChild(imported);

/**
* Returns the host and port (if defined) for building the url
* @returns {String} beginning of the url
*/
function build_resource_path(){
	var url="";
	if(typeof (resourceserver)!== 'undefined'){ // Any scope
		if(resourceserver){
		if(resourceserver.length>0){
			url=url+"http://"+resourceserver;
			if(typeof resourceport!== 'undefined') {// Any scope
				if ((resourceport) && resourceport.lenght>0){
					url=url+":"+resourceport;
	}	}}	}	}
	return url;
}

function rm_logout() {
	sessionStorage.setItem('token', '');
	request_share_session_storage();
// 	checktoken();//already called at the end of request_share_session_storage
	window.location = 'resourcemanager.html';
	return false;
}

/**
* Loads the phantom login menu into the html element "meny_login"
* @returns {Boolean} return true if succeed.
*/
function rm_load_menu_login(){
	var menu_login = document.getElementById("menu_login");
	if(menu_login){
	var menuhtml="<H1 id=\"title_login\" style=\"overflow-wrap:break-word; max-width:80%; word-break:break-all;\"><b>LOGIN into RESOURCE-MANAGER</b></H1>";
	menuhtml+="<form";
	menuhtml+="	id='requestToken'";
	menuhtml+="	method='get'";
	menuhtml+="	name=\"myForm\" autocomplete=\"on\">";
// <!-- 		encType="multipart/form-data"> //for post not for get-->
	menuhtml+="	<div class=\"center\">";
	menuhtml+="		User: <input type=\"text\" name=\"user\" id=\"user\" value=\"\"><br>";
	menuhtml+="		Password: <input type=\"password\" name=\"password\" id=\"password\" value=\"\" autocomplete=\"off\"> <br>";
	menuhtml+="		<input type=\"hidden\" name=\"pretty\" value=\"true\" />";
	menuhtml+="		<input type=\"submit\" onclick=\" rm_login(document.getElementById('user').value, document.getElementById('password').value); return false;\" value=\"LOGIN\" />";
	menuhtml+="	</div></form>";
	menu_login.innerHTML = menuhtml;
	return true;
	}else{
		return false;
	}
}

function rm_load_header(){
	var menu_phantom = document.getElementById("menu_phantom");
	if(menu_phantom){
	var menuhtml="<ul class=\"menuphantom\">";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_list.html\">List of registered DEVICEs</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_new.html\">Register new DEVICE with a JSON file</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update.html\">Update a DEVICE with a JSON file</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update_form.html\">Register a DEVICE with a Form</a></li>";
// 	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_update1.json\">Download JSON example</a></li>";
// <!-- <li class="menuphantom"><a class="active" href="download_file.html">Download File</a></li> -->
	menuhtml+="	<li class=\"phantomlogo\" style=\"float:right\">";
	menuhtml+="	<img src=\"phantom.gif\" alt=\"PHANTOM\" height=\"32\" style=\"background-color:white;\"></img>";
	menuhtml+="	</li>";
	menuhtml+="	<li class=\"menuphantomR\">";
	menuhtml+="		<p><a onClick=\"rm_logout();return false;\" href=\"PleaseEnableJavascript.html\">LogOut</a></p></li>";
	menuhtml+="</ul>";
	menuhtml+="<ul class=\"menuphantom\">";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_mf_config_list.html\">List the MF config of the registered DEVICEs</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_mf_config_reg.html\">Register/Update an MF-Configuration with a JSON file</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_mf_config_form.html\">Register an MF configuration with a Form</a></li>";
	menuhtml+="</ul>";
	menuhtml+="<ul class=\"menuphantom\">";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"device_status_list.html\">Current load of the registered DEVICEs</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><a href=\"log_list.html\">List of logs</a></li>";
	menuhtml+="	<li class=\"menuphantom\"><input type=\"button\" value=\"Night mode\" onclick=\"switchnightmode()\"></a></li>";
	menuhtml+="</ul>";
	menu_phantom.innerHTML = menuhtml;
	}
}

function rm_load_header_footer(){
	rm_load_header();
	rm_load_menu_login();
	load_footer();
	checktoken();
}


function rm_login(user,password){
	var demoreplaceb = document.getElementById("demoreplaceb");
	var debug_phantom = document.getElementById("debug_phantom");
	var menu_login = document.getElementById("menu_login");
	var menu_phantom = document.getElementById("menu_phantom"); //top menu
	var url=build_resource_path()+"/login?email="+user+"\&pw="+password+"";//?pretty='true'";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.status == 200) {
			var serverResponse = xhr.responseText;
			savetoken(serverResponse);
			checktoken();
			var menuhtml="<H1 style=\"overflow-wrap:break-word; max-width:80%; word-break:break-all;\"><b>Choose one option from the top menu</b></H1>";
			if(menu_login) menu_login.innerHTML = menuhtml;
			if(menu_login) menu_login.style.display = "block";
		}else{
			rm_logout();
// 			checktoken();
			rm_load_menu_login();
			if(menu_login) menu_login.style.display = "block";
			var serverResponse = xhr.responseText;
			if(menu_phantom) menu_phantom.style.display = "none";
			if(demoreplaceb) demoreplaceb.innerHTML = "<pre>Error: "+ serverResponse+ "</pre>";
			if(debug_phantom) debug_phantom.style.display = "block";
		}
	};
	xhr.send(null);
	return false;
}
 
function jsontotable_rm_brief(myjson,count,first,level,lastwascoma,mtitle,filtered_fields){
	var html ="";
	var i;
// 	if(first==true){ html ="{"; }
	var mainc=mtitle;
	if(mtitle==true){
		html += "<div><table style='border:1px solid black'>\n";// style='width:100%'>";
		html += "<th align=\"center\"><strong>&nbsp; Host &nbsp;</strong> </th>\n";
		html += "<td colspan=\"2\" align=\"center\"><strong>&nbsp; TimeStamp&nbsp;</strong></td>\n";
		html += "<td><strong>&nbsp;cpu_usage_rate &nbsp;</strong></td>\n";
		html += "<td><strong>&nbsp;ram_usage_rate&nbsp;</strong></td>\n";
		html += "<td><strong>&nbsp;swap_usage_rate &nbsp;</strong></td>\n";
		html += "<td><strong>&nbsp;net_throughput &nbsp;</strong></td>\n";
		html += "<td><strong>&nbsp;io_throughput &nbsp;</strong></td>\n";
		html += "<td><strong>&nbsp;gpu_power_consumption &nbsp;</strong></td>\n";
		count++;
	}
	var countseries=0;
	myjson.forEach(function(val) {
// 		if (count != 1 && lastwascoma==false) {
// 			html += (countseries==0) ? ",<br>" : "<br>},{<br>";
// 		};//this is not the first element
		lastwascoma=true;
		var keys = Object.keys(val);
		keys.forEach(function(key) {
// 			if (getType(val[key]) == "string" || getType(val[key]) == "other" ){
				var tobefiltered=false;
				for (i=0;i< filtered_fields.length;i++){
					if (key.endsWith(filtered_fields[i], key.length)== true) {
						tobefiltered=true;
					}
				}
				if (tobefiltered== false) {//it is stored the length of the strings, not need to show
// 					if (count != 1 && lastwascoma==false) html += ',<br>';
// 					for (i = 0; i < level; i++) {
// 						if (count != 1) html += '&emsp;';
// 					}
					if(mtitle==true){
						if(val['type']!=undefined){ 
						if(val['type']== "Linux_resources"){
						if(count>1){
							html += "</tr>\n<tr>";
// 							html += "</table></div></td><br>\n";
// 							html += "<div><table style='border:1px solid black'>\n";// style='width:100%'>";
						}
// 						html += "<td> " + val['_id'] +" </td>\n";
// 						html += "<th> &nbsp;" + val['project'] +"&nbsp; </th>\n";
						//source
						html += (val['host']!=undefined) ? "<th><font color=\"white\">&nbsp;" + val['host'] :
							"<th bgcolor=\"#f3ff3a\"><font >&nbsp;...";
						html += "&nbsp;</font></th>\n";
						//local_timestamp
						html += "<td align=\"right\"><font>&nbsp;";
						html += (val['local_timestamp']!=undefined) ? val['local_timestamp'] : "NA";
						html += "</td><td align=\"right\"><font>&nbsp;";

						html += (val['local_timestamp']!=undefined) ? calculate_date(1000000*val['local_timestamp']) : "NA";
						html += "&nbsp;</font></td>\n";
						//CPU_usage_rate
						html += "<td align=\"right\"><font>&nbsp;";
						html += (val['cpu_usage_rate']!=undefined) ? val['cpu_usage_rate'] : (val['CPU_usage_rate']!=undefined) ? val['CPU_usage_rate'] : "NA";
						html += "&nbsp;%&nbsp;</font></td>\n";

						//ram_usage_rate
						html += "<td align=\"right\"><font>&nbsp;";
						html += (val['ram_usage_rate']!=undefined) ? val['ram_usage_rate'] : (val['RAM_usage_rate']!=undefined) ? val['RAM_usage_rate'] : "NA";
						html += "&nbsp;%&nbsp;</font></td>\n";

						//swap_usage_rate
						html += (val['swap_usage_rate']!=undefined) ? "<td align=\"right\"><font>&nbsp;" + val['swap_usage_rate'] + "&nbsp;%&nbsp;</font>" : 
							"<td bgcolor=\"#292929\" align=\"center\">NA";
						html += "</td>\n";

						//net_throughput
						html += (val['net_throughput']!=undefined) ? "<td align=\"right\"><font>&nbsp;" + val['net_throughput'] + "&nbsp;</font>" : 
							"<td bgcolor=\"#292929\" align=\"center\">NA";
						html += "</td>\n";

						//io_throughput
						html += (val['io_throughput']!=undefined) ? "<td align=\"right\"><font>&nbsp;" + val['io_throughput'] + "&nbsp;</font>" : 
							"<td bgcolor=\"#292929\" align=\"center\">NA";
						html += "</td>\n";
						
						//gpu_power_consumption
						html += (val['gpu_power_consumption']!=undefined) ? "<td align=\"right\"><font>&nbsp;" + val['gpu_power_consumption'] + "&nbsp;</font>" : 
							"<td bgcolor=\"#292929\" align=\"center\">NA";
						html += "</td>\n";

						mtitle=false;
						count++;
						lastwascoma=false;
					}
				}}//if type=Linux_resources
// 					if((key=="rejection_reason")){
// 						if(val['req_status']=="rejected"){
// 							html += "<td><strong>\"" + key +"\"</strong>: \"" + val[key] +"\"</td>\n";
// 							count++;
// 							lastwascoma=false;
// 						}
// 					}else if((key!="req_status")&&(key!="energy")&&(key!="execution_id")&&(key!="app")&&(key!="device")){
// 						html += "<td><strong>\"" + key +"\"</strong>: \"" + val[key] +"\"</td>\n";
// 						count++;
// 						lastwascoma=false;
				}
// 			}else if (getType(val[key]) == "array" || getType(val[key]) == "object" ) {
// 				if(key!= "component_stats"){
// // 					if (count != 1) html += ',<br>';
// // 					for (i = 0; i < level; i++) {
// // 						if (count != 1) html += '&emsp;';
// // 					}
// 					if(mtitle==true){
// 						if(count>1){
// 							html += "</table></div></td><br>\n";
// 							html += "<div><table style='border:1px solid black'>\n";// style='width:100%'>";
// 						}
// 					}
// 					html += (mtitle==true) ? "<tr><th><strong>\"" + key + "\"</strong>: </th>\n" :
// 						"<tr><td><strong>\"" + key + "\"</strong>: </td>\n";
// 					mtitle=false;
// 					count++;
// 					lastwascoma=false;
// 					html += "<td><div><table style='width:100%; border:0px solid black'>\n";// style='width:100%'>";
// 					html += jsontotable( ([ val[key] ]), count, true, level+1 ,lastwascoma,mtitle,filtered_fields);
// 					html += "</table></div></td>\n";
// 				}
// // 			}else if (getType(val[key]) == "object" ) {
// // 				html += jsontotable( ([ val[key] ]), count, false, level+1,lastwascoma,mtitle,filtered_fields);
// 			};
		});
		mtitle=true;
		countseries++;
	});
// 	if(first==true){ html += "<br>}"; }
	if(mainc==true)
		html += "</table></div>\n";
	return html;
}//jsontotable_rm_brief



function jsontotable_only_device_names(myjson,count,first,level,lastwascoma,mtitle,fields_toshow){
	var html ="";
	var i;
	var j=0;
	var previous_val_key="";
// 	if(first==true){ html ="{"; }
	var mainc=false;
	if(mtitle==true && level==1){
		mainc=true;
		html += "<div><table>\n";// style='border:1px solid black'>\n";// style='width:100%'>";
	}
	var countseries=0;
	myjson.forEach(function(val) {
// 		if (count != 1 && lastwascoma==false) {
// 			html += (countseries==0) ? ",<br>" : "<br>},{<br>";
// 		};//this is not the first element
		lastwascoma=true;
		var keys = Object.keys(val);
		keys.forEach(function(key) {
			if (getType(val[key]) == "string" || getType(val[key]) == "other" ){//other can be a numeric value
				var tobefiltered=true;
				for (i=0;i< fields_toshow.length;i++){
					if (key.endsWith(fields_toshow[i], key.length)== true) {
						tobefiltered=false;
					}
				}
				if (tobefiltered== false) {//it is stored the length of the strings, not need to show
// 					if (count != 1 && lastwascoma==false) html += ',<br>';
// 					for (i = 0; i < level; i++) {
// 						if (count != 1) html += '&emsp;';
// 					}
					if(mtitle==true){
// 						if(count>1){
// 							html += "</table></div></td><br>\n";
// 							html += "<div><table style='border:1px solid black'>\n";// style='width:100%'>";
// 						}
						if ((count==1) || ((count>1) && (previous_val_key!=val[key]))){
							html += "<tr><th><strong>\""+ key +"\"</strong>: \"" + val[key] +"\"</th></tr>\n";
						}
						previous_val_key=val[key];
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
// 					html += (mtitle==true) ? "<tr><th><strong>\"" + key + "\"</strong>: </th>\n" :
// 						"<tr><td><strong>\"" + key + "\"</strong>: </td>\n";
// 					mtitle=false;
// 					count++;
					lastwascoma=false;
// 					html += "<td><div><table style='width:100%; border:0px solid black'>\n";// style='width:100%'>";
					html += jsontotable_only_device_names( ([ val[key] ]), count, true, level+1 ,lastwascoma,mtitle,fields_toshow);
// 					html += "</table></div></td>\n";
			}else if (getType(val[key]) == "object" ) {
				html += jsontotable_only_device_names( ([ val[key] ]), count, false, level+1,lastwascoma,mtitle,fields_toshow);
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


function list_status_devices(mytype,devicename){
	// get_plugin_status localhost 9400 "node01";
	var url=build_resource_path()+"/query_device_status?device=\""+devicename+"\"";//?pretty='true'"; 
	list_results_with_token(mytype,url,["host"],["_length","WorkflowID", "ExperimentID", "TaskID"] );
	return false;
}

function list_mf_config_devices(mytype,devicename){
	// get_plugin_status localhost 9400 "node01";
	var url=build_resource_path()+"/query_device_mf_config?device=\""+devicename+"\"";//?pretty='true'";
	list_results_with_token(mytype,url,["platform_id"],["_length"] );
	return false;
}

function upload_device_with_token( UploadJSON ) {
	var url=build_resource_path()+"/register_new_device";
	upload_with_token( UploadJSON ,url);
	return false;
}
 
function update_device_with_token( UploadJSON ) {
	var url=build_resource_path()+"/update_device";
	upload_with_token( UploadJSON ,url);
	return false;
}

function list_devices(mytype,devicename){
	var url=build_resource_path()+"/get_device_list?device=\""+devicename+"\"";//?pretty='true'";
	list_results(mytype,url,["device"],["_length"]);
	return false;
}


function list_resource_logs(mytype,execid){
	var url = build_resource_path() + "/get_log_list?sorttype="+mytype+"&pretty='true'";
	list_results(mytype,url,["host"],["_length","_index","_type","_score","sort"]);
	return false;
}

