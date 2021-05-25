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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var change_case_1 = require("change-case");
var time_overlap_1 = require("time-overlap");
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
        this.appEndpoint = appEndpoint || config.defaultAppEndpoint;
        this.apiToken = apiToken;
        this.axiosInstance = axios_1.default.create({
            baseURL: this.apiEndpoint,
            headers: {
                'Authorization': "Bearer " + this.apiToken,
                'Content-Type': 'application/json'
            }
        });
    }
    PageCallNew.prototype.createPublicRoom = function (name, layoutId, replayLayoutId, replayOptionsPresetId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/rooms', {
                            type: RoomType.Public,
                            name: name,
                            layout_id: layoutId,
                            replay_layout_id: replayLayoutId,
                            replay_options_preset_id: replayOptionsPresetId
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
    PageCallNew.prototype.getSessions = function (roomId, query, limiter) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get("/rooms/" + roomId + "/sessions", __assign(__assign({}, query), limiter))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.sessions.map(function (session) { return _this.convertObjectToCamelCase(session); })];
                }
            });
        });
    };
    PageCallNew.prototype.getAllSessions = function (roomId, query) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeSorted;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSessionsRecursively(roomId, 0, query)];
                    case 1:
                        beforeSorted = (_a.sent())
                            .map(function (session) { return _this.convertObjectToCamelCase(session); });
                        return [2 /*return*/, beforeSorted.sort(function (a, b) {
                                return (new Date(a.connectedAt).getTime() - new Date(b.connectedAt).getTime());
                            })];
                }
            });
        });
    };
    PageCallNew.prototype.getSessionsRecursively = function (roomId, offset, query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currentResult, done, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.get("/rooms/" + roomId + "/sessions", __assign({ limit: '30', offset: offset + '', sort_by: '-connected_at' }, query))];
                    case 1:
                        currentResult = _b.sent();
                        done = currentResult.paging.offset + 30 >= currentResult.paging.total;
                        if (!done) return [3 /*break*/, 2];
                        return [2 /*return*/, currentResult.sessions];
                    case 2:
                        _a = [currentResult.sessions];
                        return [4 /*yield*/, this.getSessionsRecursively(roomId, offset + 30, query)];
                    case 3: return [2 /*return*/, __spreadArrays.apply(void 0, _a.concat([_b.sent()]))];
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
    PageCallNew.prototype.createMember = function (roomId, userId, layoutId, options, optionsPresetId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("/rooms/" + roomId + "/members", {
                            user_id: userId,
                            layout_id: layoutId || undefined,
                            options_preset_id: optionsPresetId,
                            options: options
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.convertObjectToCamelCase(response.member)];
                }
            });
        });
    };
    PageCallNew.prototype.joinRoom = function (roomId, userId, layoutId, options, build, optionsPresetId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, member, html, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser(userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.createMember(roomId, userId, layoutId, options, optionsPresetId)];
                    case 2:
                        member = _a.sent();
                        return [4 /*yield*/, this.getHtml(build)];
                    case 3:
                        html = _a.sent();
                        accessToken = user.accessToken;
                        return [2 /*return*/, {
                                html: this.injectAuthKeysToHtml(html, roomId, accessToken, 'meet'),
                                roomId: roomId
                            }];
                }
            });
        });
    };
    PageCallNew.prototype.getURL = function (roomId, userId, layoutId, options, build) {
        return __awaiter(this, void 0, void 0, function () {
            var member;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMember(roomId, userId, layoutId, options)];
                    case 1:
                        member = _a.sent();
                        return [2 /*return*/, this.appEndpoint + "/" + roomId + "?access_token=" + member.accessToken + (build ? '&build=' + build : '')];
                }
            });
        });
    };
    PageCallNew.prototype.replayRoom = function (roomId, userId, build) {
        return __awaiter(this, void 0, void 0, function () {
            var html, user, _a, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getHtml(build)];
                    case 1:
                        html = _b.sent();
                        if (!userId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getUser(userId)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = { accessToken: '' };
                        _b.label = 4;
                    case 4:
                        user = _a;
                        accessToken = user.accessToken;
                        return [2 /*return*/, {
                                html: this.injectAuthKeysToHtml(html, roomId, accessToken, 'replay'),
                                roomId: roomId
                            }];
                }
            });
        });
    };
    PageCallNew.prototype.postActionToSessions = function (sessionIds, type, payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post('/post_action_to_sessions', {
                        type: type,
                        payload: payload,
                        session_ids: sessionIds
                    })];
            });
        });
    };
    PageCallNew.prototype.getIntegratedTime = function (roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getIntegratedTimeFromSessions;
                        return [4 /*yield*/, this.getAllSessions(roomId)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    PageCallNew.prototype.getHtml = function (build) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1.default.get("" + this.appEndpoint + (build ? '?build=' + build : '')).then(function (result) {
                        return result.data;
                    }).catch(function (err) { return console.error(err); })];
            });
        });
    };
    PageCallNew.prototype.injectAuthKeysToHtml = function (html, roomId, accessToken, mode) {
        return this.injectGlobalVariablesToHtml(html, {
            room_id: roomId,
            access_token: accessToken,
            mode: mode
        });
    };
    PageCallNew.prototype.getIntegratedTimeFromSessions = function (sessions) {
        var timestamps = sessions.map(function (session) { return ({
            memberId: session.memberId,
            connectedAt: new Date(session.connectedAt).getTime(),
            disconnectedAt: session.disconnectedAt
                ? new Date(session.disconnectedAt).getTime()
                : Date.now()
        }); }).reduce(function (_a, curr) {
            var timestamps = _a.timestamps, memberIds = _a.memberIds;
            var nextState = { timestamps: __spreadArrays(timestamps), memberIds: __spreadArrays(memberIds) };
            var memberIndex = memberIds.indexOf(curr.memberId);
            if (memberIndex >= 0) {
                nextState.timestamps[memberIndex] = __spreadArrays(timestamps[memberIndex], [curr.connectedAt, curr.disconnectedAt]);
            }
            else {
                nextState.memberIds.push(curr.memberId);
                nextState.timestamps.push([curr.connectedAt, curr.disconnectedAt]);
            }
            return nextState;
        }, { timestamps: [], memberIds: [] }).timestamps;
        return time_overlap_1.integrate(time_overlap_1.cross([0, Date.now()], time_overlap_1.overlap(timestamps)));
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