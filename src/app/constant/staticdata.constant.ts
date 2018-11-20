import { HttpHeaders } from "@angular/common/http";
import { User } from "../model/user";

export const StaticDataConst  = {

        getHeader() {
                return {headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
        },

        getTimes() {
                var time = [];
                for (var i = 1; i <= 60; i++) {
                        time.push(i);
                }
                return time; 
        },

        getSlotCell() {
                var time = [];
                for (var i = 1; i <= 3600; i++) {
                        time.push(i);
                }
                return time; 
        },

        setUser(user:any) {
                sessionStorage.setItem("userId", user.userId);
        },

        getUser() {
                return sessionStorage.getItem("user");
        },

        getUserId() {
                return sessionStorage.getItem("userId");
        },

        isUserExists() {
                let user = sessionStorage.getItem("user");
                return user ? true : false;
        }
}


