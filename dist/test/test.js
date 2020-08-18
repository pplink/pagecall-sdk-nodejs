"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagecall_new_1 = require("../src/pagecall-new");
var newPagecall = new pagecall_new_1.PageCallNew({
    apiToken: ''
});
newPagecall.createPublicRoom('roomHi')
    .then(function (room) {
    return newPagecall.createUser('user1020', 'parkjurung')
        .then(function (user) {
        return newPagecall.joinRoom(room.id, user.userId);
    })
        .then(function (result) {
        console.log('result', result);
    });
});
//# sourceMappingURL=test.js.map