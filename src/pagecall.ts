import * as rest from 'restler';

export interface ApiKeyPair {
  apiKey: string;
  apiSecret: string;
}
export interface PageCallParam {
  apiKey: string;
  apiSecret: string;
  apiEndPoint: string;
}
export interface Token {
  token: string;
  exp: number;
}
export interface ConnectWithParam {
  userId: string;
  partnerId: string;
  allowedTime: string;
  userData?: string;
  roomData?: string;
  appName?: string;
  appVersion?: string;
  templateName?: string;
}
export interface ConnectInParam {
  userId: string;
  publicRoomId: string;
  allowedTime: string;
  userData?: string;
  roomData?: string;
  appName?: string;
  appVersion?: string;
  templateName?: string;
}
export interface ReplayParam {
  roomId: string;
  appName?: string;
  appVersion?:string;
}
export interface ReplayLegacyParam {
  noteFile: string;
}
export interface ConnectWithResponse {
  html: string;
  roomId: string;
  busy?: boolean;
}
export interface ConnectInResponse {
  html: string;
  roomId: string;
  busy?: boolean;
}
export interface ReplayResponse {
  html: string;
}
export class PageCall {
  currentToken: Token;
  keyPair: ApiKeyPair;
  constructor(private param: PageCallParam) {
    this.keyPair = {apiKey: param.apiKey, apiSecret: param.apiSecret};
  }

  getToken(): Promise<Token> {
    return new Promise((res, rej) => {
      if (this.tokenValid()) {
        res(this.currentToken);
      } else { // need a new token
        this.restPost(this.param.apiEndPoint + '/authentication/token', this.keyPair)
          .then(data => {
            this.currentToken = data;
            res(data);
          })
          .catch(err => {
            // todo: handling error
            rej(err);
          });
      }
    });
  }

  connectWith(param: ConnectWithParam): Promise<ConnectWithResponse> {
    return this.getToken()
      .then(token => {
        return this.restPost(this.param.apiEndPoint + '/connection/with', param, { 'Authorization': `bearer ${token.token}`})
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  connectIn(param: ConnectInParam): Promise<ConnectInResponse> {
    return this.getToken()
      .then(token => {
        return this.restPost(this.param.apiEndPoint + '/connection/in', param, { 'Authorization': `bearer ${token.token}`})
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  replay(param: ReplayParam): Promise<ReplayResponse> {
    return this.getToken()
      .then(token => {
        return this.restPost(this.param.apiEndPoint + '/connection/replay', param, {'Authorization': `bearer ${token.token}`})
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  replayLegacy(param: ReplayLegacyParam): Promise<ReplayResponse> {
    return this.getToken()
      .then(token => {
        return this.restPost(this.param.apiEndPoint + '/connection/replay-legacy', param, {'Authorization': `bearer ${token.token}`})
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }

  private tokenValid(): boolean {
    return this.currentToken && (this.currentToken.exp * 1000) - Date.now() > 60000; // safe padding 1 minutes;
  }
  private restPost(url, data, headers = {}): Promise<any> {
    return new Promise((res, rej) => {
      rest.post(url, {data, headers}).on('complete', (data, response) => {
        if (response && response.statusCode === 200) {
          res(data);
        } else {
          rej(data);
        }
      })
    });
  }
}