import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material';
import { LocalstorageService } from '../../services/localstorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private selectedCity: string;
  public usersSelectedCities: string[];
  private userId: string;

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalstorageService,
    private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.userId = this.getUserIdFromParam();
    this.getSelectedCities();
    if (this.usersSelectedCities.length === 0) {
      this.openDialog();
    }
  }

  private getSelectedCities(): void {
    if (this.localStorageService.getSelectedCities(this.userId)) {
      this.usersSelectedCities = this.localStorageService.getSelectedCities(this.userId);
    } else {
      this.usersSelectedCities = [];
    }
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250',
      height: '500',
      hasBackdrop: true,
      data: {city: this.selectedCity}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedCity = result;
        this.usersSelectedCities.push(result);
        this.addSelectedCityToUser();
      }
    });
  }

  private addSelectedCityToUser(): void {
    this.localStorageService.setSelectedCitiesToLocalStorage(this.selectedCity, this.userId);
  }

  public closeTab(city: string): void {
    this.localStorageService.deleteCityFromSelectedCitiesList(this.userId, city);
    this.usersSelectedCities.forEach((selectedCity, index) => {
      if (selectedCity === city) {
        this.usersSelectedCities.splice(index, 1);
      }
    });
  }

  private getUserIdFromParam(): string {
    return this.route.snapshot.params['id'];
  }

  public selectedTabChangeEventHandler(event): void {
    if (event.tab.textLabel === '+') {
      this.openDialog();
    }
  }
}
