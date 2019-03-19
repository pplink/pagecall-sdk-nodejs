# PageCall SDK NodeJS

## 1. Install
```npm install --save pagecall```

## 2. Import
### Typescript
```typescript
import {PageCall} from 'pagecall';
``` 
### Javascript
```javascript
const PageCall = require('pagecall').PageCall;
```
## 3. Initiate
```javascript
const pagecall = new PageCall({
  apiKey: '<API key as string>',
  apiSecret: '<secret as string>',
  apiEndPoint: '<API Endpoint as url>' // ex) https://api-endpoint.com
});
```
## 4. Use example
use with router handler
- more than two users with same `publicRoomId` can meet each other.
```javascript
router.post('/join-meeting', function(req, res){
  pagecall.connectIn({
    userId: req.body.userId,
    publicRoomId: req.body.publicRoomId,
    allowedTime: '60', // 60 minutes limit, 
    template: JSON.stringify({
      language: 'ko',
      videoPosition: 'fixed', 
      optionalTools: { shape: true, textbox: false },
    })
  }).then(function(data) {
    res.send(data.html); // << client has to render this html.
  });
});
```
A part of the following interface can be `template`
```typescript
interface Template {
  language: 'ko' | 'en',
  videoPosition: 'floating' | 'fixed',
  optionalTools: { shape?: boolean, textbox?: boolean},
  chat: boolean,
  memo: boolean,
  host: boolean,
  userList: boolean,
  pushToTalk: boolean
}
```
