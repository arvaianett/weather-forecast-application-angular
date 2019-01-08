import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.localStorageService.validateUser(this.username, this.password)) {
      this.localStorageService.addUser(this.username, this.password);
    }
    this.router.navigate(['home', this.getLoggedUserId()]);
  }

  private getLoggedUserId(): number {
    return this.localStorageService.getUserFromUsernameAndPassword(this.username, this.password).id;
  }
}
