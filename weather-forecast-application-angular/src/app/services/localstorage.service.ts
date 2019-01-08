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
    }
  }

  private setNewUserData(username, password): User {
    const newUser: User = {
      id: undefined,
      username: username,
      password: password,
      selectedCities: []
    };
    if (!this.userList) {
      newUser.id = 1;
    } else {
      newUser.id = this.userList.length + 1;
    }
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
    const loggedUser = this.getUserFromUsernameAndPassword(username, password);
    if (loggedUser) {
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
    return this.userList.find(user => user.username === username && user.password === password);
  }

  private getUserFromId(userId: string): User {
    return this.userList.find(user => user.id.toString() === userId);
  }
}
