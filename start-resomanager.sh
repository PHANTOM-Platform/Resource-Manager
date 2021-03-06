#!/bin/bash
#npm install express --save
#npm install cors --save
#npm install body-parser --save
#npm install jwt-simple --save
#npm install moment --save
#npm install express-fileupload --save
#npm install https --save
#npm install http --save

#GLOBAL VARIABLES
	app=`basename $0`;
	SERVER_DIR=~/phantom_servers/;
	BASE_DIR=`dirname $0`;
	cd ${BASE_DIR};
	BASE_DIR=`pwd`;
	TMP_DIR=${SERVER_DIR}/tmp;
	DIST_DIR=${SERVER_DIR}/dist;
	resomanager_port=8600;
	cd server_code;
# IF THE SERVER WAS RUNNING, WE STOP IT BEFORE START A NEW INSTANCE
	bash ../stop-resomanager.sh
# START A NEW INSTACE OF THE APPMANAGER
	if [ ! -d node_modules ]; then
		ln -s ~/phantom_servers/node_modules node_modules;
	fi;
	${DIST_DIR}/nodejs/bin/node resomanager_app.js &
	pid=$!;
	echo "pid if the server is ${pid}";
	echo ${pid} > ${TMP_DIR}/resomanager.pid;
	sleep 1;
# CHECK IF THE RESOURCE MANAGER IS RUNNING
	let "j=0";
	HTTP_STATUS=$(curl -s -w %{http_code} http://localhost:${resomanager_port})
	while [[ ${HTTP_STATUS} != *"200"* ]] && [ ${j} -lt 30 ] ; do
			echo -n "$j. "; let "j += 1 ";  sleep 1;
			HTTP_STATUS=$(curl -s -w %{http_code} http://localhost:${resomanager_port})
	done;
	
	if [ ${j} -ge 30 ]; then
			echo "[ERROR]: RESOURCE MANAGER doesn't started.";
			exit;
	fi;
	echo ; #Here, we will show the current version of the running PHANTOM RESOURCE MANAGER
	curl http://localhost:${resomanager_port};
	echo -e "\n\n";
