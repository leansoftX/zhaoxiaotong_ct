import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppConsts } from 'src/app/shared/AppConsts';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private apiUrl = AppConsts.tokenServiceBaseUrl;
    public currentUser: Observable<User>;

    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${this.apiUrl}/Authenticate/Request`, { username, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
