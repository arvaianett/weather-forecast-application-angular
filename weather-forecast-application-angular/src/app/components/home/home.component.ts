import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material';
import { LocalstorageService } from '../../services/localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private selectedCity: string;
  public usersSelectedCities: string[];
  private userId: string;
  public tabs: Tab[];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalstorageService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer) {
      this.tabs = [];
    }

  ngOnInit() {
    this.userId = this.getUserIdFromParam();
    this.getSelectedCities();
  }

  private getSelectedCities(): void {
    if (this.localStorageService.getSelectedCities(this.userId)) {
      this.usersSelectedCities = this.localStorageService.getSelectedCities(this.userId);
    } else {
      this.usersSelectedCities = [];
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      height: '500px',
      data: {city: this.selectedCity}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedCity = result;
      this.addSelectedCityToUser();
    });
  }

  private addSelectedCityToUser(): void {
    this.localStorageService.setSelectedCitiesToLocalStorage(this.selectedCity, this.userId);
  }

  public closeTab(city: string): void {
    this.usersSelectedCities.filter(selectedCity => selectedCity === city);
  }

  private validateTypedCity() {
    // TODO check if the name of the city is valid or not
  }

  private getUserIdFromParam(): string {
    return this.route.snapshot.params['id'];
  }

  private openNewTab() {
    // TODO open dialog from tab, not button
  }
}

interface Tab {
  label: string;
  content: SafeHtml;
}
