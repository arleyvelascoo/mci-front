import {AfterContentChecked, ChangeDetectorRef, Component} from '@angular/core';
import {LoaderService} from "./services/loader/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked{
  loading: boolean = this.loaderService.isLoading.value;
  constructor(public loaderService: LoaderService, private cdref: ChangeDetectorRef) {
  }

  title = 'mci-front';

  ngAfterContentChecked(): void {
    this.loaderService.isLoading.subscribe(
      {
        next: (res)=>{
          this.loading = res;
        }
      }
    )
    this.cdref.detectChanges();
  }

}
