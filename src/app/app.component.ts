import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeesService } from './services/employees.service';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeRegistrationFormComponent } from './employee-registration-form/employee-registration-form.component';
import { Employee } from './models/employees';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['Id', 'name', 'date', 'age', 'position', 'status', 'buttons'];
  dataSource: MatTableDataSource<any>;
  searchTerm: string = '';

  constructor(private employeeService: EmployeesService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
  }

  openRegistrationModal(): void {
    const dialogRef = this.dialog.open(EmployeeRegistrationFormComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.employeeAdded.subscribe(() => {
      this.onDataTable();
      dialogRef.close(); 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEditModal(user: any): void {
    const dialogRef = this.dialog.open(EmployeeRegistrationFormComponent, {
      width: '500px',
      data: { user, mode: 'edit' }
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.onDataTable();
  }

  ngAfterViewInit() {
    this.onDataTable();
    this.dataSource.paginator = this.paginator;
  }

  onDataTable() {
    this.employeeService.getEmployees().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  deleteEmployee(Id:number):void{
    Swal.fire({
      title: "Estas seguro de borrar al empleado?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(Id).subscribe(res => {
          Swal.fire({
          title: "Registro borrado",
          text: "El registro del empleado ha sido eliminado.",
          icon: "success"
        });
      this.onDataTable()})
      }
    });
  }

  changeUserStatus(employee: Employee): void {
    Swal.fire({
      title: "Estas seguro de actualizar el estatus del empleado?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar"
    }).then((result) => {
      if (result.isConfirmed) {
        employee.Estatus = false;
        this.employeeService.updateEmployee(employee.Id, employee).subscribe(() =>{
          Swal.fire({
          title: "Estatus Actualizado",
          text: "El estatus del empleado ha sido actualizado.",
          icon: "success"
        });
      this.onDataTable()})
      }
    });
  }
  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}




