"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagecall_new_1 = require("../src/pagecall-new");
var newPagecall = new pagecall_new_1.PageCallNew({
    apiToken: 'DvHS_IO2KfOyoAsOWl2ukkGP2x86GKEKaPb3'
});
newPagecall.createPublicRoom('testjurung0928', '5f69a236f371c500080666c3')
    .then(function (room) {
    return newPagecall.createUser('testjurung0928-1', 'testuser')
        .then(function (user) {
        return newPagecall.joinRoom(room.id, user.userId);
    })
        .then(function (result) {
        console.log('result', result);
    });
});
//# sourceMappingURL=test.js.map