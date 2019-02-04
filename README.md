# Resource-Manager
Server which keeps track of the Status of the Available hardware in the system

## 1.- Introduction
The PHANTOM Resource-MANAGER server is composed of two components: a web server (http://) and a WebSocket server (ws://). 
The web server provides various functionalities for data query and data analysis via RESTful APIs with documents in JSON format. 
The server's URL is "http://localhost:8600" by default.

## 2.- Prerequisites
The server is implemented using Node.js, and connects to Elasticsearch to store and access Metadata. 
Before you start installing the required components, please note that the installation and setup steps mentioned below assume that you are running a current Linux as the operating system. 
The installation was tested with Ubuntu 16.04 LTS.
Before you can proceed, please clone the repository:

```bash
git clone https://github.com/PHANTOM-Platform/Resource-Manager.git;
```

**OR** alternatively, if you prefer to use **svn** instead of git:

```bash
svn export https://github.com/PHANTOM-Platform/Resource-Manager.git/trunk Resource-Manager;
```

## Video: Examples of use

There are some video tutorials available at Youtube and this channel:

[Youtube PHANTOM Channel][youtube_phantom_channel]

## Acknowledgment
This project is realized through [EXCESS][excess] and [PHANTOM][phantom]. EXCESS is funded by the EU 7th Framework Programme (FP7/2013-2016) under grant agreement number 611183. The PHANTOM project receives funding under the European Union's Horizon 2020 Research and Innovation Programme under grant agreement number 688146.


## Main Contributors

**Montanana, Jose Miguel, HLRS**
+ [github/jmmontanana](https://github.com/jmmontanana)

**Cheptsov, Alexey, HLRS**
+ [github/alexey-cheptsov](https://github.com/alexey-cheptsov)


## License
Copyright (C) 2014,2015 University of Stuttgart

[Apache License v2](LICENSE).

[youtube_phantom_channel]: https://www.youtube.com/channel/UCtl2wQYh_Nj3HbyFoM1XHqQ/videos
[client]: https://github.com/PHANTOM-Platform/Monitoring/tree/master/Monitoring_client
[server]: https://github.com/PHANTOM-Platform/Monitoring/tree/master/Monitoring_server
[excess]: http://www.excess-project.eu
[phantom]: http://www.phantom-project.org
