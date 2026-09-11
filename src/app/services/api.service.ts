import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "@nb/models/api-page.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private http = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }
}
