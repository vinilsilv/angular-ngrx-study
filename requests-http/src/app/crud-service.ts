import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T> {
    
    constructor(protected http: HttpClient, private API_URL: string){}

    list() {
        return this.http
          .get<T[]>(this.API_URL)
          .pipe(delay(0), tap(console.log));
      }
    
      loadById(id: number){
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1))
      }
    
      private create(record: T) {
        return this.http.post<T>(this.API_URL, record).pipe(
          take(1)
        )
      }
    
      private update(record: T) {
        return this.http.put<T>(`${this.API_URL}/${record['id' as keyof T]}`, record).pipe(take(1))
      }
    
      save(record: T) {
        if (record['id' as keyof T]) {
          return this.update(record);
        }
        return this.create(record)
      }
    
      remove(id: number){
        return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1))
      }
}
