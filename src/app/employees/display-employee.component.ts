import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from "@angular/core";
import { Employee } from "../models/employee.model";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-display-employee",
  templateUrl: "./display-employee.component.html",
  styleUrls: ["./display-employee.component.css"],
})
export class DisplayEmployeeComponent implements OnInit {
  public modalRef: BsModalRef;
  private selectedEmployeeId: number;
  public confirmDelete = false;
  // Parent component will use this Input property to pass
  // the employee object to which the template binds to
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get("id");
  }

  public viewEmployee() {
    this._router.navigate(["/employees", this.employee.id], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  public editEmployee() {
    this._router.navigate(["/edit", this.employee.id]);
  }

  public deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with ID = ${this.employee.id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
    this.modalRef.hide();
  }

  public openModal(template: TemplateRef<any>) {
    this.confirmDelete = true;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  public cancel() {
    this.confirmDelete = false;
    this.modalRef.hide();
  }
}
