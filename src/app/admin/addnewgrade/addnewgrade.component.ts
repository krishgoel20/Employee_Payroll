// import { Component } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-addnewgrade',
  templateUrl: './addnewgrade.component.html',
  styleUrls: ['./addnewgrade.component.css']
})
export class AddnewgradeComponent {
  displayedColumns: string[] = ['id', 'gradeName', "actions"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  formTitle = "Add Grade";
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  paginator!: MatPaginator;
  display: boolean = false;
  gradeAlreadyThere: boolean = false;
  obj: any={};
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  addGradeForm!: FormGroup;
  data: any;
  @ViewChild('myModal') myModal!: ElementRef
  constructor(private formBuilder: FormBuilder, private service: ServiceService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.addGradeForm = this.formBuilder.group({
      grade_name: ['', Validators.required]
    });

    this.service.getNewGradeList().subscribe((res: any) => {
      console.log("res", res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
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

  editEmployee(employee: any) {
    // Perform the edit action here
    console.log('Editing employee:', employee);
    this.formTitle = "Edit Grade";

    let item = this.dataSource.data.find((item:any)=> item.id === employee);
    console.log("data", item) 
    
    
    // $('#myModal').modal('show');
    // this.modealButton.nativeElement.click();
    this.obj.id = item.id;
    this.obj.grade_name = item.grade_name
    if(item){
      this.addGradeForm = this.formBuilder.group({
        grade_name: [this.obj.grade_name, Validators.required]
      });
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
        this.service.deleteGrade(employee).subscribe((res: any) => {
          // Find the index of the object with the matching ID
          const index = this.dataSource.data.findIndex(obj => obj.id === employee);

          // If the index is found (not -1), remove the object from the array
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
          }
          this.dataSource = new MatTableDataSource(this.dataSource.data)

        }, error => console.log(error));
        this.gradeAlreadyThere = false;
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  onSubmit() {
    if (this.addGradeForm.invalid) {
      return;
    }

    let checkGrade = this.dataSource.data.findIndex((item)=>item.grade_name === this.addGradeForm.controls['grade_name'].value)

    if(checkGrade != -1){
      this.gradeAlreadyThere = true;
    }

    if(!this.gradeAlreadyThere){
      // Process the form data
    console.log(this.addGradeForm.value);
    // You can perform further actions like sending the data to an API, etc.
    let data = this.addGradeForm.value;
    data.id = this.obj.id;

    if(this.formTitle === 'Edit Grade'){
      this.service.updateNewGrade(data).subscribe((res:any)=>{
        console.log("res", res)
    this.toastr.success("Grade Updated", "title")
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
    this.service.postNewGrade(data).subscribe((res) => {
      console.log("res", res)
      this.toastr.success("New Grade Added", "title")
      this.myModal.nativeElement.click()
      this.dataSource.data.unshift(res)
      this.dataSource = new MatTableDataSource(this.dataSource.data)      
    }, error => {
      console.log(error)
      this.toastr.warning("New Grade Not Added", "title")
    })
  }

    
    }
    
  }
}

