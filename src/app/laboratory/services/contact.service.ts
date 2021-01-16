import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    constructor(
      private http: HttpClient
    ) {};

    PostMessage(input: any) {
      return this.http.post('https://desmoulin.federico@gmail.com', input, { responseType: 'text' }).pipe(
          map(
            (response) => {
              if (response) {
                return response;
              }
            },
            (error: any) => {
              return error;
            }
          )
        )
    }
}
