import { HttpClient } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../interface/user-interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';

    public userSignal = signal<User | null>(null);

    user = computed(() => this.userSignal());
    isLoggedIn = computed(() => !!this.userSignal());

    constructor(private http: HttpClient) {
        this.restoreSession();
    }

    login(userEmail: string, password: string): Observable<{ accessToken: string }> {
        return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, {
            userEmail,
            password
        }).pipe(
            tap(response => {
                const userData = {
                    accessToken: response.accessToken
                };

                localStorage.setItem('user', JSON.stringify(userData));

                const userFromToken = this.getUserFromToken();
                if (userFromToken) {
                    this.userSignal.set(userFromToken);
                } else {
                    this.userSignal.set(null);
                }
            })
        );
    }


    logout(): void {
        this.userSignal.set(null);
        localStorage.removeItem('user');
    }

    setUser(user: User): void {
        this.userSignal.set(user);
        localStorage.setItem('user', JSON.stringify(user))
    }

    register(firstName: string, lastName: string, userEmail: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, {
            firstName,
            lastName,
            userEmail,
            password
        }, { responseType: 'text' });
    }

    restoreSession(): void {
        try {
            const user = this.getUserFromToken();
            if (user) {
                this.userSignal.set(user);
            } else {
                this.userSignal.set(null);
            }
        } catch (e) {
            console.error('Erro ao restaurar a sessão: ', e);
            this.userSignal.set(null);
            localStorage.removeItem('user');
        }
    }

    getAccessToken(): string | null {
        const stored = localStorage.getItem('user');
        if (!stored) return null;

        try {
            const parsed = JSON.parse(stored);
            return parsed.accessToken ?? null;
        } catch (e) {
            console.error('Invalid Token in localStorege:', e)
            return null
        }
    }
    getUserFromToken(): User | null {
        const token = this.getAccessToken();
        if (!token) return null;

        const payload = token.split('.')[1];
        if (!payload) return null;

        try {
            const decoded = JSON.parse(atob(payload));
            return {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                userEmail: decoded.email
            };
        } catch (e) {
            console.error('Erro ao decodificar token:', e);
            return null;
        }
    }
}
