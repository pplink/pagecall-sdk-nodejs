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
    autoFinish?: 'true' | 'false';
}
export interface ReplayParam {
    roomId: string;
    appName?: string;
    appVersion?: string;
    options?: string;
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
        };
    };
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
                [sessionId: string]: number[];
            };
            errorSessions: string[];
        };
    }[];
    sessionInfo: {
        id: string;
        serviceId: string;
        userId: string;
    }[];
}
export declare class PageCall {
    private param;
    currentToken: Token;
    keyPair: ApiKeyPair;
    constructor(param: PageCallParam);
    getToken(): Promise<Token>;
    /**
     * @Deprecated
     * @param param
     */
    connectWith(param: ConnectWithParam): Promise<ConnectWithResponse>;
    connectIn(param: ConnectInParam): Promise<ConnectInResponse>;
    finish(param: FinishParam): Promise<FinishResponse>;
    onGoing(): Promise<OnGoingResponse>;
    replay(param: ReplayParam): Promise<ReplayResponse>;
    replayLegacy(param: ReplayLegacyParam): Promise<ReplayResponse>;
    private tokenValid;
    private restPost;
}
