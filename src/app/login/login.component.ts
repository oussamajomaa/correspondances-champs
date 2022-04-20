import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	hide = true;

	email: string
	password: string

	token: string
	constructor(public dataService: DataService) { }

	ngOnInit(): void {

	}

	login() {
		const user = {
			email: this.email,
			password: this.password
		}
		this.dataService.login(user)
	}


}