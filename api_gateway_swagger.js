
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
      "title": "EV Charging Platform API",
      "version": "1.0.0",
      "description": "API documentation for the EV Charging Platform"
    },
    "servers": [
      {
        "url": "http://localhost:3000",
        "description": "API Gateway"
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
      },
      "/recommend": {
        "get": {
          "summary": "Get recommendations",
          "tags": [
            "Recommendation"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "userId",
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "lat",
              "schema": {
                "type": "number"
              }
            },
            {
              "in": "query",
              "name": "lon",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Recommendation response"
            }
          }
        },
        "post": {
          "summary": "Get recommendations (POST)",
          "tags": [
            "Recommendation"
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
            "200": {
              "description": "Recommendation response"
            }
          }
        }
      },
      "/station/{id}/score": {
        "get": {
          "summary": "Get station score",
          "tags": [
            "Admin"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Station score"
            }
          }
        }
      },
      "/station/{id}/health": {
        "get": {
          "summary": "Get station health",
          "tags": [
            "Admin"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Station health"
            }
          }
        }
      },
      "/admin/summary": {
        "get": {
          "summary": "Get admin summary",
          "tags": [
            "Admin"
          ],
          "responses": {
            "200": {
              "description": "Admin summary"
            }
          }
        }
      },
      "/admin/metrics": {
        "get": {
          "summary": "Get system metrics",
          "tags": [
            "Admin"
          ],
          "responses": {
            "200": {
              "description": "System metrics"
            }
          }
        }
      },
      "/admin/stations": {
        "get": {
          "summary": "List all stations",
          "tags": [
            "Admin"
          ],
          "responses": {
            "200": {
              "description": "List of stations"
            }
          }
        }
      },
      "/admin/events": {
        "get": {
          "summary": "Get system events",
          "tags": [
            "Admin"
          ],
          "responses": {
            "200": {
              "description": "System events"
            }
          }
        }
      }
    },
    "components": {},
    "tags": [
      {
        "name": "Health",
        "description": "Health and readiness endpoints"
      },
      {
        "name": "Ingestion",
        "description": "Data ingestion endpoints"
      },
      {
        "name": "Recommendation",
        "description": "Recommendation endpoints"
      },
      {
        "name": "Admin",
        "description": "Admin and metrics endpoints"
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
