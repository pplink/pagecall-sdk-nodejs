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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var change_case_1 = require("change-case");
var config = {
    defaultApiEndpoint: 'https://api.pagecall.net/v1',
    defaultAppEndpoint: 'https://app.pagecall.net'
};
var RoomType;
(function (RoomType) {
    RoomType["Open"] = "open";
    RoomType["Public"] = "public";
    RoomType["Private"] = "private";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
var PageCallNew = /** @class */ (function () {
    function PageCallNew(param) {
        this.param = param;
        var apiEndpoint = param.apiEndpoint, appEndpoint = param.appEndpoint, apiToken = param.apiToken;
        this.apiEndpoint = apiEndpoint || config.defaultApiEndpoint;
        this.appEndpoint = appEndpoint || config.defaultApiEndpoint;
        this.apiToken = apiToken;
        this.axiosInstance = axios_1.default.create({
            baseURL: this.apiEndpoint,
            headers: {
                'Authorization': "Bearer " + this.apiToken,
                'Content-Type': 'application/json'
            }
        });
    }
    PageCallNew.prototype.createPublicRoom = function (name, layoutId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/rooms', {
                            type: RoomType.Public,
                            name: name,
                            layout_id: layoutId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.room)];
                }
            });
        });
    };
    PageCallNew.prototype.getRoom = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get("/rooms/" + roomId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.room)];
                }
            });
        });
    };
    PageCallNew.prototype.getRooms = function (offset, limit, desc, query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/rooms', __assign(__assign({}, query), { offset: offset.toString(), limit: limit.toString(), sort_by: desc ? '-created_at' : '+created_at' }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.rooms
                                .map(function (room) { return _this.convertObjectToCamelCase(room); })];
                }
            });
        });
    };
    PageCallNew.prototype.terminateRoom = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.put("/rooms/" + roomId, {
                            is_terminated: true
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.room)];
                }
            });
        });
    };
    PageCallNew.prototype.replayRoom = function (roomId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.joinRoom(roomId, userId)];
            });
        });
    };
    PageCallNew.prototype.createUser = function (userId, name, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/users', {
                            name: name,
                            metadata: metadata,
                            user_id: userId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.user)];
                }
            });
        });
    };
    PageCallNew.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get("/users/" + encodeURI(userId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.user)];
                }
            });
        });
    };
    PageCallNew.prototype.getUsers = function (offset, limit, desc) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/users', {
                            offset: offset.toString(),
                            limit: limit.toString(),
                            sort_by: desc ? '-created_at' : '+created_at'
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.users
                                .map(function (user) { return _this.convertObjectToCamelCase(user); })];
                }
            });
        });
    };
    PageCallNew.prototype.createMember = function (roomId, userId, layout, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("/rooms/" + roomId + "/members", {
                            user_id: userId,
                            layout: layout,
                            options: options
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.member)];
                }
            });
        });
    };
    PageCallNew.prototype.joinRoom = function (roomId, userId, layout, options) {
        return __awaiter(this, void 0, void 0, function () {
            var user, member, html, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser(userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.createMember(roomId, userId, layout, options)];
                    case 2:
                        member = _a.sent();
                        return [4 /*yield*/, this.getHtml()];
                    case 3:
                        html = _a.sent();
                        accessToken = user.accessToken;
                        return [2 /*return*/, {
                                html: this.injectAuthKeysToHtml(html, roomId, accessToken),
                                roomId: roomId
                            }];
                }
            });
        });
    };
    PageCallNew.prototype.getHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1.default.get(config.defaultAppEndpoint).then(function (result) { return result.data; })];
            });
        });
    };
    PageCallNew.prototype.injectAuthKeysToHtml = function (html, roomId, accessToken) {
        return this.injectGlobalVariablesToHtml(html, {
            room_id: roomId,
            access_token: accessToken
        });
    };
    PageCallNew.prototype.injectGlobalVariablesToHtml = function (html, variables) {
        var script = Object.keys(variables)
            .reduce(function (prev, curr) { return prev + ("window." + curr + " = \"" + variables[curr] + "\";\n"); }, '');
        return html.replace('<head>', "<head>\n<script>\n" + script + "</script>\n");
    };
    PageCallNew.prototype.convertObjectToCamelCase = function (obj) {
        if (!obj || Object.keys(obj).length === 0) {
            return obj;
        }
        return Object.keys(obj)
            .reduce(function (prev, curr) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[change_case_1.camelCase(curr)] = obj[curr], _a)));
        }, {});
    };
    PageCallNew.prototype.post = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.axiosInstance.post(path, JSON.stringify(body))
                        .then(function (response) { return response.data; })
                        .catch(function (err) {
                        return err.response.data;
                    })];
            });
        });
    };
    PageCallNew.prototype.get = function (path, queryParams) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.axiosInstance.get(path, { params: queryParams })
                        .then(function (response) { return response.data; })
                        .catch(function (err) {
                        return err.response.data;
                    })];
            });
        });
    };
    PageCallNew.prototype.put = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.axiosInstance.put(path, JSON.stringify(body))
                        .then(function (response) { return response.data; })
                        .catch(function (err) {
                        return err.response.data;
                    })];
            });
        });
    };
    return PageCallNew;
}());
exports.PageCallNew = PageCallNew;
//# sourceMappingURL=pagecall-new.js.map