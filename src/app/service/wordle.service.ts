import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Word } from '../entity/word';

@Injectable({
  providedIn: 'root'
})
export class WordleService {

  constructor(private http: HttpClient) { }

  url: string = "https://api.dictionaryapi.dev/api/v2/entries/en/";


  getMeaning(word: string): Observable<Word> {
    return this.http.get<Word[]>(this.url + word).pipe(
      map(response => {
        return response[0];
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError({ error: `No Hint Found` });
        } else {
          return throwError({ error: 'Something went wrong, please try again later' });
        }
      })
    );
  }
}
