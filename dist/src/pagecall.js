"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rest = require("restler");
var PageCall = /** @class */ (function () {
    function PageCall(param) {
        this.param = param;
        this.keyPair = { apiKey: param.apiKey, apiSecret: param.apiSecret };
    }
    PageCall.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            if (_this.tokenValid()) {
                res(_this.currentToken);
            }
            else { // need a new token
                _this.restPost(_this.param.apiEndPoint + '/authentication/token', _this.keyPair)
                    .then(function (data) {
                    _this.currentToken = data;
                    res(data);
                })
                    .catch(function (err) {
                    // todo: handling error
                    rej(err);
                });
            }
        });
    };
    PageCall.prototype.connectWith = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + '/connection/with', param, { 'Authorization': "bearer " + token.token });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCall.prototype.connectIn = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + '/connection/in', param, { 'Authorization': "bearer " + token.token });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCall.prototype.replay = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + '/connection/replay', param, { 'Authorization': "bearer " + token.token });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCall.prototype.replayLegacy = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + '/connection/replay-legacy', param, { 'Authorization': "bearer " + token.token });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCall.prototype.tokenValid = function () {
        return this.currentToken && (this.currentToken.exp * 1000) - Date.now() > 60000; // safe padding 1 minutes;
    };
    PageCall.prototype.restPost = function (url, data, headers) {
        if (headers === void 0) { headers = {}; }
        return new Promise(function (res, rej) {
            rest.post(url, { data: data, headers: headers }).on('complete', function (data, response) {
                if (response && response.statusCode === 200) {
                    res(data);
                }
                else {
                    rej(data);
                }
            });
        });
    };
    return PageCall;
}());
exports.PageCall = PageCall;
//# sourceMappingURL=pagecall.js.map