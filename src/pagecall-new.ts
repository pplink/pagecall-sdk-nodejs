import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelCase } from 'change-case';
const config = {
  defaultApiEndpoint: 'https://api.pagecall.net/v1',
  defaultAppEndpoint: 'https://app.pagecall.net'
}
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
export class PageCallNew {
  readonly apiEndpoint: string;
  readonly appEndpoint: string;
  readonly apiToken: string;
  private axiosInstance: AxiosInstance;

  constructor(private param: PageCallNewParam) {
    const { apiEndpoint, appEndpoint, apiToken } = param;
    this.apiEndpoint = apiEndpoint || config.defaultApiEndpoint;
    this.appEndpoint = appEndpoint || config.defaultApiEndpoint;
    this.apiToken = apiToken;
    this.axiosInstance = axios.create({
      baseURL: this.apiEndpoint,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      }
    });
  }
  async createPublicRoom(name: string): Promise<Room> {
    const response = await this.post<{room: object}>('/rooms', {
      type: RoomType.Public,
      name
    });
    return this.convertObjectToCamelCase(response.room) as Room;
  }
  async getRoom(roomId: string): Promise<Room> {
    const response = await this.get<{room: object}>(`/rooms/${roomId}`);
    return this.convertObjectToCamelCase(response.room) as Room;
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
  async replayRoom(roomId: string, userId: string): Promise<JoinRoomResult> {
    return this.joinRoom(roomId, userId);
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
    const response = await this.get<{user: object}>(`/users/${userId}`);
    console.log('[pagecall] user', response.user);
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
    layout?: string,
    options?: object
  ): Promise<Member> {
    const response = await this.post<{member: object}>(`/rooms/${roomId}/members`, {
      user_id: userId,
      layout,
      options
    });
    return this.convertObjectToCamelCase(response.member) as Member;
  }
  async joinRoom(
    roomId: string,
    userId: string,
    layout?: string,
    options?: object
  ): Promise<JoinRoomResult> {
    const user = await this.getUser(userId);
    const member = await this.createMember(roomId, userId, layout, options);
    const html = await this.getHtml();
    const { accessToken } = user;
    return {
      html: this.injectAuthKeysToHtml(html, roomId, accessToken),
      roomId
    };
  }
  private async getHtml(): Promise<string> {
    return axios.get(config.defaultAppEndpoint).then(result => result.data);
  }
  private injectAuthKeysToHtml(
    html: string,
    roomId: string,
    accessToken: string
  ): string {
    return this.injectGlobalVariablesToHtml(html, {
      room_id: roomId,
      access_token: accessToken
    });
  }
  private injectGlobalVariablesToHtml(
    html: string,
    variables: {[key: string]: string}): string {
      const script = Object.keys(variables)
        .reduce((prev, curr) => prev + `const ${curr} = "${variables[curr]}";\n`, '');
      return html.replace('<head>', `<head>\n<script>\n${script}</script>\n`);
  }
  private convertObjectToCamelCase<T>(obj: object): object {
    if (!obj || Object.keys(obj).length === 0) {
      return obj;
    }
    return Object.keys(obj)
      .reduce((prev, curr) => ({ ...prev, [camelCase(curr)]: obj[curr]}), {});
  }
  private async post<T>(path: string, body: object): Promise<T> {
    return this.axiosInstance.post<any, AxiosResponse<T>>(path, JSON.stringify(body))
      .then(response => response.data)
      .catch(err => {
        return err.response.data;
      });
  }
  private async get<T>(path: string, queryParams?: Record<string, string>): Promise<T> {
    return this.axiosInstance.get<any, AxiosResponse<T>>(path, {params: queryParams})
      .then(response => response.data)
      .catch(err => {
        return err.response.data;
      });
  }
  private async put<T>(path: string, body: object): Promise<T> {
    return this.axiosInstance.put<any, AxiosResponse<T>>(path, JSON.stringify(body))
      .then(response => response.data)
      .catch(err => {
        return err.response.data;
      });
  }
}