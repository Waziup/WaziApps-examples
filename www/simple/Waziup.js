var Waziup =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _superagent = __webpack_require__(24);

var _superagent2 = _interopRequireDefault(_superagent);

var _querystring = __webpack_require__(31);

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
 * application to use this class directly - the *Api and model classes provide the public API for the service. The
 * contents of this file should be regarded as internal but are documented for completeness.
 * @alias module:ApiClient
 * @class
 */
var _exports = function _exports() {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default http://127.0.0.1:3000/api/v1
     */
    this.basePath = 'http://127.0.0.1:3000/api/v1'.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
        'Bearer': { type: 'apiKey', 'in': 'header', name: 'Authorization' }
    };
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {};

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;

    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */
    this.enableCookies = false;

    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */
    if (typeof window === 'undefined') {
        this.agent = new _superagent2.default.agent();
    }
};

/**
 * Returns a string representation for an actual parameter.
 * @param param The actual parameter.
 * @returns {String} The string representation of <code>param</code>.
 */
_exports.prototype.paramToString = function (param) {
    if (param == undefined || param == null) {
        return '';
    }
    if (param instanceof Date) {
        return param.toJSON();
    }
    return param.toString();
};

/**
 * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
 * NOTE: query parameters are not handled here.
 * @param {String} path The path to append to the base URL.
 * @param {Object} pathParams The parameter values to append.
 * @returns {String} The encoded path with parameter values substituted.
 */
_exports.prototype.buildUrl = function (path, pathParams) {
    if (!path.match(/^\//)) {
        path = '/' + path;
    }
    var url = this.basePath + path;
    var _this = this;
    url = url.replace(/\{([\w-]+)\}/g, function (fullMatch, key) {
        var value;
        if (pathParams.hasOwnProperty(key)) {
            value = _this.paramToString(pathParams[key]);
        } else {
            value = fullMatch;
        }
        return encodeURIComponent(value);
    });
    return url;
};

/**
 * Checks whether the given content type represents JSON.<br>
 * JSON content type examples:<br>
 * <ul>
 * <li>application/json</li>
 * <li>application/json; charset=UTF8</li>
 * <li>APPLICATION/JSON</li>
 * </ul>
 * @param {String} contentType The MIME content type to check.
 * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
 */
_exports.prototype.isJsonMime = function (contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
};

/**
 * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
 * @param {Array.<String>} contentTypes
 * @returns {String} The chosen content type, preferring JSON.
 */
_exports.prototype.jsonPreferredMime = function (contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
        if (this.isJsonMime(contentTypes[i])) {
            return contentTypes[i];
        }
    }
    return contentTypes[0];
};

/**
 * Checks whether the given parameter value represents file-like content.
 * @param param The parameter to check.
 * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
 */
_exports.prototype.isFileParam = function (param) {
    // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
    if (true) {
        var fs;
        try {
            fs = __webpack_require__(34);
        } catch (err) {}
        if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
            return true;
        }
    }
    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
        return true;
    }
    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
        return true;
    }
    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
        return true;
    }
    return false;
};

/**
 * Normalizes parameter values:
 * <ul>
 * <li>remove nils</li>
 * <li>keep files and arrays</li>
 * <li>format to string with `paramToString` for other cases</li>
 * </ul>
 * @param {Object.<String, Object>} params The parameters as object properties.
 * @returns {Object.<String, Object>} normalized parameters.
 */
_exports.prototype.normalizeParams = function (params) {
    var newParams = {};
    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
            var value = params[key];
            if (this.isFileParam(value) || Array.isArray(value)) {
                newParams[key] = value;
            } else {
                newParams[key] = this.paramToString(value);
            }
        }
    }
    return newParams;
};

/**
 * Enumeration of collection format separator strategies.
 * @enum {String}
 * @readonly
 */
_exports.CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',
    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',
    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',
    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',
    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi'
};

/**
 * Builds a string representation of an array-type actual parameter, according to the given collection format.
 * @param {Array} param An array parameter.
 * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
 * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
 * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
 */
_exports.prototype.buildCollectionParam = function buildCollectionParam(param, collectionFormat) {
    if (param == null) {
        return null;
    }
    switch (collectionFormat) {
        case 'csv':
            return param.map(this.paramToString).join(',');
        case 'ssv':
            return param.map(this.paramToString).join(' ');
        case 'tsv':
            return param.map(this.paramToString).join('\t');
        case 'pipes':
            return param.map(this.paramToString).join('|');
        case 'multi':
            // return the array directly as SuperAgent will handle it as expected
            return param.map(this.paramToString);
        default:
            throw 'Unknown collection format: ' + collectionFormat;
    }
};

/**
 * Applies authentication headers to the request.
 * @param {Object} request The request object created by a <code>superagent()</code> call.
 * @param {Array.<String>} authNames An array of authentication method names.
 */
_exports.prototype.applyAuthToRequest = function (request, authNames) {
    var _this = this;
    authNames.forEach(function (authName) {
        var auth = _this.authentications[authName];
        switch (auth.type) {
            case 'basic':
                if (auth.username || auth.password) {
                    request.auth(auth.username || '', auth.password || '');
                }
                break;
            case 'apiKey':
                if (auth.apiKey) {
                    var data = {};
                    if (auth.apiKeyPrefix) {
                        data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
                    } else {
                        data[auth.name] = auth.apiKey;
                    }
                    if (auth['in'] === 'header') {
                        request.set(data);
                    } else {
                        request.query(data);
                    }
                }
                break;
            case 'oauth2':
                if (auth.accessToken) {
                    request.set({ 'Authorization': 'Bearer ' + auth.accessToken });
                }
                break;
            default:
                throw 'Unknown authentication type: ' + auth.type;
        }
    });
};

/**
 * Deserializes an HTTP response body into a value of the specified type.
 * @param {Object} response A SuperAgent response object.
 * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
 * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
 * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
 * all properties on <code>data<code> will be converted to this type.
 * @returns A value of the specified type.
 */
_exports.prototype.deserialize = function deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
        return null;
    }
    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.body;
    if (data == null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
        // SuperAgent does not always produce a body; use the unparsed response as a fallback
        data = response.text;
    }
    return _exports.convertToType(data, returnType);
};

/**
 * Invokes the REST service using the supplied settings and parameters.
 * @param {String} path The base URL to invoke.
 * @param {String} httpMethod The HTTP method to use.
 * @param {Object.<String, String>} pathParams A map of path parameters and their values.
 * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
 * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
 * @param {Object.<String, Object>} formParams A map of form parameters and their values.
 * @param {Object} bodyParam The value to pass as the request body.
 * @param {Array.<String>} authNames An array of authentication type names.
 * @param {Array.<String>} contentTypes An array of request MIME types.
 * @param {Array.<String>} accepts An array of acceptable response MIME types.
 * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
 * constructor for a complex type.
 * @returns {Object} The SuperAgent request object.
 */
_exports.prototype.callApi = async function callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType) {

    var _this = this;
    var url = this.buildUrl(path, pathParams);
    var request = (0, _superagent2.default)(httpMethod, url);

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
    }
    request.query(this.normalizeParams(queryParams));

    // set header parameters
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));

    // set request timeout
    request.timeout(this.timeout);

    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
        // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
        if (contentType != 'multipart/form-data') {
            request.type(contentType);
        }
    } else if (!request.header['Content-Type']) {
        request.type('application/json');
    }

    if (contentType === 'application/x-www-form-urlencoded') {
        request.send(_querystring2.default.stringify(this.normalizeParams(formParams)));
    } else if (contentType == 'multipart/form-data') {
        var _formParams = this.normalizeParams(formParams);
        for (var key in _formParams) {
            if (_formParams.hasOwnProperty(key)) {
                if (this.isFileParam(_formParams[key])) {
                    // file field
                    request.attach(key, _formParams[key]);
                } else {
                    request.field(key, _formParams[key]);
                }
            }
        }
    } else if (bodyParam) {
        request.send(bodyParam);
    }

    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
        request.accept(accept);
    }

    if (returnType === 'Blob') {
        request.responseType('blob');
    } else if (returnType === 'String') {
        request.responseType('string');
    }

    // Attach previously saved cookies, if enabled
    if (this.enableCookies) {
        if (typeof window === 'undefined') {
            this.agent.attachCookies(request);
        } else {
            request.withCredentials();
        }
    }

    return new Promise(function (resolve, reject) {
        request.end(function (error, response) {
            var data = null;
            if (!error) {
                try {
                    data = _this.deserialize(response, returnType);
                    if (_this.enableCookies && typeof window === 'undefined') {
                        _this.agent.saveCookies(response);
                    }
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(error);
            }
        });
    });
};

/**
 * Parses an ISO-8601 string representation of a date value.
 * @param {String} str The date value as a string.
 * @returns {Date} The parsed date object.
 */
_exports.parseDate = function (str) {
    return new Date(str.replace(/T/i, ' '));
};

/**
 * Converts a value to the specified type.
 * @param {(String|Object)} data The data to convert, as a string or object.
 * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
 * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
 * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
 * all properties on <code>data<code> will be converted to this type.
 * @returns An instance of the specified type or null or undefined if data is null or undefined.
 */
_exports.convertToType = function (data, type) {
    if (data === null || data === undefined) return data;
    switch (type) {
        case 'Boolean':
            return Boolean(data);
        case 'Integer':
            return parseInt(data, 10);
        case 'Number':
            return parseFloat(data);
        case 'String':
            return String(data);
        case 'Date':
            return this.parseDate(String(data));
        case 'Blob':
            return data;
        default:
            if (type === Object) {
                // generic object, return directly
                return data;
            } else if (typeof type === 'function') {
                // for model type like: User
                return type.constructFromObject(data);
            } else if (Array.isArray(type)) {
                // for array type like: ['String']
                var itemType = type[0];
                return data.map(function (item) {
                    return _exports.convertToType(item, itemType);
                });
            } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
                // for plain object type like: {'String': 'Integer'}
                var keyType, valueType;
                for (var k in type) {
                    if (type.hasOwnProperty(k)) {
                        keyType = k;
                        valueType = type[k];
                        break;
                    }
                }
                var result = {};
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        var key = _exports.convertToType(k, keyType);
                        var value = _exports.convertToType(data[k], valueType);
                        result[key] = value;
                    }
                }
                return result;
            } else {
                // for unknown type, return the data directly
                return data;
            }
    }
};

/**
 * Constructs a new map or array model from REST data.
 * @param data {Object|Array} The REST data.
 * @param obj {Object|Array} The target object or array.
 */
_exports.constructFromObject = function (data, obj, itemType) {
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i)) obj[i] = _exports.convertToType(data[i], itemType);
        }
    } else {
        for (var k in data) {
            if (data.hasOwnProperty(k)) obj[k] = _exports.convertToType(data[k], itemType);
        }
    }
};

/**
 * The default API client implementation.
 * @type {module:ApiClient}
 */
_exports.instance = new _exports();

exports.default = _exports;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>Error</code>.
 * @alias module:model/Error
 * @class
 */
var _exports = function _exports() {
  var _this = this;
};

/**
 * Constructs a <code>Error</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Error} obj Optional instance to populate.
 * @return {module:model/Error} The populated <code>Error</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('code')) {
      obj['code'] = _ApiClient2.default.convertToType(data['code'], 'Number');
    }
    if (data.hasOwnProperty('message')) {
      obj['message'] = _ApiClient2.default.convertToType(data['message'], 'String');
    }
    if (data.hasOwnProperty('fields')) {
      obj['fields'] = _ApiClient2.default.convertToType(data['fields'], 'String');
    }
  }
  return obj;
};

/**
 * @member {Number} code
 */
_exports.prototype['code'] = undefined;
/**
 * @member {String} message
 */
