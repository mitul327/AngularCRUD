import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Department } from "../models/department.model";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { Employee } from "../models/employee.model";
import { EmployeeService } from "./employee.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.css"],
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild("employeeForm", { static: false })
  public createEmployeeForm: NgForm;
  public previewPhoto = false;
  public panelTitle: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  public departments: Department[] = [
    { id: 1, name: "Help Desk" },
    { id: 2, name: "HR" },
    { id: 3, name: "IT" },
    { id: 4, name: "Payroll" },
    { id: 5, name: "Admin" },
  ];
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department: "select",
    isActive: null,
    photoPath: null,
    password: null,
    confirmPassword: null,
  };
  constructor(
    private _employeeService: EmployeeService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: "theme-dark-blue",
        dateInputFormat: "DD/MM/YYYY",
      }
    );
  }

  ngOnInit() {
    this._route.paramMap.subscribe((paramterMap) => {
      const id = +paramterMap.get("id");
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: "",
        dateOfBirth: null,
        department: "select",
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = "Create Employee";
      this.createEmployeeForm.reset();
    } else {
      this._employeeService.getEmployee(id).subscribe(
        (employee) => {
          this.employee = employee;
        },
        (err: any) => console.log(err)
      );
      this.panelTitle = "Edit Employee";
    }
  }

  public saveEmployee(empForm: NgForm): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe((data: Employee) => {
          empForm.reset();
          this.router.navigate(["list"]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(() => {
          empForm.reset();
          this.router.navigate(["list"]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    /*const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this.router.navigate(['list']); */
  }

  public togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
