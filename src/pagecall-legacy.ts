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
export interface User {
  id: string;
  createdAt: string;
  roomId: string;
  allowedTime: string;
  userData: string;
  connectedSessions: string;
  finishd: string;
}

/**
 * @Deprecated
 */
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
  allowedTime?: string | number;
  userData?: string | object;
  roomData?: string | object;
  template?: string | object;
  appName?: string;
  appVersion?: string;
  templateName?: string;
  mediaAPIEndpoint?: string;
  socketEndpoint?: string;
  autoFinish?: 'true' | 'false'
}

export interface ReplayParam {
  roomId: string;
  appName?: string;
  appVersion?: string;
  options?: string | object;
}

export interface ReplayLegacyParam {
  noteFile: string;
}

export interface FinishParam {
  roomId: string;
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

export interface FinishResponse {
  roomId: string;
  roomInfo: object;
}

export interface ReplayResponse {
  html: string;
}

export interface OnGoingResponse {
  roomInfo: {
    id: string;
    autoFinish: boolean;
    appName: string;
    startTime: string;
    serviceId: string;
    publicRoomId: string;
    appVersion: string;
    roomData: {
      [key: string]: any;
      layout: object;
    }
  }
  userInfo: {
    id: string;
    serviceId: string;
    createdAt: string;
    roomId: string;
    allowedTime: number;
    userData: object;
    connectedSessions: number;
    finished: string;
    log: {
      raw: string[];
      net: number[];
      perSession: {
        [sessionId: string]: number[]
      };
      errorSessions: string[];
    }
  }[];
  sessionInfo: {
    id: string;
    serviceId: string;
    userId: string;
  }[];
  integratedTime?: number;
}

export class PageCallLegacy {
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
        this.restPost(`${this.param.apiEndPoint}/authentication/token`, this.keyPair)
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

  connectIn(param: ConnectInParam): Promise<ConnectInResponse> {
    return this.getToken()
      .then(token => {
        const safeParam = {...param};
        safeParam.allowedTime = String(param.allowedTime);
        safeParam.userData = typeof param.userData === 'string' ? param.userData : JSON.stringify(param.userData);
        safeParam.roomData = typeof param.roomData === 'string' ? param.roomData : JSON.stringify(param.roomData);
        safeParam.template = typeof param.template === 'string' ? param.template : JSON.stringify(param.template);
        return this.restPost(`${this.param.apiEndPoint}/connection/in`, JSON.stringify(safeParam), {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }

  finish(param: FinishParam): Promise<FinishResponse> {
    return this.getToken()
      .then(token => {
        return this.restPost(`${this.param.apiEndPoint}/connection/finish`, JSON.stringify(param), {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  onGoing(): Promise<OnGoingResponse[]> {
    return this.getToken()
      .then(token => {
        return this.restPost(`${this.param.apiEndPoint}/information/ongoing`, {}, {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  getWebhookData(roomId: string): Promise<Partial<OnGoingResponse>> {
    return this.getToken()
      .then(token => {
        return this.restPost(
          `${this.param.apiEndPoint}/information/webhook-data`,
          JSON.stringify({roomId}),
          {
            'Authorization': `bearer ${token.token}`,
            'Content-Type': 'application/json'
          }
        );
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  getRoom(roomId: string): Promise<Partial<OnGoingResponse>> {
    return this.getToken()
      .then(token => {
        return this.restPost(`${this.param.apiEndPoint}/information/room`, JSON.stringify({roomId}), {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  getUser(userId: string): Promise<User> {
    return this.getToken()
      .then(token => {
        return this.restPost(`${this.param.apiEndPoint}/information/user`, JSON.stringify({userId}), {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  getRoomByPublicId(publicRoomId: string): Promise<Partial<OnGoingResponse>> {
    return this.getToken()
      .then(token => {
        return this.restPost(
          `${this.param.apiEndPoint}/information/room`,
          JSON.stringify({publicRoomId}),
          {
            'Authorization': `bearer ${token.token}`,
            'Content-Type': 'application/json'
          });
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
  getRoomIds(): Promise<string[]> {
    return this.getToken()
      .then(token => {
        return this.restPost(`${this.param.apiEndPoint}/information/rooms`, {}, {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
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
        return this.restPost(`${this.param.apiEndPoint}/connection/replay`, JSON.stringify(param), {
          'Authorization': `bearer ${token.token}`,
          'Content-Type': 'application/json'
        });
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
        return this.restPost(`${this.param.apiEndPoint}/connection/replay-legacy`, param, {'Authorization': `bearer ${token.token}`})
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }

  private tokenValid(): boolean {
    return this.currentToken && (((this.currentToken.exp * 1000) - Date.now()) > 60000); // safe padding 1 minutes;
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
