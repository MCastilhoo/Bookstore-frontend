import { Injectable } from "@angular/core";
import { Genre } from "../interface/genres-interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private apiUrl = 'http://localhost:8080/api'

    constructor(private http: HttpClient) { }

    getGenres(): Observable<Genre[]> {
        return this.http.get<Genre[]>(`${this.apiUrl}/genres`)
    }
}