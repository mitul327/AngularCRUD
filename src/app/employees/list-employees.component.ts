import { Component } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.css"],
})
export class ListEmployeesComponent {
  employees: Employee[];
  // Use this property to stored filtered employees, so we do not
  // lose the original list and do not have to make a round trip
  // to the web server on every new search
  filteredEmployees: Employee[];
  // tslint:disable-next-line: variable-name
  public _searchTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data["employeeList"];
    if (this._route.snapshot.queryParamMap.has("searchTerm")) {
      this.searchTerm = this._route.snapshot.queryParamMap.get("searchTerm");
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  public filterEmployees(searchString: string): Employee[] {
    return this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
  }

  public onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex((e) => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
