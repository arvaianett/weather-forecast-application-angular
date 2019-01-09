import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private userList: User[];

  constructor() { }

  public addUser(username: string, password: string): void {
    this.setUserList();
    const newUser = this.setNewUserData(username, password);
    this.userList.push(newUser);
    this.setLocalStorage();
  }

  private setUserList(): void {
    if (this.getUserListFromLocalStorage() && this.getUserListFromLocalStorage().length !== 0) {
      this.userList = this.getUserListFromLocalStorage();
    } else {
      this.userList = [];
      this.setLocalStorage();
    }
  }

  private setNewUserData(username: string, password: string): User {
    const newUser: User = {
      id: undefined,
      username: username,
      password: password,
      selectedCities: []
    };
    newUser.id = this.userList.length + 1;
    return newUser;
  }

  private setLocalStorage(): void {
    localStorage.setItem('user-data', JSON.stringify(this.userList));
  }

  private getUserListFromLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem('user-data'));
  }

  public validateUser(username: string, password: string): boolean {
    this.setUserList();
    if (this.validateExistingUser(username, password) && this.validateNewUserName(username)) {
      return true;
    } else {
      return false;
    }
  }

  private validateExistingUser(username: string, password: string): boolean {
    if (this.getUserFromUsernameAndPassword(username, password)) {
      return false;
    } else {
      return true;
    }
  }

  private validateNewUserName(username: string): boolean {
    const existingUser = this.userList.find(user => user.username === username);
    if (existingUser) {
      return false;
    } else {
      return true;
    }
  }

  public setSelectedCitiesToLocalStorage(city: string, userId: string): void {
    this.setUserList();
    this.getUserFromId(userId).selectedCities.push(city);
    this.setLocalStorage();
  }

  public getSelectedCities(userId: string): string[] {
    this.setUserList();
    return this.getUserFromId(userId).selectedCities;
  }

  public getUserFromUsernameAndPassword(username: string, password: string): User {
    this.setUserList();
    return this.userList.find(user => user.username === username && user.password === password);
  }

  private getUserFromId(userId: string): User {
    return this.userList.find(user => user.id.toString() === userId);
  }

  public deleteCityFromSelectedCitiesList(userId: string, city: string): void {
    const user = this.getUserFromId(userId);
    user.selectedCities.forEach((selectedCity, index) => {
      if (selectedCity === city) {
        user.selectedCities.splice(index, 1);
      }
    });
    this.setLocalStorage();
  }
}
