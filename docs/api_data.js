define({ "api": [
  {
    "type": "get",
    "url": "/get_device_list",
    "title": "Returns the list of devices",
    "version": "1.0.0",
    "name": "get_device_list",
    "group": "Access_to_register_of_devices",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers the default monitoring configuration for a device which is provided in a file in JSON-data format.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device",
            "description": "<p>OPTIONAL if provided will return the hardware description of device, alternatively will provide the description of all the registered devices.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XGET http://${server}:${port}/get_device_list?device=\"node01\";\n\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n {\n  \"device\":\"node01\",\"device_length\":6,\"cpu_type\":\"Intel_i3\",\"cpu_type_length\":8,\n   \"cpu_cores\":\"4\",\"ram_size_bytes\":\"1073741824\",\"gpu_type\":\"na\",\"gpu_type_length\":2,\n   \"fpga_type\":\"na\",\"fpga_type_length\":2,\"fpga_logic_gates\":\"0\",\n   \"hide\":\"false\",\"hide_length\":5,\n   \"ip\":\"0.0.0.0\",\"ip_length\":7,\"mac\":\"00:00:00:00:00:00\",\"mac_length\":17,\n   \"fpga_xadc\":\"0\",\"fpga_slice_regs_length\":1,\"fpga_xadc_length\":1,\n   \"fpga_slice_regs\":\"0\",\"cpu_cores_length\":1,\n   \"fpga_iob_length\":1,\"fpga_logic_gates_length\":1,\"fpga_iob\":\"0\",\n   \"disabled\":\"yes\",\"disabled_length\":3,\n   \"ram_size_bytes_length\":10,\n   \"gpu_cores_length\":1,\"gpu_cores\":\"0\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Access_to_register_of_devices"
  },
  {
    "type": "get",
    "url": "/_flush",
    "title": "It makes sure the data is stored in the database.",
    "version": "1.0.0",
    "name": "_flush",
    "group": "Administration",
    "permission": [
      {
        "name": "user at localhost"
      }
    ],
    "description": "<p>It makes sure the data is stored in the database, then responses from other requests executed immediately after it will return data consistent with any update done before the flush.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/_flush\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Report error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "get",
    "url": "/drop_db",
    "title": "drops the database of the server",
    "version": "1.0.0",
    "name": "drop_db",
    "group": "Administration",
    "permission": [
      {
        "name": "user at localhost"
      }
    ],
    "description": "<p>Deletes completely all the information stored at the database of server, it returns error if not exists the database to drop. Its use is restricted to request from the same machine where is running the server.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/drop_db\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Report error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "get",
    "url": "/new_db",
    "title": "Registers a new database of the server",
    "version": "1.0.0",
    "name": "new_db",
    "group": "Administration",
    "permission": [
      {
        "name": "user at localhost"
      }
    ],
    "description": "<p>Registers a new database of the server, it may return error if already exists. Its use is restricted to request from the same machine where is running the server.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/new_db\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Report error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/new_log",
    "title": "Registers a log.",
    "version": "1.0.0",
    "name": "new_log",
    "group": "Administration",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a log with the provided input parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>sucecss/error HTML code of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the user responsible of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": "<p>The ip from where the user ran the event. If not provided will store the ip from where is requested the new log.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The description of the event.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: text/plain\" -XPOST http://${server}:8000/new_log?code=111\\&ip=\"10.11.12.13\"\\&message=\"Some description\"\\&user=\"jaja@abc.com\"\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Register a new user and its password.",
    "version": "1.0.0",
    "name": "signup",
    "group": "Administration",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Update the password of an user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>MANDATORY this is the user_id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>MANDATORY it is the password of the user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://localhost:8000/signup?name=\"bob\"\\&email=\"bob@abc.commm\"\\&pw=\"1234\";\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response when missing mandatory parameters:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Response when not valid user/password:",
          "content": "HTTP/1.1 401 Not Authenticated",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/update_user",
    "title": "Update the password of an user",
    "version": "1.0.0",
    "name": "update_user",
    "group": "Administration",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Update the password of an user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>MANDATORY this is the user_id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>MANDATORY it is the password of the user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://localhost:8000/update_user?name=\"bob\"\\&email=\"bob@abc.commm\"\\&pw=\"1234\";\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response when missing mandatory parameters:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Response when not valid user/password:",
          "content": "HTTP/1.1 401 Not Authenticated",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Returns a new token",
    "version": "1.0.0",
    "name": "login",
    "group": "Security",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Returns a new encrypted token, with a limited lifetime, for the user_id if the user_id/password provided are valid.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>MANDATORY this is the user_id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>MANDATORY it is the password of the user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XGET http://localhost:8000/login?email=\"bob\"\\&pw=\"1234\" --output token.txt;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>token which consists on a encrypted text string.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response when missing mandatory parameters:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Response when not valid user/password:",
          "content": "HTTP/1.1 401 Not Authenticated",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Security"
  },
  {
    "type": "get",
    "url": "/verifytoken",
    "title": "Returns if the provided Token is valid or not",
    "version": "1.0.0",
    "name": "verifytoken",
    "group": "Security",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Verifies of the provided token is valid. Authorization Tokens are generated when user autenticates with an id and a password, the tokens are required for accessing to private content only if autenticated.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "the",
            "description": "<p>token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/verifytoken\nor alternatively when available SSL certificates:\ncurl -s -H \"Authorization: OAuth ${mytoken}\" -XGET https://${server}:${port}/verifytoken",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reponse",
            "description": "<p>The token is valid !!!.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Security"
  },
  {
    "type": "get",
    "url": "/verify_es_connection",
    "title": "Returns success (200) when the Server has connection or server-error(503) in other case",
    "version": "1.0.0",
    "name": "verify_es_connection",
    "group": "Testing_Functionality",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>The purpose is use for verifying the connectivity of the server with the ElasticSearch Database.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/verify_es_connection\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 503 Service Unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Testing_Functionality"
  },
  {
    "type": "post",
    "url": "/register_mf_config",
    "title": "Registers the default monitoring configuration for a device",
    "version": "1.0.0",
    "name": "register_mf_config",
    "group": "Update_register_of_MF",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers the default monitoring configuration for a device which is provided in a file in JSON-data format.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UploadJSON",
            "description": "<p>description of the default monitoring configuration for a device in a file in JSON-data format, to be merged with the already registered information (if any).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@device.json\" http://${server}:${port}/register_mf_config;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Update_register_of_MF"
  },
  {
    "type": "post",
    "url": "/register_new_device",
    "title": "Registers the hardware description of a NEW device.",
    "version": "1.0.0",
    "name": "register_new_device",
    "group": "Update_register_of_devices",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a NEW device which description is provided in a file in JSON-data format. Returns error if already registered.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UploadJSON",
            "description": "<p>description of the hardware in a file in JSON-data format.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@device.json\" http://${server}:${port}/register_new_device;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Update_register_of_devices"
  },
  {
    "type": "post",
    "url": "/update_device",
    "title": "Updated the hardware description of a registered/new device.",
    "version": "1.0.0",
    "name": "update_device",
    "group": "Update_register_of_devices",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a NEW device which description is provided in a file in JSON-data format.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UploadJSON",
            "description": "<p>description of the hardware in a file in JSON-data format, to be merged with the already registered information (if any).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@device.json\" http://${server}:${port}/update_device;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Update_register_of_devices"
  },
  {
    "type": "post",
    "url": "/update_device_json",
    "title": "Updates the hardware description of a registered/new device.",
    "version": "1.0.0",
    "name": "update_device_json",
    "group": "Update_register_of_devices",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a NEW device which description is provided in a file in JSON-data format.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UploadJSON",
            "description": "<p>description of the hardware in a file in JSON-data format, to be merged with the already registered information (if any).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@device.json\" http://${server}:${port}/update_device_json;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Update_register_of_devices"
  },
  {
    "type": "post",
    "url": "/update_status_json",
    "title": "Updates the hardware description of a registered/new device.",
    "version": "1.0.0",
    "name": "update_status_json",
    "group": "Update_register_of_devices",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a NEW device which description is provided in a file in JSON-data format.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mytoken",
            "description": "<p>the token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UploadJSON",
            "description": "<p>description of the hardware in a file in JSON-data format, to be merged with the already registered information (if any).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@device.json\" http://${server}:${port}/update_status_json;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Error message when the token is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/resomanager_app.js",
    "groupTitle": "Update_register_of_devices"
  }
] });
