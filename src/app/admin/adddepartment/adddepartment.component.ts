// import { Component } from '@angular/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.css'],
})
export class AdddepartmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'DepartmentName', "actions"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  paginator!: MatPaginator;
  departmentAlreadyThere: boolean = false;
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  formTitle = "Add Department"
  departmentForm!: FormGroup;
  data!: any;
  display: boolean = false;
  @ViewChild('myModal') myModal!: ElementRef
  @ViewChild('modalButton') modealButton!: ElementRef
  obj:any={dept_name: ""};

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.departmentForm = this.formBuilder.group({
      dept_name: ['', Validators.required]
    });


    this.service.getNewDepartmentList().subscribe((res: any) => {
      console.log("res", res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      console.log("res", this.dataSource);
      // this.dataSource.paginator = this.paginator; 
      this.display = true;

    }, error => {
      console.log("error")
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  onPageChange(event: PageEvent) {
    // const startIndex = event.pageIndex * event.pageSize;
    // const endIndex = startIndex + event.pageSize;
    // this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }

  changeFormTitle(){
    this.formTitle = 'Add Department';
    this.departmentForm.reset();
  }

  editEmployee(employee: any) {
    // Perform the edit action here
    console.log('Editing employee:', employee);
    this.formTitle = "Edit Department";
    let item = this.dataSource.data.find((item:any)=> item.id === employee);
    console.log("data", item) 
    
    
    // $('#myModal').modal('show');
    // this.modealButton.nativeElement.click();
    this.obj.id = Number(employee);
    this.obj.dept_name = item.dept_name
    if(item){
      this.departmentForm = this.formBuilder.group({
        dept_name: [this.obj.dept_name, Validators.required]
      });
      // this.departmentForm.get("dept_name")?.setValue(obj);
    }
    
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
        this.service.deleteDepartment(employee).subscribe((res: any) => {
          // Find the index of the object with the matching ID
          const index = this.dataSource.data.findIndex(obj => obj.id === employee);
   
          // If the index is found (not -1), remove the object from the array
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
          }
          this.dataSource = new MatTableDataSource(this.dataSource.data)
             
   
       }, error => console.log(error));
       this.departmentAlreadyThere = false;
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    
  }

  onSubmit() {
    console.log("this.departmentForm.controls['dept_name'].value", this.departmentForm.controls['dept_name'].value)
    if (this.departmentForm.invalid) {
      return;
    }
    let checkDepartment = this.dataSource.data.findIndex((item)=>item.dept_name === this.departmentForm.controls['dept_name'].value)

    if(checkDepartment != -1){
      this.departmentAlreadyThere = true;
    }
    if(!this.departmentAlreadyThere){
      // Process the form data
    console.log(this.departmentForm.value);
    // You can perform further actions like sending the data to an API, etc.
    let data = this.departmentForm.value;
    data.id = this.obj.id;  

      if(this.formTitle =="Edit Department"){
        this.service.updateNewDepartment(data).subscribe((res:any)=>{
          console.log("res", res)
      this.toastr.success("New Department Added", "title")
      this.myModal.nativeElement.click()
      const index = this.dataSource.data.findIndex(obj => obj.id === res.id);
      console.log("this.dataSource.data", this.dataSource.data)
           // If the object is found
  if (index !== -1) {
    // Replace the object's data with the new data
    this.dataSource.data.splice(index, 1, res);
    this.dataSource = new MatTableDataSource(this.dataSource.data)
    console.log('Object replaced:',  this.dataSource.data);
  } else {
    console.log('Object not found');
  }     
   }, error=>console.log(error))
      }else{
        this.service.postNewDepartment(data).subscribe((res) => {
          console.log("res", res)
          this.toastr.success("New Department Added", "title")
          this.myModal.nativeElement.click()
          this.dataSource.data.unshift(res)
          this.dataSource = new MatTableDataSource(this.dataSource.data)
        }, error => {
          console.log(error)
          this.toastr.warning("New Department Not Added", "title")
        })
      }

    }
    
  }
}

