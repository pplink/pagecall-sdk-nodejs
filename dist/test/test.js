"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagecall_new_1 = require("../src/pagecall-new");
var newPagecall = new pagecall_new_1.PageCallNew({
    apiToken: 'DvHS_IO2KfOyoAsOWl2ukkGP2x86GKEKaPb3'
});
newPagecall.getIntegratedTime('6016c2793b2d900008a12585')
    .then(function (result) {
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