import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { LayoutComponent } from "../template/layout/layout.component";


@Injectable({ providedIn: 'root' })
export class ModalService {
  open$ = new BehaviorSubject<string | null>(null);

  open(message: string) {
    this.open$.next(message);

  }

  close() {
    this.open$.next(null);
  }
}
