import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Employee } from "../models/employee.model";
import { Injectable } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { Observable } from "rxjs";

@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter
export class EmployeeListResolverService implements Resolve<Employee[]> {
  // Inject the employeee service as we need it to retrieve employee data
  constructor(private _employeeService: EmployeeService) {}
  // Resolve interface contains the following one method for which we need to
  // provide implementation. This method calls EmployeeService & returns employee data
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Employee[]> {
    return this._employeeService.getEmployees();
  }
}
