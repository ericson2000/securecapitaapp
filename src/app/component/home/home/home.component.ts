import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeState$: Observable<State<CustomHttpResponse<Page<Customer> & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  private fileStatusSubject = new BehaviorSubject<{ status: string, type: string, percent: number }>(undefined);
  fileStatus$ = this.fileStatusSubject.asObservable();
  readonly DataState = DataState;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.homeState$ = this.customerService.customers$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }

  goToPage(pageNumber?: number): void {
    this.homeState$ = this.customerService.customers$(pageNumber)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          this.currentPageSubject.next(pageNumber);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          return of({ dataState: DataState.LOADED, error, appData: this.dataSubject.value })
        })
      )
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  selectCustomer(customer: Customer): void {
    this.router.navigate([`/customers/${customer.id}`]);
  }

  report(): void {
    this.homeState$ = this.customerService.dowloadReport$()
      .pipe(
        map(response => {
          console.log(response);
          this.reportProgress(response);

          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          return of({ dataState: DataState.LOADED, error, appData: this.dataSubject.value })
        })
      )
  }
  private reportProgress(httpEvent: HttpEvent<String[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.DownloadProgress || HttpEventType.UploadProgress:
        this.fileStatusSubject.next({ status: 'progress', type: 'Dowloading ...', percent: Math.round(100 * httpEvent.loaded / httpEvent.total) });
        break;
      case HttpEventType.ResponseHeader:
        console.log('Got Response Headers', httpEvent);
        break;
      case HttpEventType.Response:
        saveAs(new File([<Blob>httpEvent.body], httpEvent.headers.get('File-Name'),
          { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }
        ))
        this.fileStatusSubject.next(undefined);
        break;
      default:
        console.log(httpEvent);
        break;
    }

  }

}
