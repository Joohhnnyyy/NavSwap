
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Ingestion Service API",
      "version": "1.0.0",
      "description": "API documentation for the Ingestion Service"
    },
    "servers": [
      {
        "url": "http://localhost:3001",
        "description": "Ingestion Service"
      }
    ],
    "paths": {
      "/health": {
        "get": {
          "summary": "Health check",
          "tags": [
            "Health"
          ],
          "responses": {
            "200": {
              "description": "Service health"
            }
          }
        }
      },
      "/ingest/station": {
        "post": {
          "summary": "Ingest station telemetry",
          "tags": [
            "Ingestion"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "responses": {
            "202": {
              "description": "Telemetry ingested"
            }
          }
        }
      },
      "/ingest/station/batch": {
        "post": {
          "summary": "Batch ingest station telemetry",
          "tags": [
            "Ingestion"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "responses": {
            "202": {
              "description": "Batch ingested"
            }
          }
        }
      },
      "/ingest/health": {
        "post": {
          "summary": "Ingest station health",
          "tags": [
            "Ingestion"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "responses": {
            "202": {
              "description": "Health data ingested"
            }
          }
        }
      },
      "/ingest/grid": {
        "post": {
          "summary": "Ingest grid status",
          "tags": [
            "Ingestion"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "responses": {
            "202": {
              "description": "Grid status ingested"
            }
          }
        }
      },
      "/ingest/user-context": {
        "post": {
          "summary": "Ingest user context",
          "tags": [
            "Ingestion"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "responses": {
            "202": {
              "description": "User context ingested"
            }
          }
        }
      }
    },
    "components": {},
    "tags": [
      {
        "name": "Ingestion",
        "description": "Data ingestion endpoints"
      },
      {
        "name": "Health",
        "description": "Health endpoints"
      }
    ]
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
