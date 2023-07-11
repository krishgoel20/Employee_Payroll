import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://localhost/employee_management';
  
  constructor(private http: HttpClient) { }
  executableBatch(){
    return this.http.get("http://localhost/login/Monitoring360/P360UrlMonitoring.bat");
  }

  postNewDepartment(data: any) {
    return this.http.post(`${this.url}/addnewdepartment.php`, data);
  }

  postNewGrade(data: any) {
    return this.http.post(`${this.url}/addnewgrade.php`, data);
  }

  postGradeDetails(data: any) {
    return this.http.post(`${this.url}/addgradedetails.php`, data);
  }

  postEmployeeDetails(data: any) {
    return this.http.post(`${this.url}/addemployeedetails.php`, data);
  }

  postSignup(data: any) {
    return this.http.post(`${this.url}/addsignup.php`, data);
  }

  postLogin(data: any) {
    return this.http.post(`${this.url}/login.php`, data);
  }

  postEmployeeSalaryDetail(data: any) {
    return this.http.post(`${this.url}/addemployeesalarydetails.php`, data);
  }

  getNewDepartmentList() {
    return this.http.get(`${this.url}/getnewdepartmentList.php`);
  }
  getNewGradeList() {
    return this.http.get(`${this.url}/getnewgradeList.php`);
  }
  getGradeDetails() {
    return this.http.get(`${this.url}/getgradedetails.php`);
  }
  getEmployeeDetail() {
    return this.http.get(`${this.url}/getemployeedetail.php`);
  }

  getEmployeeSalaryDetail() {
    return this.http.get(`${this.url}/getemployeesalarydetails.php`);
  }
  updateNewDepartment(data: any) {
    return this.http.put(`${this.url}/updatenewdepartment.php`, data);
  }

  updatEmployeeDetail(data: any) {
    return this.http.post(`${this.url}/updateemployeedetails.php`, data);
  }
  updateNewGrade(data: any) {
    return this.http.put(`${this.url}/updatenewgrade.php`, data);
  }
  updateGradeDetail(data: any) {
    return this.http.put(`${this.url}/updategradedetails.php`, data);
  }

  deleteDepartment(id:any){
    return this.http.delete(`${this.url}/deletedepartment.php?id=${id}`, { responseType: 'text' })
  }
  deleteGrade(id:any){
    return this.http.delete(`${this.url}/deletegrade.php?id=${id}`, { responseType: 'text' })
  }
  deleteGradeDetail(id:any){
    return this.http.delete(`${this.url}/deletegradedetail.php?id=${id}`, { responseType: 'text' })
  }
  deleteEmployeeDetail(id:any){
    return this.http.delete(`${this.url}/deleteemployeedetails.php?id=${id}`, { responseType: 'text' })
  }
  deleteEmployeeSalaryDetail(id:any){
    return this.http.delete(`${this.url}/deleteemployeesalarydetails.php?id=${id}`, { responseType: 'text' })
  }
}
