import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Employee } from '../models/employees';
import Swal from 'sweetalert2';
import { EmployeesService } from '../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-registration-form',
  templateUrl: './employee-registration-form.component.html',
  styleUrls: ['./employee-registration-form.component.scss']
})
export class EmployeeRegistrationFormComponent implements OnInit {
  employee: Employee = new Employee();
  tittle:string 
  isNewUser: boolean = true;
  @Output() employeeAdded: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private employeeService:EmployeesService,
    public dialogRef: MatDialogRef<EmployeeRegistrationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.user) {
      this.tittle = "Editar Usuario"
      this.employee = data.user;
      this.isNewUser = false;
      
    } else {
      this.tittle = "Agregar Usuario"
      this.employee.Estatus = true
      this.employee = new Employee();
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.employee.Nombre == "" || this.employee.FechaNacimiento == "" || this.employee.Posicion == ""){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Favor de llenar los datos requeridos",
      });
      return;
    }
    else if (this.employee.Edad <= 15) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La edad no puede ser menor a 16años",
      });
      return;
    }
    if (this.data && this.data.user && this.data.user.Id !== '') {
      this.updateEmployee(this.employee);
    } else {
      this.addEmployee(this.employee);
    }
  }

  updateEmployee(employee:Employee): void{
    this.employeeService.updateEmployee(employee.Id, employee).subscribe(res =>{
      Swal.fire({
        icon: "success",
        title: "",
        text: "Registro actualizado correctamente",
      });
      this.employeeAdded.emit();
    })

  }

  addEmployee(employee:Employee):void{
    this.employeeService.insertEmployees(employee).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "",
        text: "Registro agregado correctamente",
      });
      this.employeeAdded.emit();
    })
  }
  onCancel(): void {
    this.dialogRef.close();
  }
} 

