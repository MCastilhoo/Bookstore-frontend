import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    login(userEmail: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, {
            userEmail: userEmail,
            password: password
        });
    }

    register(firstName: string, lastName: string, userEmail: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, {
            firstName: firstName,
            lastName: lastName,
            userEmail: userEmail,
            password: password
        }, { responseType: 'text' })
    }
} 