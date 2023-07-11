// import { Component } from '@angular/core';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.css']
})
export class EmployeedetailComponent {

  displayedColumns: string[] = ['id', "emp_id", "emp_name", "emp_title", "emp_upload_pan", "emp_address",  "emp_city", "emp_pincode", "emp_state",
  "emp_dob",  "emp_doj", "emp_mail_id", "emp_mobile_no",  "emp_pan_no",  "actions"];
  dataSource:MatTableDataSource<any> = new MatTableDataSource();

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  formTitle = "Add Employee Detail";
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  paginator!: MatPaginator;
  obj: any ={};
  editpanimage: any = "";
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
     this.paginator = paginator;
     this.dataSource.paginator = this.paginator;
   }

  employeeForm!: FormGroup;
  display: any = false;
  data: any;
   @ViewChild('myModal') myModal!: ElementRef

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private toastr: ToastrService) {   
  }

  ngOnInit(){
    this.employeeForm = this.formBuilder.group({
      emp_title: ['', Validators.required],
      emp_id: ['', Validators.required],
      emp_dob: ['', Validators.required],
      emp_address: ['', Validators.required],
      emp_state: ['', Validators.required],
      emp_mobile_no: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      emp_pan_no: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      emp_name: ['', Validators.required],
      emp_doj: ['', Validators.required],
      emp_city: ['', Validators.required],
      emp_pincode: ['', Validators.required],
      emp_mail_id: ['', [Validators.required, Validators.email]],
      emp_upload_pan:["", [Validators.required]]
    });

    this.service.getEmployeeDetail().subscribe((res:any)=>{
      console.log("res", res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.display = true;      
      
    }, error=>{
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

  editEmployee(employee:any) {
    // Perform the edit action here
    console.log('Editing employee:', employee);
    this.formTitle = "Edit Employee Detail";

    let item = this.dataSource.data.find((item: any) => item.id === employee);
    console.log("data", item);

    this.obj = item;

    this.employeeForm = this.formBuilder.group({
      emp_title: [item.emp_title, Validators.required],
      emp_id: [item.emp_id, Validators.required],
      emp_dob: [item.emp_dob, Validators.required],
      emp_address: [item.emp_address, Validators.required],
      emp_state: [item.emp_state, Validators.required],
      emp_mobile_no: [item.emp_mobile_no, [Validators.required, Validators.pattern('^\\d{10}$')]],
      emp_pan_no: [item.emp_pan_no, [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      emp_name: [item.emp_name, Validators.required],
      emp_doj: [item.emp_doj, Validators.required],
      emp_city: [item.emp_city, Validators.required],
      emp_pincode: [item.emp_pincode, Validators.required],
      emp_mail_id: [item.emp_mail_id, [Validators.required, Validators.email]],
      // emp_upload_pan:[item.emp_upload_pan, [Validators.required]]
    });
    // this.selectedFile = item.emp_upload_pan;
    this.editpanimage = item.emp_upload_pan;    
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
        this.service.deleteEmployeeDetail(employee).subscribe((res: any) => {
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

  selectedFile!: File;

onFileSelected(event: any) {
  this.editpanimage = "";
  this.selectedFile = event.target.files[0];
  console.log("this.selectedFile", this.selectedFile);
}
  onSubmit() {
    // if (this.employeeForm.invalid) {
    //   return;
    // }

    // Process the form data
    console.log(this.employeeForm.value);

    if(this.formTitle==='Edit Employee Detail'){
      console.log("this.employeeForm.value", this.employeeForm.value);
      const formData = new FormData();
      if(!this.editpanimage){
        formData.append('emp_upload_pan', this.selectedFile, this.selectedFile.name);
      }else{
        formData.append('previousimage', this.editpanimage);
      }    
      formData.append('id', this.obj.id);
      formData.append('emp_id', this.employeeForm.controls['emp_id'].value);
      formData.append('emp_title', this.employeeForm.controls["emp_title"].value);
      formData.append('emp_dob', this.employeeForm.controls["emp_dob"].value);
      formData.append('emp_address', this.employeeForm.controls["emp_address"].value);
      formData.append('emp_state', this.employeeForm.controls["emp_state"].value);
      formData.append('emp_mobile_no', this.employeeForm.controls["emp_mobile_no"].value);
      formData.append('emp_name', this.employeeForm.controls["emp_name"].value);
      formData.append('emp_doj', this.employeeForm.controls["emp_doj"].value);
      formData.append('emp_city', this.employeeForm.controls["emp_city"].value);
      formData.append('emp_pan_no', this.employeeForm.controls["emp_pan_no"].value);
      formData.append('emp_pincode', this.employeeForm.controls["emp_pincode"].value);
      formData.append('emp_mail_id', this.employeeForm.controls["emp_mail_id"].value);    
  
      this.service.updatEmployeeDetail(formData).subscribe(
        (res:any) => {
          console.log('Image uploaded successfully', res);
          // this.display = "http://localhost/employeepayroll/" + res?.emp_upload_pan;
          // this.dataSource.data.unshift(res)
          this.toastr.success("Employee Detail Updated", "title")
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
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.myModal.nativeElement.click();
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    }else{
      // You can perform further actions like sending the data to an API, etc.
    const formData = new FormData();    
    formData.append('emp_upload_pan', this.selectedFile, this.selectedFile.name);
    formData.append('emp_id', this.employeeForm.controls['emp_id'].value);
    formData.append('emp_title', this.employeeForm.controls["emp_title"].value);
    formData.append('emp_dob', this.employeeForm.controls["emp_dob"].value);
    formData.append('emp_address', this.employeeForm.controls["emp_address"].value);
    formData.append('emp_state', this.employeeForm.controls["emp_state"].value);
    formData.append('emp_mobile_no', this.employeeForm.controls["emp_mobile_no"].value);
    formData.append('emp_name', this.employeeForm.controls["emp_name"].value);
    formData.append('emp_doj', this.employeeForm.controls["emp_doj"].value);
    formData.append('emp_city', this.employeeForm.controls["emp_city"].value);
    formData.append('emp_pan_no', this.employeeForm.controls["emp_pan_no"].value);
    formData.append('emp_pincode', this.employeeForm.controls["emp_pincode"].value);
    formData.append('emp_mail_id', this.employeeForm.controls["emp_mail_id"].value);    

    this.service.postEmployeeDetails(formData).subscribe(
      (res:any) => {
        console.log('Image uploaded successfully', res);
        // this.display = "http://localhost/employeepayroll/" + res?.emp_upload_pan;
        this.dataSource.data.unshift(res)
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.myModal.nativeElement.click();
      },
      error => {
        console.error('Error uploading image:', error);
      }
    );
    }
    
  }
}

