import { Injectable } from '@angular/core';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  role: string;
  access_token: string;
}

const credentialsKey = 'credentials';
const accesstokenKey = 'access_token';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _credentials: Partial<Credentials> | null = null;
  private _accesstoken: string | null = null;

  constructor() {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);

    const savedAccessToken =
      sessionStorage.getItem(accesstokenKey) ||
      localStorage.getItem(accesstokenKey);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }

    if (savedAccessToken) {
      this._accesstoken = savedAccessToken;
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    // return !!this.credentials;
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  isRestricted(): boolean {
    // return !!this.credentials;
    if (localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }

  getRole(): string {
    if (this.isAuthenticated()) {
      let credentials = JSON.parse(localStorage.getItem('credentials'));
      return credentials.data.role;
    }
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Partial<Credentials> | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Partial<Credentials>, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);

      let access_token = localStorage.getItem('access_token')
        ? localStorage.getItem('access_token')
        : null;
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('access_token', access_token);
    }
  }

  setAccessToken(credentials?: string, remember?: boolean) {
    this._accesstoken = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(accesstokenKey, credentials);
    } else {
      sessionStorage.removeItem(accesstokenKey);
      localStorage.removeItem(accesstokenKey);
      localStorage.clear();
      sessionStorage.clear();
    }
  }
}
