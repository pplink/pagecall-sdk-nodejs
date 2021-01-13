"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagecall_new_1 = require("../src/pagecall-new");
var newPagecall = new pagecall_new_1.PageCallNew({
    apiToken: ''
});
// newPagecall.getSessions('')
//   .then(result => {
//     console.log(result);
//   })
// newPagecall.getIntegratedTime('')
//   .then(result => {
//     console.log(result);
//   });
newPagecall.postActionToSessions([''], 'run_script', {
    "script": "PageCall.alert('hi')"
});
//# sourceMappingURL=test.js.map