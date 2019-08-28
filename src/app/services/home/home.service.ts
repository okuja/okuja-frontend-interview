import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

    post_math_operation(math_operation: any) {
      return this.http.post(`${AppSettings.API_ENDPOINT}`, math_operation);
  }
}
