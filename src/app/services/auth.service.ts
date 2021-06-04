import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Role } from '../model/role.enum';
import { ReturnedUser } from '../model/returnedUser';

export const AUTHENTICATED_USER = "authenticatedUser";
export const TOKEN = "token";
export const REFERRAL_ID = "referralId";
export const ROLE = "role";

@Injectable()
export class AuthService {

    private user: ReturnedUser ;
    isAuthorized() {
        //return !!this.user;
        return this.getAuthenticatedUser() != null && this.getAuthenticatedUser().trim().length > 0
                &&
               this.getToken() != null && this.getToken().trim().length > 0
    }

    hasRole(role: Role) {
      console.warn(role.toString());
      console.warn(this.getRole().toString());
      return this.isAuthorized() && this.getRole() === role.toString();
    }

    login(referralId: number, userName: string, role: Role, token: string) {
      this.user = { referralId, userName, role, token};
      sessionStorage.setItem(AUTHENTICATED_USER, userName);
      sessionStorage.setItem(TOKEN, token);
      sessionStorage.setItem(REFERRAL_ID, referralId.toString());
      sessionStorage.setItem(ROLE, role.toString());
    }

    logout() {
      this.user = null;
      sessionStorage.removeItem(AUTHENTICATED_USER);
      sessionStorage.removeItem(TOKEN);
      sessionStorage.removeItem(REFERRAL_ID);
      sessionStorage.removeItem(ROLE);
    }

    getReturnedUser(): ReturnedUser {
      return this.user;
    }

    getToken(){
      return sessionStorage.getItem(TOKEN);
    }

    getAuthenticatedUser(){
      return sessionStorage.getItem(AUTHENTICATED_USER);
    }

    getReferralId() {
      return sessionStorage.getItem(REFERRAL_ID);
    }

    getRole() {
      return sessionStorage.getItem(ROLE);
    }
}
