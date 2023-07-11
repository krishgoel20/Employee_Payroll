// import { Component } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addgrade',
  templateUrl: './addgrade.component.html',
  styleUrls: ['./addgrade.component.css']
})
export class AddgradeComponent {
  displayedColumns: string[] = ['id', 'grade Name', "Grade Short Name", "Basic", "Dearness Allowance", "Travel Allowance", "HRA", "Medial Allowance", "Bonus", "Provident Fund", "Professional Tax", "actions"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  paginator!: MatPaginator;
  display: boolean = false;
  gradeNameList: any;
  gradeNameAlreadyThere: boolean = false;
  submitButton: boolean = false;
  gradeNameIsNotSelected: boolean = false;
  obj: any = {};
  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  formTitle = "Add Grade Detail";
  gradeDetailForm!: FormGroup;
  data: any;
  selectedGradeName: any = "";
  @ViewChild('myModal') myModal!: ElementRef
  constructor(private formBuilder: FormBuilder, private service: ServiceService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.gradeDetailForm = this.formBuilder.group({
      // grade_name: ['', Validators.required],
      grade_basic: ['', Validators.required],
      grade_ta: ['', Validators.required],
      grade_ma: ['', Validators.required],
      grade_pf: ['', [Validators.required]],
      grade_short_name: ['', [Validators.required]],
      grade_da: ['', Validators.required],
      grade_hra: ['', Validators.required],
      grade_bonus: ['', Validators.required],
      grade_pt: ['', Validators.required],
      //email: ['', [Validators.required, Validators.email]]
    });

    this.service.getGradeDetails().subscribe((res: any) => {
      console.log("res", res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.display = true;

    }, error => {
      console.log("error")
    })

    this.service.getNewGradeList().subscribe((res: any) => {
      console.log("res", res);
      this.gradeNameList = res;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onPageChange(event: PageEvent) {
    //const startIndex = event.pageIndex * event.pageSize;
    //const endIndex = startIndex + event.pageSize;
    //this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }

  editEmployee(employee: any) {
    // Perform the edit action here
    console.log('Editing employee:', employee);
    this.formTitle = "Edit Grade Detail";

    let item = this.dataSource.data.find((item: any) => item.id === employee);
    console.log("data", item)


    // $('#myModal').modal('show');
    // this.modealButton.nativeElement.click();
    this.selectedGradeName = item.grade_name;
    this.obj.id = Number(employee);
    this.obj.grade_name = item.grade_name
    this.obj.grade_basic = item.grade_basic
    this.obj.grade_ta = item.grade_ta
    this.obj.grade_ma = item.grade_ma
    this.obj.grade_pf = item.grade_pf
    this.obj.grade_short_name = item.grade_short_name
    this.obj.grade_da = item.grade_da
    this.obj.grade_hra = item.grade_hra
    this.obj.grade_bonus = item.grade_bonus
    this.obj.grade_pt = item.grade_pt

    console.log(" this.selectedGradeName", this.selectedGradeName)

    if (item) {
      this.gradeDetailForm = this.formBuilder.group({
        // grade_name: [this.obj.grade_name, Validators.required],
        grade_basic: [this.obj.grade_basic, Validators.required],
        grade_ta: [this.obj.grade_ta, Validators.required],
        grade_ma: [this.obj.grade_ma, Validators.required],
        grade_pf: [this.obj.grade_pf, [Validators.required]],
        grade_short_name: [this.obj.grade_short_name, [Validators.required]],
        grade_da: [this.obj.grade_da, Validators.required],
        grade_hra: [this.obj.grade_hra, Validators.required],
        grade_bonus: [this.obj.grade_bonus, Validators.required],
        grade_pt: [this.obj.grade_pt, Validators.required],
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
        this.service.deleteGradeDetail(employee).subscribe((res: any) => {
          // Find the index of the object with the matching ID
          const index = this.dataSource.data.findIndex(obj => obj.id === employee);

          // If the index is found (not -1), remove the object from the array
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
          }
          this.dataSource = new MatTableDataSource(this.dataSource.data)


        }, error => console.log(error));
        this.gradeNameAlreadyThere = false;
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  gradeNameSelected(e: any) {
    console.log("selected grade", e.target.value)
    this.selectedGradeName = e.target.value;
  }

  onSubmit() {
    // if (this.gradeDetailForm.invalid) {
    //   return;
    // }

    // Process the form data
    console.log(this.gradeDetailForm.value);
    this.gradeNameAlreadyThere = false;


    if (this.formTitle == "Add Grade Detail") {
      let checkGradeName = this.dataSource.data.findIndex((item) => item.grade_name === this.selectedGradeName)
      console.log("this.selectedGradeName", this.selectedGradeName);
      if (checkGradeName != -1 && this.selectedGradeName != "") {
        this.gradeNameAlreadyThere = true;
      }
    }



    if (this.selectedGradeName == "" || this.selectedGradeName === "Select") {
      this.gradeNameIsNotSelected = true;
    }

    if (this.selectedGradeName != "") {
      this.gradeNameIsNotSelected = false;
    }
    // You can perform further actions like sending the data to an API, etc.

    if (!this.gradeNameAlreadyThere && this.selectedGradeName != "") {
      let data = this.gradeDetailForm.value;
      this.selectedGradeName ? data.grade_name = this.selectedGradeName : this.obj.grade_name ? data.grade_name = this.obj.grade_name : "";
      this.obj.grade_name ? data.id = this.obj.id : "";
      console.log("data", data);
      for (let key in data) {
        if (!data[key]) {
          this.submitButton = true; // Return false if any key has a falsy value (e.g., empty string, null, undefined)
        } else {
          this.submitButton = false;
        }
      }

      if (this.formTitle === "Edit Grade Detail") {
        this.service.updateGradeDetail(data).subscribe((res: any) => {
          console.log("res", res);
          this.toastr.success("Grade Added", "title")
          this.myModal.nativeElement.click()
          const index = this.dataSource.data.findIndex(obj => obj.id === res.id);
          console.log("this.dataSource.data", this.dataSource.data)
          // If the object is found
          if (index !== -1) {
            // Replace the object's data with the new data
            this.dataSource.data.splice(index, 1, res);
            this.dataSource = new MatTableDataSource(this.dataSource.data)
            console.log('Object replaced:', this.dataSource.data);
          } else {
            console.log('Object not found');
          }
        }, error => console.log(error))
      } else {
        this.service.postGradeDetails(data).subscribe((res) => {
          console.log("res", res);
          this.dataSource.data.unshift(res);
          this.dataSource = new MatTableDataSource(this.dataSource.data)
          this.myModal.nativeElement.click()
        }, error => {
          console.log(error)
        })
      }


    }

  }
}


