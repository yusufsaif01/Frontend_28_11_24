import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user-service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

export interface User {
  id: string;
  emp_id: string;
  name: string;
  warehouse: string;
  location: string;
  department: string;
  dob: Date;
  doj: string;
  role: string;
  email: string;
  vendor_id: string;
  token: string;
  avatar_url: string;
  state: string;
  country: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'vendor_id', 'role', 'department', 'action'];
  columnsToDisplay: any[] = [
    { Name: 'No.', Value: 'position' },
    { Name: 'Emp Name', Value: 'name' },
    { Name: 'Emp id', Value: 'vendor_id' },
    { Name: 'Warehouse', Value: 'warehouse' },
    { Name: 'Location', Value: 'location' },
    { Name: 'DOB', Value: 'dob' },
    { Name: 'Roles', Value: 'role' },
    { Name: 'Department', Value: 'department' },
    { Name: 'Action', Value: 'action' }
  ];
  dataSource: MatTableDataSource<User>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public loaderService: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy() {}

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    this.userService
      .getUserListing()
      .pipe(
        finalize(() => {
          //request completed
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          let resp: any = data.data.filter((element: any) => {
            return (element.dob = new Date(element.dob).toDateString());
          });
          this.dataSource = new MatTableDataSource(resp);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  onBulkUpdate() {
    this.router.navigate(['../import'], { relativeTo: this.activatedRoute });
  }
  onEnrollUser() {
    this.router.navigate(['../enroll'], { relativeTo: this.activatedRoute });
  }
  applyFilter(searchValue: string) {
    console.log(searchValue);
  }
  editUser(id: string) {
    console.log(id);
    this.userService
      .getUserById(id)
      .pipe(
        finalize(() => {
          //request completed
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (userData: any) => {
          console.log(userData.data);
          this.router.navigateByUrl(`/users/enroll?id=${userData.data.id}`);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deleteUser(id: string) {
    console.log('delete ID', id);
    this.userService.deleteUser(id).subscribe(
      (resp: any) => {
        console.log('Delete success', resp);
        this.toastr.success('Success', resp.message);
        this.getUserList();
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('', error.error.message);
      }
    );
  }
}
