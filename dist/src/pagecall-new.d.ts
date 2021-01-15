export interface Session {
    connectionId: string;
    connectedAt: string;
    disconnectedAt: string;
    elapsedTime: number;
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
export declare class PageCallNew {
    private param;
    readonly apiEndpoint: string;
    readonly appEndpoint: string;
    readonly apiToken: string;
    private axiosInstance;
    constructor(param: PageCallNewParam);
    createPublicRoom(name: string, layoutId: string): Promise<Room>;
    getRoom(roomId: string): Promise<Room>;
    getRooms(offset: number, limit: number, desc: boolean, query?: object): Promise<Room[]>;
    terminateRoom(roomId: string): Promise<Room>;
    createUser(userId: string, name: string, metadata?: object): Promise<NewUser>;
    getUser(userId: string): Promise<NewUser>;
    getUsers(offset: number, limit: number, desc: boolean): Promise<NewUser[]>;
    createMember(roomId: string, userId: string, layoutId?: string, options?: object): Promise<Member>;
    joinRoom(roomId: string, userId: string, layoutId?: string, options?: object): Promise<JoinRoomResult>;
    replayRoom(roomId: string, userId?: string): Promise<JoinRoomResult>;
    private getHtml;
    private injectAuthKeysToHtml;
    private injectGlobalVariablesToHtml;
    private convertObjectToCamelCase;
    private post;
    private get;
    private put;
}
