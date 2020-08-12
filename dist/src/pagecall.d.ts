import { ApiKeyPair, PageCallParam, Token, User, ConnectInParam, ReplayParam, ReplayLegacyParam, FinishParam, ConnectInResponse, FinishResponse, ReplayResponse, OnGoingResponse } from './pagecall-legacy';
export declare class PageCall {
    private param;
    currentToken: Token;
    keyPair: ApiKeyPair;
    constructor(param: PageCallParam);
    getToken(): Promise<Token>;
    connectIn(param: ConnectInParam): Promise<ConnectInResponse>;
    finish(param: FinishParam): Promise<FinishResponse>;
    onGoing(): Promise<OnGoingResponse[]>;
    getWebhookData(roomId: string): Promise<Partial<OnGoingResponse>>;
    getRoom(roomId: string): Promise<Partial<OnGoingResponse>>;
    getUser(userId: string): Promise<User>;
    getRoomByPublicId(publicRoomId: string): Promise<Partial<OnGoingResponse>>;
    getRoomIds(): Promise<string[]>;
    replay(param: ReplayParam): Promise<ReplayResponse>;
    replayLegacy(param: ReplayLegacyParam): Promise<ReplayResponse>;
    private tokenValid;
    private restPost;
}
