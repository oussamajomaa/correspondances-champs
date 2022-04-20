import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService:DataService, private router:Router){}
	canActivate():boolean {
		if (this.authService.isAuthenticated()) return true
		else {
			this.router.navigate(['login'])
			return this.authService.isAuthenticated();
		}
	}
}
