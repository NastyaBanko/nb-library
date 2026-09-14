import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {ApiService} from "@nb/services/api.service";
import {catchError, finalize, of} from "rxjs";
import {User} from "@nb/models/api-page.model";
import {SHARED_IMPORTS} from "@nb/modules/shared/shared.imports";

@Component({
  selector: "nb-api-page",
  templateUrl: "./api-page.component.html",
  imports: [CommonModule, ...SHARED_IMPORTS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiPageComponent implements OnInit {
  @HostBinding("class") public hostClass = "nb-api-page";
  public users$: Observable<User[]> = of([]);
  public isLoading = signal<boolean>(true);
  public errorMessage = signal<string | null>(null);
  private apiService = inject(ApiService);

  public ngOnInit(): void {
    this.users$ = this.apiService.getUsers().pipe(
      catchError(() => {
        this.errorMessage.set("Failed to load data from external API.");
        return of([]);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  public _trackById = (_index: number, user: User) => user.id;
}
