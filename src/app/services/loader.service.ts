import {BehaviorSubject, Observable} from 'rxjs';

export default class {
  private isShownSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get isShown(): Observable<boolean> {
    return this.isShownSubject.asObservable();
  }

  public show(): void {
    this.isShownSubject.next(true);
  }

  public hide(): void {
    this.isShownSubject.next(false);
  }
}