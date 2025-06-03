import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    login(userEmail: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, {
            userEmail: userEmail,
            password: password
            });
    }
} 