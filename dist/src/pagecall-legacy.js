"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rest = require("restler");
var PageCallLegacy = /** @class */ (function () {
    function PageCallLegacy(param) {
        this.param = param;
        this.keyPair = { apiKey: param.apiKey, apiSecret: param.apiSecret };
    }
    PageCallLegacy.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            if (_this.tokenValid()) {
                res(_this.currentToken);
            }
            else { // need a new token
                _this.restPost(_this.param.apiEndPoint + "/authentication/token", _this.keyPair)
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
    PageCallLegacy.prototype.connectIn = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            var safeParam = __assign({}, param);
            safeParam.allowedTime = String(param.allowedTime);
            safeParam.userData = typeof param.userData === 'string' ? param.userData : JSON.stringify(param.userData);
            safeParam.roomData = typeof param.roomData === 'string' ? param.roomData : JSON.stringify(param.roomData);
            safeParam.template = typeof param.template === 'string' ? param.template : JSON.stringify(param.template);
            return _this.restPost(_this.param.apiEndPoint + "/connection/in", JSON.stringify(safeParam), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.finish = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/connection/finish", JSON.stringify(param), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.onGoing = function () {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/information/ongoing", {}, {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.getWebhookData = function (roomId) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/information/webhook-data", JSON.stringify({ roomId: roomId }), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.getRoom = function (roomId) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/information/room", JSON.stringify({ roomId: roomId }), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.getUser = function (userId) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/information/user", JSON.stringify({ userId: userId }), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.getRoomByPublicId = function (publicRoomId) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/information/room", JSON.stringify({ publicRoomId: publicRoomId }), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.getRoomIds = function () {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/information/rooms", {}, {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.replay = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/connection/replay", JSON.stringify(param), {
                'Authorization': "bearer " + token.token,
                'Content-Type': 'application/json'
            });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.replayLegacy = function (param) {
        var _this = this;
        return this.getToken()
            .then(function (token) {
            return _this.restPost(_this.param.apiEndPoint + "/connection/replay-legacy", param, { 'Authorization': "bearer " + token.token });
        })
            .then(function (data) {
            return data;
        })
            .catch(function (err) {
            return err;
        });
    };
    PageCallLegacy.prototype.tokenValid = function () {
        return this.currentToken && (((this.currentToken.exp * 1000) - Date.now()) > 60000); // safe padding 1 minutes;
    };
    PageCallLegacy.prototype.restPost = function (url, data, headers) {
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
    return PageCallLegacy;
}());
exports.PageCallLegacy = PageCallLegacy;
//# sourceMappingURL=pagecall-legacy.js.map