_exports.prototype['message'] = undefined;
/**
 * @member {String} fields
 */
_exports.prototype['fields'] = undefined;

exports.default = _exports;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>Location</code>.
 * location is a pair [latitude, longitude] with the coordinates on earth in decimal notation (e.g. [40.418889, 35.89389]).
 * @alias module:model/Location
 * @class
 */
var _exports = function _exports(latitude, longitude) {
  var _this = this;

  _this['latitude'] = latitude;
  _this['longitude'] = longitude;
};

/**
 * Constructs a <code>Location</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Location} obj Optional instance to populate.
 * @return {module:model/Location} The populated <code>Location</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('latitude')) {
      obj['latitude'] = _ApiClient2.default.convertToType(data['latitude'], 'Number');
    }
    if (data.hasOwnProperty('longitude')) {
      obj['longitude'] = _ApiClient2.default.convertToType(data['longitude'], 'Number');
    }
  }
  return obj;
};

/**
 * @member {Number} latitude
 */
_exports.prototype['latitude'] = undefined;
/**
 * @member {Number} longitude
 */
_exports.prototype['longitude'] = undefined;

exports.default = _exports;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _MeasurementValue = __webpack_require__(5);

var _MeasurementValue2 = _interopRequireDefault(_MeasurementValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>Measurement</code>.
 * @alias module:model/Measurement
 * @class
 */
var _exports = function _exports(id) {
  var _this = this;

  _this['id'] = id;
};

/**
 * Constructs a <code>Measurement</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Measurement} obj Optional instance to populate.
 * @return {module:model/Measurement} The populated <code>Measurement</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('id')) {
      obj['id'] = _ApiClient2.default.convertToType(data['id'], 'String');
    }
    if (data.hasOwnProperty('name')) {
      obj['name'] = _ApiClient2.default.convertToType(data['name'], 'String');
    }
    if (data.hasOwnProperty('last_value')) {
      obj['last_value'] = _ApiClient2.default.convertToType(data['last_value'], 'Number');
    }
    if (data.hasOwnProperty('timestamp')) {
      obj['timestamp'] = _ApiClient2.default.convertToType(data['timestamp'], 'String');
    }
    if (data.hasOwnProperty('sensing_device')) {
      obj['sensing_device'] = _ApiClient2.default.convertToType(data['sensing_device'], 'String');
    }
    if (data.hasOwnProperty('quantity_kind')) {
      obj['quantity_kind'] = _ApiClient2.default.convertToType(data['quantity_kind'], 'String');
    }
    if (data.hasOwnProperty('unit')) {
      obj['unit'] = _ApiClient2.default.convertToType(data['unit'], 'String');
    }
    if (data.hasOwnProperty('values')) {
      obj['values'] = _ApiClient2.default.convertToType(data['values'], [_MeasurementValue2.default]);
    }
  }
  return obj;
};

/**
 * ID of the measurement
 * @member {String} id
 */
_exports.prototype['id'] = undefined;
/**
 * name of the measurement
 * @member {String} name
 */
_exports.prototype['name'] = undefined;
/**
 * last value measured
 * @member {String} last_value 
 */
_exports.prototype['last_value'] = undefined;
/**
 * timestamp of the last value measured
 * @member {String} timestamp 
 */
_exports.prototype['timestamp'] = undefined;
/**
 * quantity kind measured
 * @member {model/QuantityKinds} quantity_kind 
 */
_exports.prototype['quantity_kind'] = undefined;
/**
 * unit of the measurement
 * @member {model/Units} unit
 */
_exports.prototype['unit'] = undefined;
/**
 * kind of sensor providing the measurement
 * @member {model/SensingDevices} sensing_device 
 */
_exports.prototype['sensing_device'] = undefined;
/**
 * @member {Array.<module:model/MeasurementValue>} values
 */
_exports.prototype['values'] = undefined;

exports.default = _exports;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>MeasurementValue</code>.
 * @alias module:model/MeasurementValue
 * @class
 */
var _exports = function _exports(value, timestamp) {
  var _this = this;
  _this['value'] = value;
  _this['timestamp'] = timestamp;
};

/**
 * Constructs a <code>MeasurementValue</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/MeasurementValue} obj Optional instance to populate.
 * @return {module:model/MeasurementValue} The populated <code>MeasurementValue</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('value')) {
      obj['value'] = _ApiClient2.default.convertToType(data['value'], 'Number');
    }
    if (data.hasOwnProperty('timestamp')) {
      obj['timestamp'] = _ApiClient2.default.convertToType(data['timestamp'], 'String');
    }
  }
  return obj;
};

/**
 * value of the measurement
 * @member {Number} value
 */
_exports.prototype['value'] = undefined;
/**
 * time of the measurement
 * @member {String} timestamp
 */
_exports.prototype['timestamp'] = undefined;

exports.default = _exports;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>SocialMessageBatch</code>.
 * A message to be sent to several users and socials
 * @alias module:model/SocialMessageBatch
 * @class
 * @param channels {Array.<String>} channels where to send the messages
 * @param message {String} 
 */
var _exports = function _exports(channels, message, usernames) {
  var _this = this;

  _this['channels'] = channels;
  _this['message'] = message;
  _this['usernames'] = usernames;
};

/**
 * Constructs a <code>SocialMessageBatch</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/SocialMessageBatch} obj Optional instance to populate.
 * @return {module:model/SocialMessageBatch} The populated <code>SocialMessageBatch</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('usernames')) {
      obj['usernames'] = _ApiClient2.default.convertToType(data['usernames'], ['String']);
    }
    if (data.hasOwnProperty('channels')) {
      obj['channels'] = _ApiClient2.default.convertToType(data['channels'], ['String']);
    }
    if (data.hasOwnProperty('message')) {
      obj['message'] = _ApiClient2.default.convertToType(data['message'], 'String');
    }
  }
  return obj;
};

/**
 * names of the destination users
 * @member {Array.<String>} usernames
 */
_exports.prototype['usernames'] = undefined;
/**
 * channels where to send the messages
 * @member {Array.<String>} channels
 */
_exports.prototype['channels'] = undefined;
/**
 * @member {String} message
 */
_exports.prototype['message'] = undefined;

exports.default = _exports;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>AuthBody</code>.
 * @alias module:model/AuthBody
 * @class
 * @param username {String} username
 * @param password {String} password
 */
var _exports = function _exports(username, password) {
  var _this = this;

  _this['username'] = username;
  _this['password'] = password;
};

/**
 * Constructs a <code>AuthBody</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/AuthBody} obj Optional instance to populate.
 * @return {module:model/AuthBody} The populated <code>AuthBody</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('username')) {
      obj['username'] = _ApiClient2.default.convertToType(data['username'], 'String');
    }
    if (data.hasOwnProperty('password')) {
      obj['password'] = _ApiClient2.default.convertToType(data['password'], 'String');
    }
  }
  return obj;
};

/**
 * username
 * @member {String} username
 */
_exports.prototype['username'] = undefined;
/**
 * password
 * @member {String} password
 */
_exports.prototype['password'] = undefined;

exports.default = _exports;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>Domain</code>.
 * @alias module:model/Domain
 * @class
 */
var _exports = function _exports() {
  var _this = this;
};

/**
 * Constructs a <code>Domain</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Domain} obj Optional instance to populate.
 * @return {module:model/Domain} The populated <code>Domain</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('id')) {
      obj['id'] = _ApiClient2.default.convertToType(data['id'], 'String');
    }
  }
  return obj;
};

/**
 * @member {String} id
 */
_exports.prototype['id'] = undefined;

exports.default = _exports;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _NotificationSubject = __webpack_require__(10);

var _NotificationSubject2 = _interopRequireDefault(_NotificationSubject);

var _SocialMessageBatch = __webpack_require__(6);

var _SocialMessageBatch2 = _interopRequireDefault(_SocialMessageBatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>Notification</code>.
 * @alias module:model/Notification
 * @class
 * @param subject {module:model/NotificationSubject} 
 * @param notification {module:model/SocialMessageBatch} 
 */
var _exports = function _exports(subject, description, notification, throttling) {
  var _this = this;

  _this['subject'] = subject;
  _this['notification'] = notification;
  _this['description'] = description;
  _this['throttling'] = throttling;
};

/**
 * Constructs a <code>Notification</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Notification} obj Optional instance to populate.
 * @return {module:model/Notification} The populated <code>Notification</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('id')) {
      obj['id'] = _ApiClient2.default.convertToType(data['id'], 'String');
    }
    if (data.hasOwnProperty('description')) {
      obj['description'] = _ApiClient2.default.convertToType(data['description'], 'String');
    }
    if (data.hasOwnProperty('subject')) {
      obj['subject'] = _NotificationSubject2.default.constructFromObject(data['subject']);
    }
    if (data.hasOwnProperty('notification')) {
      obj['notification'] = _SocialMessageBatch2.default.constructFromObject(data['notification']);
    }
    if (data.hasOwnProperty('throttling')) {
      obj['throttling'] = _ApiClient2.default.convertToType(data['throttling'], 'Number');
    }
  }
  return obj;
};

/**
 * Description of the notification
 * @member {String} description
 */
_exports.prototype['description'] = undefined;
/**
 * @member {module:model/NotificationSubject} subject
 */
_exports.prototype['subject'] = undefined;
/**
 * @member {module:model/SocialMessageBatch} notification
 */
_exports.prototype['notification'] = undefined;
/**
 * minimum interval between two messages in seconds
 * @member {Number} throttling
 */
_exports.prototype['throttling'] = undefined;

exports.default = _exports;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _NotificationCondition = __webpack_require__(11);

var _NotificationCondition2 = _interopRequireDefault(_NotificationCondition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>NotificationSubject</code>.
 * @alias module:model/NotificationSubject
 * @class
 * @param condition {module:model/NotificationCondition} 
 */
var _exports = function _exports(entityNames, condition) {
  var _this = this;

  _this['entityNames'] = entityNames;
  _this['condition'] = condition;
};

/**
 * Constructs a <code>NotificationSubject</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/NotificationSubject} obj Optional instance to populate.
 * @return {module:model/NotificationSubject} The populated <code>NotificationSubject</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('entityNames')) {
      obj['entityNames'] = _ApiClient2.default.convertToType(data['entityNames'], ['String']);
    }
    if (data.hasOwnProperty('condition')) {
      obj['condition'] = _NotificationCondition2.default.constructFromObject(data['condition']);
    }
  }
  return obj;
};

/**
 * @member {Array.<String>} entityNames
 */
_exports.prototype['entityNames'] = undefined;
/**
 * @member {module:model/NotificationCondition} condition
 */
_exports.prototype['condition'] = undefined;

exports.default = _exports;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>NotificationCondition</code>.
 * @alias module:model/NotificationCondition
 * @class
 */
var _exports = function _exports(attrs, expression) {
  var _this = this;

  _this['attrs'] = attrs;
  _this['expression'] = expression;
};

/**
 * Constructs a <code>NotificationCondition</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/NotificationCondition} obj Optional instance to populate.
 * @return {module:model/NotificationCondition} The populated <code>NotificationCondition</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('attrs')) {
      obj['attrs'] = _ApiClient2.default.convertToType(data['attrs'], ['String']);
    }
    if (data.hasOwnProperty('expression')) {
      obj['expression'] = _ApiClient2.default.convertToType(data['expression'], 'String');
    }
  }
  return obj;
};

/**
 * @member {Array.<String>} attrs
 */
_exports.prototype['attrs'] = undefined;
/**
 * @member {String} expression
 */
_exports.prototype['expression'] = undefined;

exports.default = _exports;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Units = __webpack_require__(13);

var _Units2 = _interopRequireDefault(_Units);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Quantity kind list
  Generated from FIESTA IoT ontology with this Jena SPARQL script:
  1 PREFIX qu:<http://purl.org/NET/ssnx/qu/qu#>
  2 PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
  3 PREFIX ssn:<http://purl.oclc.org/NET/ssnx/ssn#>
  4 SELECT (strafter(str(?subClass), "#") AS ?quantityKind)
  5 WHERE { ?subClass rdfs:subClassOf* ssn:SensingDevice. } 
  $ bin/sparql --data=http://ontology.fiesta-iot.eu/ontologyDocs/fiesta-iot.owl --query=./rq --results=TSV
  Reference paper: R. Agarwal, D. Farnandez, T. Elsaleh, A.Gyrard, J. Lanza, L. Sanchez, N. Georgantas, V. Issarny, "Unified IoT Ontology to Enable Interoperability and Federation of Testbeds", 3rd IEEE WF-IoT, pp. 70-75, Reston USA, 12-14 December 2016
*/

var dic = [{ id: "Acceleration", label: "Acceleration", units: ["MetrePerSecondSquare"] }, { id: "AccelerationInstantaneous", label: "Acceleration instantaneous", units: ["MetrePerSecondSquare"] }, { id: "ActivePower", label: "Active power", units: ["Watt"] }, { id: "AirPollution", label: "Air pollution", units: ["PartsPerBillion"] }, { id: "AirQuality", label: "Air quality", units: ["EAQI"] }, { id: "AirTemperature", label: "Air temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "AirHumidity", label: "Air humidity", units: ["Percent"] }, { id: "AlcoholLevel", label: "Alcohol level", units: ["Percent"] }, { id: "AngularSpeed", label: "Angular speed", units: ["RadianPerSecond", "RevolutionsPerMinute"] }, { id: "AtmosphericPressure", label: "Atmospheric pressure", units: ["Pascal", "Bar", "Centibar", "Millibar", "MillimetreMercure"] }, { id: "BatteryLevel", label: "Battery level", units: ["Volt", "Millivolt", "Microvolt"] }, { id: "BloodGlucose", label: "Blood glucose", units: ["MmolPerLitre"] }, { id: "BloodPressure", label: "Blood pressure", units: ["MmHg", "Pascal"] }, { id: "BoardTemperature", label: "Board temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "BodyTemperature", label: "Body temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "BuildingTemperature", label: "Building temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "Capacitance", label: "Capacitance", units: ["Farad"] }, { id: "ChemicalAgentAtmosphericConcentration", label: "Chemical agent atmospheric concentration", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationAirParticles", label: "Chemical agent atmospheric concentration air particles", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationCO", label: "Chemical agent atmospheric concentration CO", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationDust", label: "Chemical agent atmospheric concentration Dust", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationNH3", label: "Chemical agent atmospheric concentration NH3", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationNO", label: "Chemical agent atmospheric concentration NO", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationNO2", label: "Chemical agent atmospheric concentration NO2", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationO3", label: "Chemical agent atmospheric concentration O3", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationSO2", label: "Chemical agent atmospheric concentration SO2", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentAtmosphericConcentrationVOC", label: "Chemical agent atmospheric concentration VOC", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentConcentration", label: "Chemical agent concentration", units: ["MicrogramPerCubicMetre", "MilligramPerCubicMetre", "PartsPerBillion", "PartsPerMillion"] }, { id: "ChemicalAgentWaterConcentration", label: "Chemical agent water concentration", units: ["MilligramPerLitre", "MilligramPerCubicMetre", "GramPerLitre"] }, { id: "ChemicalAgentWaterConcentrationNH4Ion", label: "Chemical agent water concentration NH4 ion", units: ["MilligramPerLitre", "MilligramPerCubicMetre", "GramPerLitre"] }, { id: "ChemicalAgentWaterConcentrationNO3Ion", label: "Chemical agent water concentration NO3 ion", units: ["MilligramPerLitre", "MilligramPerCubicMetre", "GramPerLitre"] }, { id: "ChemicalAgentWaterConcentrationO2", label: "Chemical agent water concentration O2", units: ["MilligramPerLitre", "MilligramPerCubicMetre", "GramPerLitre"] }, { id: "Cholesterol", label: "Cholesterol", units: ["MmolPerLitre", "MilligramPerDecilitre", "MilligramPerLitre"] }, { id: "CloudCover", label: "Cloud cover", units: ["Okta"] }, { id: "CO2", label: "CO2", units: ["PartsPerMillion", "Percent"] }, { id: "Conductivity", label: "Conductivity", units: ["SiemensPerMetre"] }, { id: "Count", label: "Count", units: ["Dimensionless"] }, { id: "CountAvailableVehicles", label: "Count available vehicles", units: ["Dimensionless"] }, { id: "CountEmptyDockingPoints", label: "Count empty docking points", units: ["Dimensionless"] }, { id: "CountPeople", label: "Count people", units: ["Dimensionless"] }, { id: "DeltaDewPoint", label: "Delta dew point", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "DeviceUptime", label: "Device uptime", units: ["SecondTime", "MinuteTime", "Hour", "Year"] }, { id: "DewPoint", label: "Dew point", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "DewPointTemperature", label: "Dew point temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "DirectionOfArrival", label: "Direction of arrival", units: ["DegreeAngle", "Radian"] }, { id: "Distance", label: "Distance", units: ["Metre", "Kilometre", "Millimetre", "Centimetre"] }, { id: "DistanceNextVehicle", label: "Distance next vehicle", units: ["Metre", "Kilometre", "Millimetre", "Centimetre"] }, { id: "DoorStatus", label: "Door status", units: ["Dimensionless"] }, { id: "ElectricalResistance", label: "Electrical resistance", units: ["Ohm"] }, { id: "ElectricCharge", label: "Electric charge", units: ["Coulomb"] }, { id: "ElectricCurrent", label: "Electric current", units: ["Ampere"] }, { id: "ElectricField", label: "Electric field", units: ["VoltPerMeter"] }, { id: "ElectricPotential", label: "Electric potential", units: ["Volt"] }, { id: "Energy", label: "Energy", units: ["Joule", "KiloWattHour"] }, { id: "FillLevel", label: "Fill level", units: ["Percent"] }, { id: "FillLevelGasTank", label: "Fill level gas tank", units: ["Percent "] }, { id: "FillLevelWasteContainer", label: "Fill level waste container", units: ["Percent "] }, { id: "FoodTemperature", label: "Food temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "Frequency", label: "Frequency", units: ["Hertz"] }, { id: "FuelConsumption", label: "Fuel consumption", units: ["Litre", "LitrePer100Kilometres"] }, { id: "FuelConsumptionInstantaneous", label: "Fuel consumption instantaneous", units: ["Litre", "LitrePer100Kilometres"] }, { id: "FuelConsumptionTotal", label: "Fuel consumption total", units: ["Litre", "LitrePer100Kilometres"] }, { id: "HeartBeat", label: "Heart beat", units: ["BeatPerMinute"] }, { id: "HouseholdApplianceTemperature", label: "Household appliance temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "Humidity", label: "Humidity", units: ["Percent"] }, { id: "Illuminance", label: "Illuminance", units: ["Lux"] }, { id: "IonisingRadiation", label: "Ionising radiation", units: ["RadiationParticlesPerMinute"] }, { id: "LeafWetness", label: "Leaf wetness", units: [] }, { id: "LuminousFlux", label: "Luminous flux", units: ["Lumen"] }, { id: "LuminousIntensity", label: "Luminous intensity", units: ["Candela"] }, { id: "MagneticField", label: "Magnetic field", units: ["Tesla"] }, { id: "MagneticFluxDensity", label: "Magnetic flux density", units: ["Weber"] }, { id: "Mass", label: "Mass", units: ["Kilogram", "Gram"] }, { id: "Mileage", label: "Mileage", units: ["Metre", "Kilometre"] }, { id: "MileageDistanceToService", label: "Mileage distance to service", units: ["Metre", "Kilometre"] }, { id: "MileageTotal", label: "Mileage total", units: ["Metre", "Kilometre"] }, { id: "Motion", label: "Motion", units: ["Dimensionless"] }, { id: "MotionState", label: "Motion state", units: ["Dimensionless"] }, { id: "MotionStateVehicle", label: "Motion state vehicle", units: ["Dimensionless"] }, { id: "Orientation", label: "Orientation", units: ["DegreeAngle", "Radian"] }, { id: "Other", label: "Other", units: ["Other"] }, { id: "PH", label: "PH", units: ["Dimensionless"] }, { id: "Position", label: "Position", units: ["Meter", "Kilometer"] }, { id: "Power", label: "Power", units: ["Watt"] }, { id: "Precipitation", label: "Precipitation", units: ["Millilitre"] }, { id: "Presence", label: "Presence", units: ["Dimensionless"] }, { id: "PresenceStateParking", label: "Presence state parking", units: ["Dimensionless"] }, { id: "PresenceStatePeople", label: "Presence state people", units: ["Dimensionless"] }, { id: "Pressure", label: "Pressure", units: ["Pascal", "Bar", "Centibar", "Millibar", "MmHg"] }, { id: "Proximity", label: "Proximity", units: ["Meter", "Dimensionless"] }, { id: "Rainfall", label: "Rainfall", units: ["Millilitre"] }, { id: "ReactivePower", label: "Reactive power", units: ["VoltAmpereReactive"] }, { id: "RelativeHumidity", label: "Relative humidity", units: ["Percent"] }, { id: "RoadTemperature", label: "Road temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "RoomTemperature", label: "Room temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "RotationalSpeed", label: "Rotational speed", units: ["RadianPerSecond", "DegreeAnglePerSecond"] }, { id: "Salinity", label: "Salinity", units: ["MilligramPerLitre", "PartsPerMillion"] }, { id: "SkinConductance", label: "Skin conductance", units: ["MicroSiemens"] }, { id: "SoilHumidity", label: "Soil humidity", units: ["Percent"] }, { id: "SoilMoistureTension", label: "Soil moisture tension", units: ["KiloPascal", "Bar"] }, { id: "SoilTemperature", label: "Soil temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "SolarRadiation", label: "Solar radiation", units: ["WattPerSquareMetre"] }, { id: "Sound", label: "Sound", units: ["Decibel", "DecibelA"] }, { id: "SoundPressureLevel", label: "Sound pressure level", units: ["Pascal"] }, { id: "SoundPressureLevelAmbient", label: "Sound pressure level ambient", units: ["Pascal"] }, { id: "Speed", label: "Speed", units: ["MetrePerSecond", "KilometrePerHour", "MillimetrePerHour"] }, { id: "SpeedAverage", label: "Speed average", units: ["MetrePerSecond", "KilometrePerHour", "MillimetrePerHour"] }, { id: "SpeedInstantaneous", label: "Speed instantaneous", units: ["MetrePerSecond", "KilometrePerHour", "MillimetrePerHour"] }, { id: "SPO2", label: "SPO2", units: ["Percent"] }, { id: "SunPositionDirection", label: "Sun position direction", units: ["DegreeAngle", "Radian"] }, { id: "SunPositionElevation", label: "Sun position elevation", units: ["DegreeAngle", "Radian"] }, { id: "Temperature", label: "Temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "TemperatureEngine", label: "Temperature engine", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "TemperatureWasteContainer", label: "Temperature waste container", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "TimeOfArrival", label: "Time of arrival", units: ["SecondTime", "MinuteTime", "HourTime"] }, { id: "TimeOfArrivalNextVehicle", label: "Time of arrival next vehicle", units: ["SecondTime", "MinuteTime", "HourTime"] }, { id: "Timestamp", label: "Timestamp", units: ["SecondTime", "MinuteTime", "HourTime"] }, { id: "TrafficIntensity", label: "Traffic intensity", units: ["Hertz"] }, { id: "Visibility", label: "Visibility", units: ["Metre"] }, { id: "VoiceCommand", label: "Voice command", units: ["Dimensionless"] }, { id: "Voltage", label: "Voltage", units: ["Volt"] }, { id: "WaterLevel", label: "Water level", units: ["Percent", "Metre", "Centimetre", "Millimetre"] }, { id: "WaterTemperature", label: "Water temperature", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "WeatherLuminosity", label: "Weather luminosity", units: [] }, { id: "WeatherPrecipitation", label: "Weather precipitation", units: ["Millilitre"] }, { id: "Weight", label: "Weight", units: ["Kilogram", "Gram"] }, { id: "WindChill", label: "Wind chill", units: ["DegreeCelsius", "DegreeFahrenheit"] }, { id: "WindDirection", label: "Wind direction", units: ["DegreeAngle", "Radian"] }, { id: "WindSpeed", label: "Wind speed", units: ["MetrePerSecond", "KilometrePerHour"] }, { id: "WorkingState", label: "Working state", units: ["Dimensionless"] }];

function getAll() {
  return dic;
}

function getQK(id) {
  return dic.find(function (sd) {
    return sd.id == id;
  });
}

function getLabel(id) {
  var qk = dic.find(function (sd) {
    return sd.id == id;
  });
  return qk ? qk.label : "";
}

function getUnits(id) {
  var qk = dic.find(function (sd) {
    return sd.id == id;
  });
  return qk ? qk.units.map(function (uid) {
    return _Units2.default.getUnit(uid);
  }).filter(function (u) {
    return u != undefined;
  }) : [];
}

var _exports = { getAll: getAll, getQK: getQK, getUnits: getUnits, getLabel: getLabel };
exports.default = _exports;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Unit list
  Generated from FIESTA IoT ontology with this Jena SPARQL script:
  1 PREFIX qu:<http://purl.org/NET/ssnx/qu/qu#>
  2 PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
  3 PREFIX ssn:<http://purl.oclc.org/NET/ssnx/ssn#>
  4 SELECT (strafter(str(?subClass), "#") AS ?quantityKind)
  5 WHERE { ?subClass rdfs:subClassOf* ssn:SensingDevice. } 
  $ bin/sparql --data=http://ontology.fiesta-iot.eu/ontologyDocs/fiesta-iot.owl --query=./rq --results=TSV
  Reference paper: R. Agarwal, D. Farnandez, T. Elsaleh, A.Gyrard, J. Lanza, L. Sanchez, N. Georgantas, V. Issarny, "Unified IoT Ontology to Enable Interoperability and Federation of Testbeds", 3rd IEEE WF-IoT, pp. 70-75, Reston USA, 12-14 December 2016
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dic = [{ id: "Ampere", label: "A" }, { id: "Bar", label: "bar" }, { id: "BeatPerMinute", label: "BeatPerMinute" }, { id: "Candela", label: "cd" }, { id: "Centibar", label: "centibar" }, { id: "Centimetre", label: "cm" }, { id: "Coulomb", label: "C" }, { id: "Day", label: "d" }, { id: "Decibel", label: "dB" }, { id: "DecibelA", label: "dB(A)" }, { id: "DecibelMilliwatt", label: "dBm" }, { id: "DegreeAngle", label: "°" }, { id: "DegreeAnglePerSecond", label: "°/s" }, { id: "DegreeCelsius", label: "°C" }, { id: "DegreeFahrenheit", label: "°F" }, { id: "Dimensionless", label: "" }, { id: "EAQI", label: "EAQI" }, { id: "Farad", label: "F" }, { id: "Gauss", label: "G" }, { id: "Gram", label: "g" }, { id: "GramPerCubicMetre", label: "g/m³" }, { id: "GramPerLitre", label: "g/L" }, { id: "Hertz", label: "Hz" }, { id: "Hour", label: "h" }, { id: "Joule", label: "J" }, { id: "Kelvin", label: "K" }, { id: "KilobitsPerSecond", label: "Kbit/s" }, { id: "Kilogram", label: "kg" }, { id: "KilogramPerCubicMetre", label: "kg/m³" }, { id: "Kilometre", label: "km" }, { id: "KilometrePerHour", label: "km/h" }, { id: "KiloPascal", label: "kPa" }, { id: "KiloWattHour", label: "kWh" }, { id: "Litre", label: "L" }, { id: "LitrePer100Kilometres", label: "L/100km" }, { id: "Lumen", label: "lm" }, { id: "Lux", label: "lx" }, { id: "Metre", label: "m" }, { id: "MetrePerSecond", label: "m/s" }, { id: "MetrePerSecondSquare", label: "m/s²" }, { id: "Microampere", label: "μA" }, { id: "Microgram", label: "μg" }, { id: "MicrogramPerCubicMetre", label: "μg/m³" }, { id: "MicroSiemens", label: "μS" }, { id: "Microvolt", label: "μV" }, { id: "Microwatt", label: "μW" }, { id: "MicrowattPerSquareCentimetre", label: "μW/cm²" }, { id: "Milliampere", label: "mA" }, { id: "Millibar", label: "mbar" }, { id: "Milligram", label: "mg" }, { id: "MilligramPerCubicMetre", label: "mg/m³" }, { id: "MilligramPerLitre", label: "mg/L" }, { id: "MilligramPerDecilitre", label: "mg/dL" }, { id: "MilligramPerSquareMetre", label: "mg/m²" }, { id: "Millilitre", label: "mL" }, { id: "Millimetre", label: "mm" }, { id: "MillimetreMercure", label: "mmHg" }, { id: "MillimetrePerHour", label: "mm/h" }, { id: "MilliMolPerLitre", label: "mmol/L" }, { id: "Millisecond", label: "ms" }, { id: "Millivolt", label: "mV" }, { id: "MillivoltPerMetre", label: "mV/m" }, { id: "Milliwatt", label: "mW" }, { id: "MinuteAngle", label: "arcmin" }, { id: "MinuteTime", label: "min" }, { id: "Ohm", label: "Ω" }, { id: "Okta", label: "Okta" }, { id: "Other", label: "" }, { id: "PartsPerBillion", label: "ppb" }, { id: "PartsPerMillion", label: "ppm" }, { id: "Pascal", label: "P" }, { id: "Percent", label: "%" }, { id: "Radian", label: "rad" }, { id: "RadianPerSecond", label: "rad/s" }, { id: "RadiationParticlesPerMinute", label: "cpm" }, { id: "RevolutionsPerMinute", label: "rpm" }, { id: "SecondAngle", label: "secarc" }, { id: "SecondTime", label: "s" }, { id: "Siemens", label: "S" }, { id: "SiemensPerMetre", label: "S/m" }, { id: "Tesla", label: "T" }, { id: "Tonne", label: "t" }, { id: "Volt", label: "V" }, { id: "VoltAmpereReactive", label: "var" }, { id: "VoltPerMeter", label: "V/m" }, { id: "Watt", label: "W" }, { id: "WattPerSquareMetre", label: "W/m²" }, { id: "Weber", label: "Wb" }, { id: "Year", label: "a" }];

function getAll() {
  return dic;
}

function getUnit(id) {
  return dic.find(function (u) {
    return u.id == id;
  });
}

function getLabel(id) {
  var u = dic.find(function (u) {
    return u.id == id;
  });
  return u ? u.label : "";
}

var _exports = { getAll: getAll, getUnit: getUnit, getLabel: getLabel };
exports.default = _exports;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Location = __webpack_require__(3);

var _Location2 = _interopRequireDefault(_Location);

var _Measurement = __webpack_require__(4);

var _Measurement2 = _interopRequireDefault(_Measurement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>Sensor</code>.
 * @alias module:model/Sensor
 * @class
 * @param id {String} Unique ID of the sensor node
 */
var _exports = function _exports(id) {
  var _this = this;

  _this['id'] = id;
};

/**
 * Constructs a <code>Sensor</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Sensor} obj Optional instance to populate.
 * @return {module:model/Sensor} The populated <code>Sensor</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('id')) {
      obj['id'] = _ApiClient2.default.convertToType(data['id'], 'String');
    }
    if (data.hasOwnProperty('gateway_id')) {
      obj['gateway_id'] = _ApiClient2.default.convertToType(data['gateway_id'], 'String');
    }
    if (data.hasOwnProperty('name')) {
      obj['name'] = _ApiClient2.default.convertToType(data['name'], 'String');
    }
    if (data.hasOwnProperty('owner')) {
      obj['owner'] = _ApiClient2.default.convertToType(data['owner'], 'String');
    }
    if (data.hasOwnProperty('measurements')) {
      obj['measurements'] = _ApiClient2.default.convertToType(data['measurements'], [_Measurement2.default]);
    }
    if (data.hasOwnProperty('location')) {
      obj['location'] = _Location2.default.constructFromObject(data['location']);
    }
    if (data.hasOwnProperty('dateCreated')) {
      obj['dateCreated'] = _ApiClient2.default.convertToType(data['dateCreated'], 'String');
    }
    if (data.hasOwnProperty('dateModified')) {
      obj['dateModified'] = _ApiClient2.default.convertToType(data['dateModified'], 'String');
    }
    if (data.hasOwnProperty('domain')) {
      obj['domain'] = _ApiClient2.default.convertToType(data['domain'], 'String');
    }
  }

  return obj;
};

/**
 * Unique ID of the sensor node
 * @member {String} id
 */
_exports.prototype['id'] = undefined;
/**
 * Unique ID of the gateway
 * @member {String} gateway_id
 */
_exports.prototype['gateway_id'] = undefined;
/**
 * name of the sensor node
 * @member {String} name
 */
_exports.prototype['name'] = undefined;
/**
 * owner of the sensor node
 * @member {String} owner
 */
_exports.prototype['owner'] = undefined;
/**
 * @member {Array.<module:model/Measurement>} measurements
 */
_exports.prototype['measurements'] = undefined;
/**
 * @member {module:model/Location} location
 */
_exports.prototype['location'] = undefined;
/**
 * date at which the sensor has been modified
 * @member {String} dateModified
 */
_exports.prototype['dateModified'] = undefined;
/**
 * date at which the sensor has been created
 * @member {String} dateCreated
 */
_exports.prototype['dateCreated'] = undefined;
/**
 * domain of the sensor
 * @member {String} domain
 */
_exports.prototype['domain'] = undefined;

exports.default = _exports;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>SocialMessage</code>.
 * One social network message
 * @alias module:model/SocialMessage
 * @class
 * @param channel {String} 
 * @param message {String} 
 */
var _exports = function _exports(channel, message) {
  var _this = this;

  _this['channel'] = channel;
  _this['message'] = message;
};

/**
 * Constructs a <code>SocialMessage</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/SocialMessage} obj Optional instance to populate.
 * @return {module:model/SocialMessage} The populated <code>SocialMessage</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('username')) {
      obj['username'] = _ApiClient2.default.convertToType(data['username'], 'String');
    }
    if (data.hasOwnProperty('channel')) {
      obj['channel'] = _ApiClient2.default.convertToType(data['channel'], 'String');
    }
    if (data.hasOwnProperty('message')) {
      obj['message'] = _ApiClient2.default.convertToType(data['message'], 'String');
    }
  }
  return obj;
};

/**
 * User name in Keycloak
 * @member {String} username
 */
_exports.prototype['username'] = undefined;
/**
 * @member {String} channel
 */
_exports.prototype['channel'] = undefined;
/**
 * @member {String} message
 */
_exports.prototype['message'] = undefined;

exports.default = _exports;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new <code>User</code>.
 * @alias module:model/User
 * @class
 */
var _exports = function _exports(id) {
  var _this = this;

  _this['id'] = id;
};

/**
 * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/User} obj Optional instance to populate.
 * @return {module:model/User} The populated <code>User</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('id')) {
      obj['id'] = _ApiClient2.default.convertToType(data['id'], 'String');
    }
    if (data.hasOwnProperty('username')) {
      obj['username'] = _ApiClient2.default.convertToType(data['username'], 'String');
    }
    if (data.hasOwnProperty('firstName')) {
      obj['firstName'] = _ApiClient2.default.convertToType(data['firstName'], 'String');
    }
    if (data.hasOwnProperty('lastName')) {
      obj['lastName'] = _ApiClient2.default.convertToType(data['lastName'], 'String');
    }
    if (data.hasOwnProperty('subservice')) {
      obj['subservice'] = _ApiClient2.default.convertToType(data['subservice'], 'String');
    }
    if (data.hasOwnProperty('email')) {
      obj['email'] = _ApiClient2.default.convertToType(data['email'], 'String');
    }
    if (data.hasOwnProperty('phone')) {
      obj['phone'] = _ApiClient2.default.convertToType(data['phone'], 'String');
    }
    if (data.hasOwnProperty('address')) {
      obj['address'] = _ApiClient2.default.convertToType(data['address'], 'String');
    }
    if (data.hasOwnProperty('facebook')) {
      obj['facebook'] = _ApiClient2.default.convertToType(data['facebook'], 'String');
    }
    if (data.hasOwnProperty('twitter')) {
      obj['twitter'] = _ApiClient2.default.convertToType(data['twitter'], 'String');
    }
    if (data.hasOwnProperty('roles')) {
      obj['roles'] = _ApiClient2.default.convertToType(data['roles'], 'String');
    }
  }
  return obj;
};

/**
 * @member {String} id
 */
_exports.prototype['id'] = undefined;
/**
 * @member {String} username
 */
_exports.prototype['username'] = undefined;
/**
 * @member {String} firstName
 */
_exports.prototype['firstName'] = undefined;
/**
 * @member {String} lastName
 */
_exports.prototype['lastName'] = undefined;
/**
 * @member {String} subservice
 */
_exports.prototype['subservice'] = undefined;
/**
 * @member {String} email
 */
_exports.prototype['email'] = undefined;
/**
 * @member {String} phone
 */
_exports.prototype['phone'] = undefined;
/**
 * @member {String} address
 */
_exports.prototype['address'] = undefined;
/**
 * @member {String} facebook
 */
_exports.prototype['facebook'] = undefined;
/**
 * @member {String} twitter
 */
_exports.prototype['twitter'] = undefined;
/**
 * @member {String} roles
 */
_exports.prototype['roles'] = undefined;

exports.default = _exports;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Constructs a new <code>UserUpdateBody</code>.
 * @alias module:model/UserUpdateBody
 * @class
 * @param firstName {String} User's First Name
 * @param lastName {String} User's Last Name
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exports = function _exports(firstName, lastName) {
  var _this = this;

  _this['firstName'] = firstName;
  _this['lastName'] = lastName;
};

/**
 * Constructs a <code>UserUpdateBody</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/UserUpdateBody} obj Optional instance to populate.
 * @return {module:model/UserUpdateBody} The populated <code>UserUpdateBody</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('firstName')) {
      obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String');
    }
    if (data.hasOwnProperty('lastName')) {
      obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String');
    }
    if (data.hasOwnProperty('id')) {
      obj['id'] = ApiClient.convertToType(data['id'], 'String');
    }
  }
  return obj;
};

/**
 * User's First Name
 * @member {String} firstName
 */
_exports.prototype['firstName'] = undefined;
/**
 * User's Last Name
 * @member {String} lastName
 */
_exports.prototype['lastName'] = undefined;
/**
 * User id
 * @member {String} id
 */
_exports.prototype['id'] = undefined;

exports.default = _exports;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthApi = exports.UsersApi = exports.SocialsApi = exports.SensorsApi = exports.NotificationsApi = exports.DomainsApi = exports.UserUpdateBody = exports.User = exports.Units = exports.SocialMessageBatch = exports.SocialMessage = exports.Sensor = exports.SensingDevices = exports.QuantityKinds = exports.NotificationSubject = exports.NotificationCondition = exports.Notification = exports.MeasurementValue = exports.Measurement = exports.Location = exports.Error = exports.Domain = exports.AuthBody = exports.ApiClient = undefined;

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _AuthBody = __webpack_require__(7);

var _AuthBody2 = _interopRequireDefault(_AuthBody);

var _Domain = __webpack_require__(8);

var _Domain2 = _interopRequireDefault(_Domain);

var _Error = __webpack_require__(1);

var _Error2 = _interopRequireDefault(_Error);

var _Location = __webpack_require__(3);

var _Location2 = _interopRequireDefault(_Location);

var _Measurement = __webpack_require__(4);

var _Measurement2 = _interopRequireDefault(_Measurement);

var _MeasurementValue = __webpack_require__(5);

var _MeasurementValue2 = _interopRequireDefault(_MeasurementValue);

var _Notification = __webpack_require__(9);

var _Notification2 = _interopRequireDefault(_Notification);

var _NotificationCondition = __webpack_require__(11);

var _NotificationCondition2 = _interopRequireDefault(_NotificationCondition);

var _NotificationSubject = __webpack_require__(10);

var _NotificationSubject2 = _interopRequireDefault(_NotificationSubject);

var _QuantityKinds = __webpack_require__(12);

var _QuantityKinds2 = _interopRequireDefault(_QuantityKinds);

var _SensingDevices = __webpack_require__(35);

var _SensingDevices2 = _interopRequireDefault(_SensingDevices);

var _Sensor = __webpack_require__(14);

var _Sensor2 = _interopRequireDefault(_Sensor);

var _SocialMessage = __webpack_require__(15);

var _SocialMessage2 = _interopRequireDefault(_SocialMessage);

var _SocialMessageBatch = __webpack_require__(6);

var _SocialMessageBatch2 = _interopRequireDefault(_SocialMessageBatch);

var _Units = __webpack_require__(13);

var _Units2 = _interopRequireDefault(_Units);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _UserUpdateBody = __webpack_require__(17);

var _UserUpdateBody2 = _interopRequireDefault(_UserUpdateBody);

var _DomainsApi = __webpack_require__(36);

var _DomainsApi2 = _interopRequireDefault(_DomainsApi);

var _NotificationsApi = __webpack_require__(37);

var _NotificationsApi2 = _interopRequireDefault(_NotificationsApi);

var _SensorsApi = __webpack_require__(38);

var _SensorsApi2 = _interopRequireDefault(_SensorsApi);

var _SocialsApi = __webpack_require__(39);

var _SocialsApi2 = _interopRequireDefault(_SocialsApi);

var _UsersApi = __webpack_require__(40);

var _UsersApi2 = _interopRequireDefault(_UsersApi);

var _AuthApi = __webpack_require__(41);

var _AuthApi2 = _interopRequireDefault(_AuthApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Waziup API<br>
 * This module provides access to constructors for all the classes which comprise the public API.
 * Usage:
 * <p>
 * <pre>
 * var WaziupApi = require('index'); // See note below*.
 * var xxxSvc = new WaziupApi.XxxApi(); // Allocate the API class we're going to use.
 * var yyyModel = new WaziupApi.Yyy(); // Construct a model instance.
 * yyyModel.someProperty = 'someValue';
 * ...
 * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
 * ...
 * </pre>
 * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
 * and put the application logic within the callback function.</em>
 * </p>
 * <p>
 * A non-AMD browser application (discouraged) might do something like this:
 * <pre>
 * var xxxSvc = new WaziupApi.XxxApi(); // Allocate the API class we're going to use.
 * var yyy = new WaziupApi.Yyy(); // Construct a model instance.
 * yyyModel.someProperty = 'someValue';
 * ...
 * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
 * ...
 * </pre>
 * </p>
 */
exports.ApiClient = _ApiClient2.default;
exports.AuthBody = _AuthBody2.default;
exports.Domain = _Domain2.default;
exports.Error = _Error2.default;
exports.Location = _Location2.default;
exports.Measurement = _Measurement2.default;
exports.MeasurementValue = _MeasurementValue2.default;
exports.Notification = _Notification2.default;
exports.NotificationCondition = _NotificationCondition2.default;
exports.NotificationSubject = _NotificationSubject2.default;
exports.QuantityKinds = _QuantityKinds2.default;
exports.SensingDevices = _SensingDevices2.default;
exports.Sensor = _Sensor2.default;
exports.SocialMessage = _SocialMessage2.default;
exports.SocialMessageBatch = _SocialMessageBatch2.default;
exports.Units = _Units2.default;
exports.User = _User2.default;
exports.UserUpdateBody = _UserUpdateBody2.default;
exports.DomainsApi = _DomainsApi2.default;
exports.NotificationsApi = _NotificationsApi2.default;
exports.SensorsApi = _SensorsApi2.default;
exports.SocialsApi = _SocialsApi2.default;
exports.UsersApi = _UsersApi2.default;
exports.AuthApi = _AuthApi2.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(21)
var ieee754 = __webpack_require__(22)
var isArray = __webpack_require__(23)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = __webpack_require__(25);
var RequestBase = __webpack_require__(26);
var isObject = __webpack_require__(2);
var isFunction = __webpack_require__(27);
var ResponseBase = __webpack_require__(28);
var shouldRetry = __webpack_require__(30);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
      
    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;  
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __webpack_require__(2);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = __webpack_require__(2);

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var utils = __webpack_require__(29);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(32);
exports.encode = exports.stringify = __webpack_require__(33);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _QuantityKinds = __webpack_require__(12);

var _QuantityKinds2 = _interopRequireDefault(_QuantityKinds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Sensing devices list
  Generated from FIESTA IoT ontology with this Jena SPARQL script:
  1 PREFIX qu:<http://purl.org/NET/ssnx/qu/qu#>
  2 PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
  3 PREFIX ssn:<http://purl.oclc.org/NET/ssnx/ssn#>
  4 SELECT (strafter(str(?subClass), "#") AS ?quantityKind)
  5 WHERE { ?subClass rdfs:subClassOf* ssn:SensingDevice. } 
  $ bin/sparql --data=http://ontology.fiesta-iot.eu/ontologyDocs/fiesta-iot.owl --query=./rq --results=TSV
  Reference paper: R. Agarwal, D. Farnandez, T. Elsaleh, A.Gyrard, J. Lanza, L. Sanchez, N. Georgantas, V. Issarny, "Unified IoT Ontology to Enable Interoperability and Federation of Testbeds", 3rd IEEE WF-IoT, pp. 70-75, Reston USA, 12-14 December 2016
*/

var dic = [{ id: "Accelerometer", label: "Accelerometer", QK: ["Acceleration", "AccelerationInstantaneous"] }, { id: "AirHumiditySensor", label: "Air humidity sensor", QK: ["AirHumidity"] }, { id: "AirPollutantSensor", label: "Air pollutant sensor", QK: ["AirPollution"] }, { id: "AirThermometer", label: "Air thermometer", QK: ["AirTemperature"] }, { id: "AlcoholLevelSensor", label: "Alcohol level sensor", QK: ["AlcoholLevel"] }, { id: "AtmosphericPressureSensor", label: "Atmospheric pressure sensor", QK: ["AtmosphericPressure"] }, { id: "BloodPressureSensor", label: "Blood pressure sensor", QK: ["BloodPressure"] }, { id: "BoardThermometer", label: "Board thermometer", QK: ["BoardTemperature"] }, { id: "BoardVoltageSensor", label: "Board voltage sensor", QK: ["Voltage"] }, { id: "BodyThermometer", label: "Body thermometer", QK: ["BodyTemperature"] }, { id: "CholesterolSensor", label: "Cholesterol sensor", QK: ["Cholesterol"] }, { id: "Clock", label: "Clock", QK: ["Timestamp"] }, { id: "CloudCoverSensor", label: "Cloud cover sensor", QK: ["CloudCover"] }, { id: "CO2Sensor", label: "CO2 sensor", QK: ["CO2"] }, { id: "ConductivitySensor", label: "Conductivity sensor", QK: ["Conductivity"] }, { id: "COSensor", label: "CO sensor", QK: ["ChemicalAgentAtmosphericConcentrationCO"] }, { id: "Counter", label: "Counter", QK: ["Count"] }, { id: "CurrentSensor", label: "Current sensor", QK: ["ElectricCurrent"] }, { id: "DeltaDewPointSensor", label: "Delta dew point sensor", QK: ["DewPoint, DewPointTemperature"] }, { id: "DeviceUptimeClock", label: "Device uptime clock", QK: ["DeviceUptime"] }, { id: "DewPointSensor", label: "Dew point sensor", QK: ["DewPoint, DewPointTemperature"] }, { id: "DirectionOfArrivalSensor", label: "Direction of arrival sensor", QK: ["DirectionOfArrival"] }, { id: "DistanceNextVehicleSensor", label: "Distance next vehicle sensor", QK: ["DistanceNextVehicle"] }, { id: "DistanceSensor", label: "Distance sensor", QK: ["Distance"] }, { id: "DoorStateSensor", label: "Door state sensor", QK: ["DoorStatus"] }, { id: "DustSensor", label: "Dust sensor", QK: ["ChemicalAgentAtmosphericConcentrationDust"] }, { id: "ElectricalSensor", label: "Electrical sensor", QK: ["ElectricalResistance", "ElectricCharge", "ElectricCurrent", "ElectricField", "ElectricPotential", "ActivePower", "BatteryLevel", "Capacitance", "ReactivePower"] }, { id: "ElectricFieldSensor", label: "Electric field sensor", QK: ["ElectricField"] }, { id: "EnergyMeter", label: "Energy meter", QK: ["Energy"] }, { id: "FallDetector", label: "Fall detector", QK: ["Acceleration", "AccelerationInstantaneous"] }, { id: "FrequencySensor", label: "Frequency sensor", QK: ["Frequency"] }, { id: "FuelLevel", label: "Fuel level", QK: ["FillLevel", "FillLevelGasTank"] }, { id: "FuelConsumptionSensor", label: "Fuel consumption sensor", QK: ["FuelConsumption", "FuelConsumptionInstantaneous", "FuelConsumptionTotal"] }, { id: "GasDetector", label: "Gas detector", QK: ["ChemicalAgentAtmosphericConcentration", "ChemicalAgentAtmosphericConcentrationAirParticles", "ChemicalAgentAtmosphericConcentrationCO", "ChemicalAgentAtmosphericConcentrationDust", "ChemicalAgentAtmosphericConcentrationNH3", "ChemicalAgentAtmosphericConcentrationNO", "ChemicalAgentAtmosphericConcentrationNO2", "ChemicalAgentAtmosphericConcentrationO3", "ChemicalAgentAtmosphericConcentrationSO2", "ChemicalAgentAtmosphericConcentrationVOC"] }, { id: "GaseousPollutantSensor", label: "Gaseous pollutant sensor", QK: ["AirPollution", "ChemicalAgentConcentration", "ChemicalAgentAtmosphericConcentration", "ChemicalAgentAtmosphericConcentrationAirParticles", "ChemicalAgentAtmosphericConcentrationCO", "ChemicalAgentAtmosphericConcentrationDust", "ChemicalAgentAtmosphericConcentrationNH3", "ChemicalAgentAtmosphericConcentrationNO", "ChemicalAgentAtmosphericConcentrationNO2", "ChemicalAgentAtmosphericConcentrationO3", "ChemicalAgentAtmosphericConcentrationSO2", "ChemicalAgentAtmosphericConcentrationVOC", "AirQuality"] }, { id: "Glucometer", label: "Glucometer", QK: ["BloodGlucose"] }, { id: "GPSSensor", label: "GPS sensor", QK: ["Position"] }, { id: "GyroscopeSensor", label: "Gyroscope sensor", QK: ["AngularSpeed", "RotationalSpeed", "Orientation"] }, { id: "HeartBeatSensor", label: "Heart beat sensor", QK: ["HeartBeat"] }, { id: "HumanPresenceDetector", label: "Human presence detector", QK: ["Presence"] }, { id: "HumiditySensor", label: "Humidity sensor", QK: ["Humidity", "RelativeHumidity", "SoilHumidity", "AirHumidity"] }, { id: "Hydrophone", label: "Hydrophone", QK: ["Sound", "SoundPressureLevel", "SoundPressureLevelAmbient"] }, { id: "ImageSensor", label: "Image sensor", QK: [] }, { id: "LeafWetnessSensor", label: "Leaf wetness sensor", QK: ["LeafWetness"] }, { id: "LightSensor", label: "Light sensor", QK: ["LuminousFlux", "LuminousIntensity", "Illuminance", "WeatherLuminosity"] }, { id: "LoRaInterfaceEnergyMeter", label: "LoRa interface energy meter", QK: ["Energy"] }, { id: "Magnetometer", label: "Magnetometer", QK: ["MagneticField", "MagneticFluxDensity"] }, { id: "MotionSensor", label: "Motion sensor", QK: ["Motion", "MotionState", "MotionStateVehicle"] }, { id: "NH3Sensor", label: "NH3 sensor", QK: ["ChemicalAgentAtmosphericConcentrationNH3"] }, { id: "NO2Sensor", label: "NO2 sensor", QK: ["ChemicalAgentAtmosphericConcentrationNO2"] }, { id: "NOSensor", label: "NO sensor", QK: ["ChemicalAgentAtmosphericConcentrationNO"] }, { id: "O3Sensor", label: "O3 sensor", QK: ["ChemicalAgentAtmosphericConcentrationO3"] }, { id: "Odometer", label: "Odometer", QK: ["Mileage", "MileageDistanceToService", "MileageTotal"] }, { id: "OpticalDustSensor", label: "Optical dust sensor", QK: ["ChemicalAgentAtmosphericConcentrationDust"] }, { id: "OxidationReductionPotentialSensor", label: "Oxidation reduction potential sensor", QK: ["Voltage"] }, { id: "OxygenSensor", label: "Oxygen sensor", QK: ["ChemicalAgentWaterConcentrationO2", "SPO2"] }, { id: "OtherSensor", label: "Other sensor", QK: [] }, { id: "Pedometer", label: "Pedometer", QK: ["Speed", "SpeedAverage", "SpeedInstantaneous"] }, { id: "PeopleCountSensor", label: "People count sensor", QK: ["Count", "CountPeople"] }, { id: "PHSensor", label: "PH sensor", QK: ["PH"] }, { id: "PrecipitationSensor", label: "Precipitation sensor", QK: ["Precipitation"] }, { id: "PresenceDetector", label: "Presence detector", QK: ["Count", "Presence", "PresenceStatePeople", "PresenceStateParking"] }, { id: "PressureSensor", label: "Pressure sensor", QK: ["Pressure", "AtmosphericPressure"] }, { id: "ProximitySensor", label: "Proximity sensor", QK: ["Proximity"] }, { id: "PulseOxymeter", label: "Pulse oxymeter", QK: ["SPO2"] }, { id: "RadiationParticleDetector", label: "Radiation particle detector", QK: ["IonisingRadiation"] }, { id: "RainFallSensor", label: "Rain fall sensor", QK: ["RainFall"] }, { id: "RoadSurfaceThermometer", label: "Road surface thermometer", QK: ["Temperature", "RoadTemperature"] }, { id: "SaltMeter", label: "Salt meter", QK: ["Salinity", "Sodium"] }, { id: "Seismometer", label: "Seismometer", QK: ["Motion"] }, { id: "SkinConductanceSensor", label: "Skin conductance sensor", QK: ["Conductivity"] }, { id: "SmokeDetector", label: "Smoke detector", QK: ["ChemicalAgentAtmosphericConcentrationAirParticles", "ChemicalAgentAtmosphericConcentrationDust"] }, { id: "SO2Sensor", label: "SO2 sensor", QK: ["ChemicalAgentAtmosphericConcentrationSO2"] }, { id: "SoilHumiditySensor", label: "Soil humidity sensor", QK: ["Humidity", "RelativeHumidity", "SoilHumidity", "SoilMoistureTension"] }, { id: "SoilThermometer", label: "Soil thermometer", QK: ["Temperature", "SoilTemperature"] }, { id: "SolarRadiationSensor", label: "Solar radiation sensor", QK: ["SolarRadiation"] }, { id: "SoundSensor", label: "Sound sensor", QK: ["Sound", "SoundPressureLevel", "SoundPressureLevelAmbient"] }, { id: "SpeedSensor", label: "Speed sensor", QK: ["Speed", "SpeedAverage", "SpeedInstantaneous"] }, { id: "SunPositionDirectionSensor", label: "Sun position direction sensor", QK: ["SunPositionDirection"] }, { id: "SunPositionElevationSensor", label: "Sun position elevation sensor", QK: ["SunPositionElevation"] }, { id: "Thermometer", label: "Thermometer", QK: ["AirTemperature", "BoardTemperature", "BodyTemperature", "BuildingTemperature", "DewPointTemperature", "FoodTemperature", "HouseholdApplianceTemperature", "RoadTemperature", "RoomTemperature", "SoilTemperature", "Temperature", "TemperatureEngine", "TemperatureWasteContainer", "WaterTemperature"] }, { id: "TimeOfArrivalNextVehicleSensor", label: "Time of arrival next vehicle sensor", QK: ["TimeOfArrivalNextVehicle"] }, { id: "TimeOfArrivalSensor", label: "Time of arrival sensor", QK: ["TimeOfArrival"] }, { id: "TouchSensor", label: "Touch sensor", QK: ["SkinConductance", "Capacitance"] }, { id: "UltrasonicSensor", label: "Ultrasonic sensor", QK: ["Sound", "SoundPressureLevel", "SoundPressureLevelAmbient"] }, { id: "VehicleCountSensor", label: "Vehicle count sensor", QK: ["Count", "CountAvailableVehicles", "CountEmptyDockingPoints", "TrafficIntensity"] }, { id: "VehiclePresenceDetector", label: "Vehicle presence detector", QK: ["Count", "CountAvailableVehicles", "CountEmptyDockingPoints"] }, { id: "VisibilitySensor", label: "Visibility sensor", QK: ["Visibility"] }, { id: "VOCSensor", label: "VOC sensor", QK: ["ChemicalAgentAtmosphericConcentrationVOC"] }, { id: "VoiceCommandSensor", label: "Voice command sensor", QK: ["VoiceCommand"] }, { id: "VoltageSensor", label: "Voltage sensor", QK: ["Voltage", "ElectricPotential"] }, { id: "WasteLevelSensor", label: "Waste level sensor", QK: ["FillLevelWasteContainer"] }, { id: "WaterLevel", label: "Water level sensor", QK: ["WaterLevel"] }, { id: "WaterConductivitySensor", label: "Water conductivity sensor", QK: ["Conductivity"] }, { id: "WaterNH4IonSensor", label: "Water NH4 ion sensor", QK: ["ChemicalAgentWaterConcentrationNH4Ion"] }, { id: "WaterNO3IonSensor", label: "Water NO3 ion sensor", QK: ["ChemicalAgentWaterConcentrationNO3Ion"] }, { id: "WaterO2IonSensor", label: "Water O2 ion sensor", QK: ["ChemicalAgentWaterConcentrationO2"] }, { id: "WaterPHSensor", label: "Water PH sensor", QK: ["PH"] }, { id: "WaterPollutantSensor", label: "Water pollutant sensor", QK: ["ChemicalAgentWaterConcentration"] }, { id: "WaterThermometer", label: "Water thermometer", QK: ["Temperature", "WaterTemperature"] }, { id: "WeightSensor", label: "Weight sensor", QK: ["Weight", "Mass"] }, { id: "WiFiInterfaceEnergyMeter", label: "WiFi interface energy meter", QK: ["Energy"] }, { id: "WindChillSensor", label: "Wind chill sensor", QK: ["WindChill"] }, { id: "WindDirectionSensor", label: "Wind direction sensor", QK: ["WindDirection"] }, { id: "WindSpeedSensor", label: "Wind speed sensor", QK: ["WindSpeed"] }];

function getAll() {
  return dic;
}

function getLabel(id) {
  var sds = dic.find(function (sd) {
    return sd.id == id;
  });
  return sds ? sds.label : "";
}

function getQKs(id) {
  var sds = dic.find(function (sd) {
    return sd.id == id;
  });
  return sds ? sds.QK.map(function (qkid) {
    return _QuantityKinds2.default.getQK(qkid);
  }) : [];
}

var _exports = { getAll: getAll, getLabel: getLabel, getQKs: getQKs };
exports.default = _exports;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Domain = __webpack_require__(8);

var _Domain2 = _interopRequireDefault(_Domain);

var _Error = __webpack_require__(1);

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new DomainsApi. 
 * @alias module:api/DomainsApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use,
 * default to {@link module:ApiClient#instance} if unspecified.
 */
var _exports = function _exports(apiClient) {

  this.apiClient = apiClient || _ApiClient2.default.instance;

  /**
   * Delete domain
   * @param {String} domain 
   */
  this.deleteDomain = async function (domain) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling deleteDomain";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * get domain
   * 
   * @param {String} domain 
   * data is of type: {@link module:model/Domain}
   */
  this.getDomains = async function (domain) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getDomains";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _Domain2.default;

    return this.apiClient.callApi('/domains/{domain}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * list domains
   * data is of type: {@link Array.<module:model/Domain>}
   */
  this.getDomains = async function () {
    var postBody = null;

    var pathParams = {};
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_Domain2.default];

    return this.apiClient.callApi('/domains', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
  * Create a domain
  * @param {module:model/Domain} body 
  */
  this.createDomain = async function (body) {
    var postBody = body;

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling createDomain";
    }

    var pathParams = {};
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };
};

exports.default = _exports;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Error = __webpack_require__(1);

var _Error2 = _interopRequireDefault(_Error);

var _Notification = __webpack_require__(9);

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new NotificationsApi. 
 * @alias module:api/NotificationsApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use,
 * default to {@link module:ApiClient#instance} if unspecified.
 */
var _exports = function _exports(apiClient) {
  this.apiClient = apiClient || _ApiClient2.default.instance;

  /**
   * Get all notifications
   * @param {String} domain 
   * data is of type: {@link Array.<module:model/Notification>}
   */
  this.getNotifications = async function (domain) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getNotifications";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_Notification2.default];

    return this.apiClient.callApi('/domains/{domain}/notifications', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * delete a message to social networks
   * @param {String} domain 
   * @param {String} notifId 
   */
  this.deleteNotification = async function (domain, notifId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getNotificationsNotifIdDelete";
    }

    // verify the required parameter 'notifId' is set
    if (notifId === undefined || notifId === null) {
      throw "Missing the required parameter 'notifId' when calling getNotificationsNotifIdDelete";
    }

    var pathParams = {
      'domain': domain,
      'notif_id': notifId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/notifications/{notif_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Get one message
   * @param {String} domain 
   * @param {String} notifId 
   * data is of type: {@link module:model/Notification}
   */
  this.getNotification = async function (domain, notifId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getNotificationsNotifIdGet";
    }

    // verify the required parameter 'notifId' is set
    if (notifId === undefined || notifId === null) {
      throw "Missing the required parameter 'notifId' when calling getNotificationsNotifIdGet";
    }

    var pathParams = {
      'domain': domain,
      'notif_id': notifId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _Notification2.default;

    return this.apiClient.callApi('/domains/{domain}/notifications/{notif_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * post a message to social networks
   * @param {String} domain 
   * @param {module:model/Notification} data social message
   */
  this.createNotification = async function (domain, data) {
    var postBody = data;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getNotificationsPost";
    }

    // verify the required parameter 'data' is set
    if (data === undefined || data === null) {
      throw "Missing the required parameter 'data' when calling getNotificationsPost";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/notifications', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };
};

exports.default = _exports;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Error = __webpack_require__(1);

var _Error2 = _interopRequireDefault(_Error);

var _Location = __webpack_require__(3);

var _Location2 = _interopRequireDefault(_Location);

var _Measurement = __webpack_require__(4);

var _Measurement2 = _interopRequireDefault(_Measurement);

var _MeasurementValue = __webpack_require__(5);

var _MeasurementValue2 = _interopRequireDefault(_MeasurementValue);

var _Sensor = __webpack_require__(14);

var _Sensor2 = _interopRequireDefault(_Sensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new SensorsApi. 
 * @alias module:api/SensorsApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use,
 * default to {@link module:ApiClient#instance} if unspecified.
 */
var _exports = function _exports(apiClient) {
  this.apiClient = apiClient || _ApiClient2.default.instance;

  /**
   * Sensor data
   * 
   * @param {String} domain 
   * @param {Object} opts Optional parameters
   * @param {String} opts.q filter the results
   * data is of type: {@link Array.<module:model/Sensor>}
   */
  this.getSensors = async function (domain, opts) {
    opts = opts || {};
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getSensors";
    }

    var pathParams = { 'domain': domain };
    var queryParams = { 'q': opts['q'],
      'limit': opts['limit'],
      'offset': opts['offset'] };
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_Sensor2.default];

    return this.apiClient.callApi('/domains/{domain}/sensors', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Create sensors
   * Endpoint to create sensing devices.
   * @param {module:model/Sensor} body 
   * @param {String} domain 
   */
  this.createSensor = async function (domain, body) {
    var postBody = body;

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling createSensor";
    }

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling createSensor";
    }

    var pathParams = { 'domain': domain };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Delete sensor
   * 
   * @param {String} domain 
   * @param {String} sensorId 
   */
  this.deleteSensor = async function (domain, sensorId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling deleteSensor";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling deleteSensor";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * get sensor
   * 
   * @param {String} domain 
   * @param {String} sensorId 
   * data is of type: {@link module:model/Sensor}
   */
  this.getSensor = async function (domain, sensorId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getSensor";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling getSensor";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _Sensor2.default;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * insert location
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {module:model/Location} body 
   */
  this.putSensorLocation = async function (domain, sensorId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putSensorLocation";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putSensorLocation";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putSensorLocation";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/location', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * get measurements
   * @param {String} domain 
   * @param {String} sensorId 
   * data is of type: {@link Array.<module:model/Measurement>}
   */
  this.getSensorMeasurements = async function (domain, sensorId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getSensorMeasurements";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling getSensorMeasurements";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_Measurement2.default];

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Delete measurement
   * 
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * @param {module:api/SensorsApi~deleteMeasurementCallback} callback The callback function, accepting three arguments: error, data, response
   */
  this.deleteMeasurement = async function (domain, sensorId, measurementId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling deleteMeasurement";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling deleteMeasurement";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling deleteMeasurement";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * put measurement quantity kind 
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * @param {String} body 
   */
  this.putMeasurementQK = async function (domain, sensorId, measurementId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putMeasurementQK";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putMeasurementQK";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling putMeasurementQK";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putMeasurementQK";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/quantity_kind', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * get measurement
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * data is of type: {@link module:model/Measurement}
   */
  this.getMeasurement = async function (domain, sensorId, measurementId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getMeasurement";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling getMeasurement";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling getMeasurement";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _Measurement2.default;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * put measurement name
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * @param {String} body 
   */
  this.putMeasurementName = async function (domain, sensorId, measurementId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putMeasurementName";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putMeasurementName";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling putMeasurementName";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putMeasurementName";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/name', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * insert sensor kind
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * @param {String} body 
   */
  this.putMeasurementSensorKind = async function (domain, sensorId, measurementId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putMeasurementSensorKind";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putMeasurementSensorKind";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling putMeasurementSensorKind";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putMeasurementSensorKind";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/sensing_device', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * put measurement unit
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * @param {String} body 
   */
  this.putMeasurementUnit = async function (domain, sensorId, measurementId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putMeasurementUnit";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putMeasurementUnit";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling putMeasurementUnit";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putMeasurementUnit";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/unit', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * get measurement values
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId
   * @param {Object} opts Optional parameters
   * @param {String} opts.lastN get the last N entries, most recent first. Default value is 20.
   * @param {String} opts.limit In case of pagination, number of entris per page
   * @param {String} opts.offset In case of pagination, offset for the starting entry
   * @param {String} opts.dateFrom The starting date and time from which the entries are desired. It is an optional parameter.
   * @param {String} opts.dateTo The final date and time until which the entries are desired. It is an optional parameter. 
   * data is of type: {@link Array.<module:model/MeasurementValue>}
   */
  this.getMeasurementValues = async function (domain, sensorId, measurementId, opts) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getMeasurementValues";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling getMeasurementValues";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling getMeasurementValues";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {
      'lastN': opts['lastN'],
      'limit': opts['limit'],
      'offset': opts['offset'],
      'dateFrom': opts['dateFrom'],
      'dateTo': opts['dateTo']
    };
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_MeasurementValue2.default];

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/values', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Create new datapoint
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} measurementId 
   * @param {module:model/MeasurementValue} body 
   */
  this.addDatapoint = async function (domain, sensorId, measurementId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling addDatapoint";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling addDatapoint";
    }

    // verify the required parameter 'measurementId' is set
    if (measurementId === undefined || measurementId === null) {
      throw "Missing the required parameter 'measurementId' when calling addDatapoint";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling addDatapoint";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId,
      'measurement_id': measurementId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements/{measurement_id}/values', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * insert new measurement
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {module:model/Measurement} body 
   */
  this.addMeasurement = async function (domain, sensorId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling addMeasurement";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling addMeasurement";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling addMeasurement";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/measurements', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * insert name
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} body 
   */
  this.putSensorName = async function (domain, sensorId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putSensorName";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putSensorName";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putSensorName";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/name', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * insert owner
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} body 
   */
  this.putSensorOwner = async function (domain, sensorId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putSensorOwner";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putSensorOwner";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putSensorOwner";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/owner', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * insert gateway_id
   * @param {String} domain 
   * @param {String} sensorId 
   * @param {String} body 
   */
  this.putSensorGatewayId = async function (domain, sensorId, body) {
    var postBody = body;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling putSensorGatewayId";
    }

    // verify the required parameter 'sensorId' is set
    if (sensorId === undefined || sensorId === null) {
      throw "Missing the required parameter 'sensorId' when calling putSensorGatewayId";
    }

    // verify the required parameter 'body' is set
    if (body === undefined || body === null) {
      throw "Missing the required parameter 'body' when calling putSensorGatewayId";
    }

    var pathParams = {
      'domain': domain,
      'sensor_id': sensorId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['text/plain'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/sensors/{sensor_id}/gateway_id', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };
};

exports.default = _exports;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Error = __webpack_require__(1);

var _Error2 = _interopRequireDefault(_Error);

var _SocialMessage = __webpack_require__(15);

var _SocialMessage2 = _interopRequireDefault(_SocialMessage);

var _SocialMessageBatch = __webpack_require__(6);

var _SocialMessageBatch2 = _interopRequireDefault(_SocialMessageBatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new SocialsApi. 
 * @alias module:api/SocialsApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use,
 * default to {@link module:ApiClient#instance} if unspecified.
 */
var _exports = function _exports(apiClient) {
  this.apiClient = apiClient || _ApiClient2.default.instance;

  /**
   * post several message to social networks
   * @param {String} domain 
   * @param {module:model/SocialMessageBatch} data social message
   */
  this.createSocialMsgsBatch = async function (domain, data) {
    var postBody = data;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'data' is set
    if (data === undefined || data === null) {
      throw "Missing the required parameter 'data'";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/socials/batch', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Get all messages sent
   * @param {String} domain 
   * data is of type: {@link module:model/SocialMessage}
   */
  this.getSocialMsgs = async function (domain) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _SocialMessage2.default;

    return this.apiClient.callApi('/domains/{domain}/socials', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * delete a message to social networks
   * @param {String} domain 
   * @param {String} msgId 
   */
  this.deleteSocialsMsg = async function (domain, msgId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'msgId' is set
    if (msgId === undefined || msgId === null) {
      throw "Missing the required parameter 'msgId'";
    }

    var pathParams = {
      'domain': domain,
      'msg_id': msgId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/socials/{msg_id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Get one message
   * @param {String} domain 
   * @param {String} msgId 
   * data is of type: {@link module:model/SocialMessage}
   */
  this.getSocialsMsg = async function (domain, msgId) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'msgId' is set
    if (msgId === undefined || msgId === null) {
      throw "Missing the required parameter 'msgId'";
    }

    var pathParams = {
      'domain': domain,
      'msg_id': msgId
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _SocialMessage2.default;

    return this.apiClient.callApi('/domains/{domain}/socials/{msg_id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * post a message to social networks
   * @param {String} domain 
   * @param {module:model/SocialMessage} data social message
   */
  this.createSocialMsg = async function (domain, data) {
    var postBody = data;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'data' is set
    if (data === undefined || data === null) {
      throw "Missing the required parameter 'data'";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/socials', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };
};

exports.default = _exports;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _AuthBody = __webpack_require__(7);

var _AuthBody2 = _interopRequireDefault(_AuthBody);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _UserUpdateBody = __webpack_require__(17);

var _UserUpdateBody2 = _interopRequireDefault(_UserUpdateBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new UsersApi. 
 * @alias module:api/UsersApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use,
 * default to {@link module:ApiClient#instance} if unspecified.
 */
var _exports = function _exports(apiClient) {
  this.apiClient = apiClient || _ApiClient2.default.instance;

  /**
   * Get the access token for subsequent calls
   * @param {String} domain 
   * @param {module:model/AuthBody} credentials auth credentials
   */
  this.getAuthToken = async function (domain, credentials) {
    var postBody = credentials;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'credentials' is set
    if (credentials === undefined || credentials === null) {
      throw "Missing the required parameter 'credentials'";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = [];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _AuthBody2.default;

    return this.apiClient.callApi('/domains/{domain}/auth/', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Get all users in a realm
   * @param {String} domain 
   */
  this.getUsers = async function (domain) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling getUsers";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_User2.default];

    return this.apiClient.callApi('/domains/{domain}/users/', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Create a new user in a realm
   * @param {String} domain 
   * @param {module:model/User} user user object
   */
  this.createUser = async function (domain, user) {
    var postBody = user;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling createUser";
    }

    // verify the required parameter 'user' is set
    if (user === undefined || user === null) {
      throw "Missing the required parameter 'user' when calling createUser";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/users/', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Search users with specific criteria
   * @param {String} domain 
   */
  this.searchUsers = async function (domain, q) {
    //TODO: complete arguments
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = q;
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_User2.default];

    return this.apiClient.callApi('/domains/{domain}/users/search/', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
  * @param {String} domain 
  * @param {String} userid 
  */
  this.deleteUser = async function (domain, userid) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'userid' is set
    if (userid === undefined || userid === null) {
      throw "Missing the required parameter 'userid'";
    }

    var pathParams = {
      'domain': domain,
      'userid': userid
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/users/{userid}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * @param {String} domain 
   * @param {String} userid 
   */
  this.getUser = async function (domain, userid) {
    var postBody = null;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'userid' is set
    if (userid === undefined || userid === null) {
      throw "Missing the required parameter 'userid'";
    }

    var pathParams = {
      'domain': domain,
      'userid': userid
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = _User2.default;

    return this.apiClient.callApi('/domains/{domain}/users/{userid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * @param {String} domain 
   * @param {String} userid 
   * @param {module:model/UserUpdateBody} data user data to update
   */
  this.updateUser = async function (domain, userid, data) {
    var postBody = data;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain' when calling updateUser";
    }

    // verify the required parameter 'userid' is set
    if (userid === undefined || userid === null) {
      throw "Missing the required parameter 'userid' when calling updateUser";
    }

    // verify the required parameter 'data' is set
    if (data === undefined || data === null) {
      throw "Missing the required parameter 'data' when calling updateUser";
    }

    var pathParams = {
      'domain': domain,
      'userid': userid
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = null;

    return this.apiClient.callApi('/domains/{domain}/users/{userid}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };
};

exports.default = _exports;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Permission = __webpack_require__(42);

var _Permission2 = _interopRequireDefault(_Permission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a new AuthApi. 
 * @alias module:api/AuthApi
 * @class
 * @param {module:ApiClient} apiClient Optional API client implementation to use,
 * default to {@link module:ApiClient#instance} if unspecified.
 */
var _exports = function _exports(apiClient) {
  this.apiClient = apiClient || _ApiClient2.default.instance;

  /**
   * Get the access token for subsequent calls
   * @param {String} domain 
   * @param {module:model/AuthBody} credentials auth credentials
   */
  this.getAuthToken = async function (domain, credentials) {
    var postBody = credentials;

    // verify the required parameter 'domain' is set
    if (domain === undefined || domain === null) {
      throw "Missing the required parameter 'domain'";
    }

    // verify the required parameter 'credentials' is set
    if (credentials === undefined || credentials === null) {
      throw "Missing the required parameter 'credentials'";
    }

    var pathParams = {
      'domain': domain
    };
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = [];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = 'String';

    return this.apiClient.callApi('/auth/token', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };

  /**
   * Get the permissions
   */
  this.getPermissions = async function () {
    var postBody = null;

    var pathParams = {};
    var queryParams = {};
    var headerParams = {};
    var formParams = {};

    var authNames = ['Bearer'];
    var contentTypes = ['application/json'];
    var accepts = ['application/json'];
    var returnType = [_Permission2.default];

    return this.apiClient.callApi('/auth/permissions', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType);
  };
};

exports.default = _exports;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _Resource = __webpack_require__(43);

var _Resource2 = _interopRequireDefault(_Resource);

var _Scope = __webpack_require__(44);

var _Scope2 = _interopRequireDefault(_Scope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * Constructs a new <code>Permission</code>.
   * @alias module:model/Permission
   * @class
   */
var _exports = function _exports() {
  var _this = this;
};

/**
 * Constructs a <code>Permission</code> from a plain JavaScript object, optionally creating a new instance.
 * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
 * @param {Object} data The plain JavaScript object bearing properties of interest.
 * @param {module:model/Permission} obj Optional instance to populate.
 * @return {module:model/Permission} The populated <code>Permission</code> instance.
 */
_exports.constructFromObject = function (data, obj) {
  if (data) {
    obj = obj || new _exports();

    if (data.hasOwnProperty('resource')) {
      obj['resource'] = _Resource2.default.constructFromObject(data['resource']);
    }
    if (data.hasOwnProperty('scopes')) {
      obj['scopes'] = data['scopes'].map(function (s) {
        return _Scope2.default.constructFromObject(s);
      });
    }
  }
  return obj;
};

/**
 * @member {module:model/Resource} resource
 */
_exports.prototype['resource'] = undefined;
/**
 * @member {Array.<module:model/Scope>} scopes
 */
_exports.prototype['scopes'] = undefined;

exports.default = _exports;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Enum class Resource.
 * @enum {}
 * @readonly
 */
var _exports = {
  /**
   * value: "Sensors"
   * @const
   */
  "Sensors": "Sensors",
  /**
   * value: "Domains"
   * @const
   */
  "Domains": "Domains",
  /**
   * value: "History"
   * @const
   */
  "History": "History",
  /**
   * value: "Notifications"
   * @const
   */
  "Notifications": "Notifications",
  /**
   * value: "Socials"
   * @const
   */
  "Socials": "Socials",
  /**
   * value: "Users"
   * @const
   */
  "Users": "Users" };

/**
 * Returns a <code>Resource</code> enum value from a Javascript object name.
 * @param {Object} data The plain JavaScript object containing the name of the enum value.
 * @return {module:model/Resource} The enum <code>Resource</code> value.
 */
_exports.constructFromObject = function (object) {
  return object;
};

exports.default = _exports;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiClient = __webpack_require__(0);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Enum class Scope.
 * @enum {}
 * @readonly
 */
var _exports = {
  /**
   * value: "sensors:create"
   * @const
   */
  "sensors:create": "sensors:create",
  /**
   * value: "sensors:view"
   * @const
   */
  "sensors:view": "sensors:view",
  /**
   * value: "sensors:update"
   * @const
   */
  "sensors:update": "sensors:update",
  /**
   * value: "sensors:delete"
   * @const
   */
  "sensors:delete": "sensors:delete",
  /**
   * value: "domains:create"
   * @const
   */
  "domains:create": "domains:create",
  /**
   * value: "domains:view"
   * @const
   */
  "domains:view": "domains:view",
  /**
   * value: "domains:update"
   * @const
   */
  "domains:update": "domains:update",
  /**
   * value: "domains:delete"
   * @const
   */
  "domains:delete": "domains:delete",
  /**
   * value: "socials:create"
   * @const
   */
  "socials:create": "socials:create",
  /**
   * value: "socials:view"
   * @const
   */
  "socials:view": "socials:view",
  /**
   * value: "socials:update"
   * @const
   */
  "socials:update": "socials:update",
  /**
   * value: "socials:delete"
   * @const
   */
  "socials:delete": "socials:delete",
  /**
   * value: "notifications:create"
   * @const
   */
  "notifications:create": "notifications:create",
  /**
   * value: "notifications:view"
   * @const
   */
  "notifications:view": "notifications:view",
  /**
   * value: "notifications:update"
   * @const
   */
  "notifications:update": "notifications:update",
  /**
   * value: "notifications:delete"
   * @const
   */
  "notifications:delete": "notifications:delete",
  /**
   * value: "history:create"
   * @const
   */
  "history:create": "history:create",
  /**
   * value: "history:view"
   * @const
   */
  "history:view": "history:view",
  /**
   * value: "history:update"
   * @const
   */
  "history:update": "history:update",
  /**
   * value: "history:delete"
   * @const
   */
  "history:delete": "history:delete",
  /**
   * value: "users:create"
   * @const
   */
  "users:create": "users:create",
  /**
   * value: "users:view"
   * @const
   */
  "users:view": "users:view",
  /**
   * value: "users:update"
   * @const
   */
  "users:update": "users:update",
  /**
   * value: "users:delete"
   * @const
   */
  "users:delete": "users:delete" };

/**
 * Returns a <code>Scope</code> enum value from a Javascript object name.
 * @param {Object} data The plain JavaScript object containing the name of the enum value.
 * @return {module:model/Scope} The enum <code>Scope</code> value.
 */
_exports.constructFromObject = function (object) {
  return object;
};

exports.default = _exports;

/***/ })
/******/ ]);