import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelCase } from 'change-case';
import { integrate, cross, crossAll, overlap } from 'time-overlap';
const config = {
  defaultApiEndpoint: 'https://api.pagecall.net/v1',
  defaultAppEndpoint: 'https://app.pagecall.net'
}
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
export enum RoomType {
  Open = 'open',
  Public = 'public',
  Private = 'private'
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
  sort_by?: '-created_at' | '+created_at'
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
export class PageCallNew {
  readonly apiEndpoint: string;
  readonly appEndpoint: string;
  readonly apiToken: string;
  private axiosInstance: AxiosInstance;

  constructor(private param: PageCallNewParam) {
    const { apiEndpoint, appEndpoint, apiToken } = param;
    this.apiEndpoint = apiEndpoint || config.defaultApiEndpoint;
    this.appEndpoint = appEndpoint || config.defaultAppEndpoint;
    this.apiToken = apiToken;
    this.axiosInstance = axios.create({
      baseURL: this.apiEndpoint,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      }
    });
  }
  async createPublicRoom(
    name: string,
    layoutId: string,
    replayLayoutId?: string,
    replayOptionsPresetId?:string
  ): Promise<Room> {
    const response = await this.post<{room: object}>('/rooms', {
      type: RoomType.Public,
      name,
      layout_id: layoutId,
      replay_layout_id: replayLayoutId,
      replay_options_preset_id: replayOptionsPresetId
    });
    return this.convertObjectToCamelCase(response.room) as Room;
  }
  async getRoom(roomId: string): Promise<Room> {
    const response = await this.get<{room: object}>(`/rooms/${roomId}`);
    return this.convertObjectToCamelCase(response.room) as Room;
  }
  async getSessions(roomId: string, query?: SessionQuery, limiter?: Limiter): Promise<Session[]> {
    const response = await this.get<{sessions: Session[]}>(`/rooms/${roomId}/sessions`, {...query, ...limiter});
    return response.sessions.map(session => this.convertObjectToCamelCase(session)) as Session[];
  }
  async getAllSessions(roomId: string, query?: SessionQuery): Promise<Session[]> {
    const beforeSorted = (await this.getSessionsRecursively(roomId, 0, query))
      .map(session => this.convertObjectToCamelCase(session)) as Session[];
    return beforeSorted.sort((a, b) =>
      (new Date(a.connectedAt).getTime() - new Date(b.connectedAt).getTime())
    );
  }
  private async getSessionsRecursively(
    roomId: string,
    offset: number,
    query: SessionQuery = {}
  ): Promise<Session[]> {
    const currentResult: GetSessionsResponse
      = await this.get<GetSessionsResponse>(`/rooms/${roomId}/sessions`, {
        limit: '30',
        offset: offset + '',
        sort_by: '-connected_at',
        ...query
      });
    const done = currentResult.paging.offset + 30 >= currentResult.paging.total;
    if (done) {
      return currentResult.sessions;
    } else {
      return [
        ...currentResult.sessions,
        ...await this.getSessionsRecursively(roomId, offset + 30, query),
      ];
    }
  }
  async getRooms(
    offset: number,
    limit: number,
    desc: boolean,
    query: object = {}
  ): Promise<Room[]> {
    const response = await this.get<{rooms: object[]}>('/rooms', {
      ...query,
      offset: offset.toString(),
      limit: limit.toString(),
      sort_by: desc ? '-created_at' : '+created_at',
    });
    return response.rooms
      .map(room => this.convertObjectToCamelCase(room) as Room);
  }
  async terminateRoom(roomId: string): Promise<Room> {
    const response = await this.put<{room: object}>(`/rooms/${roomId}`, {
      is_terminated: true
    });
    return this.convertObjectToCamelCase(response.room) as Room;
  }
  async createUser(userId: string, name: string, metadata?: object): Promise<NewUser> {
    const response = await this.post<{user: object}>('/users', {
      name,
      metadata,
      user_id: userId,
    });
    return this.convertObjectToCamelCase(response.user) as NewUser;
  }
  async getUser(userId: string): Promise<NewUser> {
    const response = await this.get<{user: object}>(`/users/${encodeURI(userId)}`);
    return this.convertObjectToCamelCase(response.user) as NewUser;
  }
  async getUsers(offset: number, limit: number, desc: boolean): Promise<NewUser[]> {
    const response = await this.get<{users: object[]}>('/users', {
      offset: offset.toString(),
      limit: limit.toString(),
      sort_by: desc ? '-created_at' : '+created_at'
    });
    return response.users
      .map(user => this.convertObjectToCamelCase(user) as NewUser);
  }
  async createMember(
    roomId: string,
    userId: string,
    layoutId?: string,
    options?: object,
    optionsPresetId?:string
  ): Promise<Member> {
    const response = await this.post<{member: object}>(`/rooms/${roomId}/members`, {
      user_id: userId,
      layout_id: layoutId || undefined,
      options_preset_id: optionsPresetId,
      options
    });
    return this.convertObjectToCamelCase(response.member) as Member;
  }
  async joinRoom(
    roomId: string,
    userId: string,
    layoutId?: string,
    options?: object,
    build?: string,
    optionsPresetId?: string
  ): Promise<JoinRoomResult> {
    const user = await this.getUser(userId);
    const member = await this.createMember(roomId, userId, layoutId, options, optionsPresetId);
    const html = await this.getHtml(build);
    const { accessToken } = user;
    return {
      html: this.injectAuthKeysToHtml(html, roomId, accessToken, 'meet'),
      roomId
    };
  }
  async getURL(
    roomId: string,
    userId: string,
    layoutId?: string,
    options?: object,
    build?: string
  ): Promise<string> {
    const member = await this.createMember(roomId, userId, layoutId, options);
    return `${this.appEndpoint}/${roomId}?access_token=${member.accessToken}${build ? '&build=' + build : ''}`;
  }
  async replayRoom(
    roomId: string,
    userId?: string,
    build?: string
  ): Promise<JoinRoomResult> {
    const html = await this.getHtml(build);
    const user = userId ? await this.getUser(userId) : { accessToken: ''};
    const { accessToken } = user;
    return {
      html: this.injectAuthKeysToHtml(html, roomId, accessToken, 'replay'),
      roomId
    };
  }
  async postActionToSessions(sessionIds: string[], type: string, payload: object): Promise<{ok: boolean}> {
    return this.post<{ok: boolean}>('/post_action_to_sessions', {
      type,
      payload,
      session_ids: sessionIds
    });
  }
  async getIntegratedTime(roomId: string): Promise<number> {
    return this.getIntegratedTimeFromSessions(await this.getAllSessions(roomId));
  }
  private async getHtml(build?: string): Promise<string> {
    return axios.get(`${this.appEndpoint}${build ? '?build=' + build : ''}`).then(result => {
      return result.data;
    }).catch(err => console.error(err));
  }
  private injectAuthKeysToHtml(
    html: string,
    roomId: string,
    accessToken: string,
    mode: 'meet' | 'replay'
  ): string {
    return this.injectGlobalVariablesToHtml(html, {
      room_id: roomId,
      access_token: accessToken,
      mode
    });
  }
  private getIntegratedTimeFromSessions(sessions: Session[]): number {
    const timestamps = sessions.map(session => ({
      memberId: session.memberId,
      connectedAt: new Date(session.connectedAt).getTime(),
      disconnectedAt: session.disconnectedAt
      ? new Date(session.disconnectedAt).getTime()
      : Date.now()
    })).reduce(({ timestamps, memberIds }, curr) => {
      const nextState = { timestamps: [...timestamps], memberIds: [...memberIds]};
      const memberIndex = memberIds.indexOf(curr.memberId);
      if (memberIndex >= 0) {
        nextState.timestamps[memberIndex] = [...timestamps[memberIndex], curr.connectedAt, curr.disconnectedAt];
      } else {
        nextState.memberIds.push(curr.memberId);
        nextState.timestamps.push([curr.connectedAt, curr.disconnectedAt]);
      }
      return nextState;
    }, { timestamps: [], memberIds: []}).timestamps;

    return integrate(
      cross([0, Date.now()], overlap(timestamps))
    );
  }
  private injectGlobalVariablesToHtml(
    html: string,
    variables: {[key: string]: string}): string {
      const script = Object.keys(variables)
        .reduce((prev, curr) => prev + `window.${curr} = "${variables[curr]}";\n`, '');
      return html.replace('<head>', `<head>\n<script>\n${script}</script>\n`);
  }
  private convertObjectToCamelCase<T>(obj: object): object {
    if (!obj || Object.keys(obj).length === 0) {
      return obj;
    }
    return Object.keys(obj)
      .reduce((prev, curr) => ({ ...prev, [camelCase(curr)]: obj[curr]}), {});
  }
  public async post<T>(path: string, body: object): Promise<T> {
    return this.axiosInstance.post<any, AxiosResponse<T>>(path, JSON.stringify(body))
      .then(response => response.data)
      .catch(err => {
        return err.response.data;
      });
  }
  public async get<T>(
    path: string,
    queryParams?: Record<string, string> | Limiter | SessionQuery
  ): Promise<T> {
    return this.axiosInstance.get<any, AxiosResponse<T>>(path, {params: queryParams})
      .then(response => response.data)
      .catch(err => {
        return err.response.data;
      });
  }
  public async put<T>(path: string, body: object): Promise<T> {
    return this.axiosInstance.put<any, AxiosResponse<T>>(path, JSON.stringify(body))
      .then(response => response.data)
      .catch(err => {
        return err.response.data;
      });
  }
}