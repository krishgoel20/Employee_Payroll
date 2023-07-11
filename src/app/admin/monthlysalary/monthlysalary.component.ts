// import { Component } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-monthlysalary',
  templateUrl: './monthlysalary.component.html',
  styleUrls: ['./monthlysalary.component.css']
})
export class MonthlysalaryComponent {
  displayedColumns: string[] = ['id', 'emp_id', 'emp_salary_month',	'emp_salary_year',	'emp_salary_reimbursment',	'emp_dept_id',	'emp_grade_id',	'emp_basic',	'emp_da',	'emp_ta',	'emp_hra',	'emp_ma',	'emp_bonus',	'emp_pf',	'emp_pt',	'emp_gross',	'emp_total_salary', 'actions'];
  dataSource!: MatTableDataSource<UserData>;

  formTitle = "Add Salary";
  selectedGrade: any={};
  gradeList:any;
  selectedDepartment!:any;
  departmentList:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  employeeSalaryForm!: FormGroup;
  data: any;
  display: boolean = false;
  constructor(private formBuilder: FormBuilder, private service: ServiceService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(){
    this.employeeSalaryForm = this.formBuilder.group({
      emp_id: ['', Validators.required],
      // employeeName: ['', Validators.required],
      // currentGradeName: ['', Validators.required],
      emp_salary_month: ['', Validators.required],
      emp_hra: ['', Validators.required],
      emp_ta: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      emp_bonus: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      emp_pf: ['', Validators.required],
      emp_total_salary: ['', Validators.required],
      emp_salary_reimbursment: ['', Validators.required],
      emp_salary_year: ['', Validators.required],
      emp_basic: ['', [Validators.required, Validators.email]],
      emp_da: ['', Validators.required],
      emp_ma: ['', Validators.required],
      emp_gross: ['', Validators.required],
      emp_pt: ['', Validators.required]
    });

    this.service.getNewDepartmentList().subscribe((res:any)=>{
      console.log("res", res)
      this.departmentList = res;
    })

    this.service.getGradeDetails().subscribe((res:any)=>{
      console.log("grde res", res);
      this.gradeList = res;
    })

    
    this.service.getEmployeeSalaryDetail().subscribe((res: any) => {
      console.log("res", res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      console.log("res", this.dataSource);
      //this.dataSource.paginator = this.paginator; 
      this.display = true;

    }, error => {
      console.log("error")
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedGradeDetail(e:any){
    console.log("this.selectedGrade", this.selectedGrade, e.target.value);
    // let result = this.gradeList.find((item:any)=>item.id === e.target.value);
    // console.log("result", result);
    // this.selectedGrade = result;
  }
  selectedDepartmentDetail(e:any){
    console.log("selected department", e.target.value);
    this.selectedDepartment = e.target.value;
  }

  editEmployee(employee: any) {
    // Perform the edit action here
    console.log('Editing employee:', employee);
    this.formTitle = "Edit Salary";
    let result = this.gradeList.find((item:any)=>item.id === employee.id);
    console.log("result", result);
    this.selectedGrade = result;
    console.log("this.selectedGrade", this.selectedGrade);
  }

  deleteEmployee(employee: any) {
    // Perform the delete action here
    console.log('Deleting employee:', employee);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEmployeeSalaryDetail(employee).subscribe((res: any) => {
          // Find the index of the object with the matching ID
          const index = this.dataSource.data.findIndex(obj => obj.id === employee);
   
          // If the index is found (not -1), remove the object from the array
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
          }
          this.dataSource = new MatTableDataSource(this.dataSource.data)
             
   
       }, error => console.log(error));
      //  this.departmentAlreadyThere = false;
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    
  }
  onSubmit() {
    // if (this.employeeSalaryForm.invalid) {
    //   return;
    // }

    // Process the form data
    console.log("this.selectedDepartment", this.selectedDepartment)
    console.log(this.employeeSalaryForm.value);    
    let data = this.employeeSalaryForm.value;
    data.emp_dept_id = this.selectedDepartment;
    data.emp_grade_id = this.selectedGrade.id;
    console.log("data", data);
    // You can perform further actions like sending the data to an API, etc.
    this.service.postEmployeeSalaryDetail(data).subscribe((res:any)=>{
      console.log("res", res)
    })
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };

  
}