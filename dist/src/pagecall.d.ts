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
}
export interface ConnectInParam {
    userId: string;
    publicRoomId: string;
    allowedTime: string;
    userData?: string;
    roomData?: string;
    appName?: string;
}
export interface ReplayParam {
    roomId: string;
    appName?: string;
    appVersion?: string;
}
export interface ConnectWithResponse {
    html: string;
    roomId: string;
}
export interface ConnectInResponse {
    html: string;
    roomId: string;
}
export interface ReplayResponse {
    html: string;
}
export declare class PageCall {
    private param;
    currentToken: Token;
    keyPair: ApiKeyPair;
    constructor(param: PageCallParam);
    getToken(): Promise<Token>;
    connectWith(param: ConnectWithParam): Promise<ConnectWithResponse>;
    connectIn(param: ConnectInParam): Promise<ConnectInResponse>;
    replay(param: ReplayParam): Promise<ReplayResponse>;
    private tokenValid;
    private restPost;
}
