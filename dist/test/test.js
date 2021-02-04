"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagecall_new_1 = require("../src/pagecall-new");
var newPagecall = new pagecall_new_1.PageCallNew({
    apiToken: 'DvHS_IO2KfOyoAsOWl2ukkGP2x86GKEKaPb3'
});
newPagecall.joinRoom('601ba327fc0ae40008bc26fa', '1612424654581_647', '', {})
    .then(function (result) {
    console.log('result');
    console.log(result);
});
// newPagecall.getIntegratedTime('')
//   .then(result => {
//     console.log(result);
//   });
// newPagecall.postActionToSessions([''], 'run_script', {
//   "script": "PageCall.alert('hi')"
// })
//# sourceMappingURL=test.js.map