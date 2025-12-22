import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NavService{
    private expandedNavSubject = new BehaviorSubject<boolean>(false);
    expandedNav$ = this.expandedNavSubject.asObservable();


open(){
    this.expandedNavSubject.next(true);
}

close(){
    this.expandedNavSubject.next(false);
}

toggle(){
    this.expandedNavSubject.next(!this.expandedNavSubject.value);
}

};