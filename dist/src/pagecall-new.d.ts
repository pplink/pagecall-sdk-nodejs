export interface Session {
    id: string;
    subscribedCanvasTime: number;
    subscribedMediaSize: number;
    connectionId: string;
    connectedAt: string;
    disconnectedAt: string;
    elapsedTime: number;
    memberId: string;
    userId: string;
    roomId: string;
    organizationId: string;
    ipAddress: string;
    userAgent: string;
}
export interface Member {
    id: string;
    name: string;
    organizationId: string;
    applicationId: string;
    roomId: string;
    userId: string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    isAnonymous: boolean;
    sessions: Session[];
}
export interface NewUser {
    userId: string;
    name: string;
    organizationId: string;
    applicationId: string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    metadata: object;
}
export interface Room {
    id: string;
    name: string;
    organizationId: string;
    applicationId: string;
    distinctUserIds: string[];
    terminatedAt: string;
    type: RoomType;
    isDistinct: boolean;
    createdAt: string;
    updatedAt: string;
    isTerminated: boolean;
    members: Member[];
}
export declare enum RoomType {
    Open = "open",
    Public = "public",
    Private = "private"
}
export interface PageCallNewParam {
    apiEndpoint?: string;
    appEndpoint?: string;
    apiToken: string;
}
export interface JoinRoomResult {
    html: string;
    roomId: string;
}
export interface Limiter {
    offset?: string;
    limit?: string;
    sort_by?: '-created_at' | '+created_at';
}
export interface GetSessionsResponse {
    sessions: Session[];
    paging: {
        limit: number;
        offset: number;
        total: number;
    };
}
export interface SessionQuery {
    is_connecting?: 'true';
}
export declare class PageCallNew {
    private param;
    readonly apiEndpoint: string;
    readonly appEndpoint: string;
    readonly apiToken: string;
    private axiosInstance;
    constructor(param: PageCallNewParam);
    createPublicRoom(name: string, layoutId: string, replayLayoutId?: string, replayOptionsPresetId?: string): Promise<Room>;
    getRoom(roomId: string): Promise<Room>;
    getSessions(roomId: string, query?: SessionQuery, limiter?: Limiter): Promise<Session[]>;
    getAllSessions(roomId: string, query?: SessionQuery): Promise<Session[]>;
    private getSessionsRecursively;
    getRooms(offset: number, limit: number, desc: boolean, query?: object): Promise<Room[]>;
    terminateRoom(roomId: string): Promise<Room>;
    createUser(userId: string, name: string, metadata?: object): Promise<NewUser>;
    getUser(userId: string): Promise<NewUser>;
    getUsers(offset: number, limit: number, desc: boolean): Promise<NewUser[]>;
    createMember(roomId: string, userId: string, layoutId?: string, options?: object): Promise<Member>;
    joinRoom(roomId: string, userId: string, layoutId?: string, options?: object, build?: string): Promise<JoinRoomResult>;
    getURL(roomId: string, userId: string, layoutId?: string, options?: object, build?: string): Promise<string>;
    replayRoom(roomId: string, userId?: string, build?: string): Promise<JoinRoomResult>;
    postActionToSessions(sessionIds: string[], type: string, payload: object): Promise<{
        ok: boolean;
    }>;
    getIntegratedTime(roomId: string): Promise<number>;
    private getHtml;
    private injectAuthKeysToHtml;
    private getIntegratedTimeFromSessions;
    private injectGlobalVariablesToHtml;
    private convertObjectToCamelCase;
    post<T>(path: string, body: object): Promise<T>;
    get<T>(path: string, queryParams?: Record<string, string> | Limiter | SessionQuery): Promise<T>;
    put<T>(path: string, body: object): Promise<T>;
}
