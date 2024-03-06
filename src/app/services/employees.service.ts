import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employees';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44392/Api/Employee"

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  insertEmployees(employe:Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employe);
  }

  updateEmployee(id:number, employe:Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, employe);
  }

  deleteEmployee(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
