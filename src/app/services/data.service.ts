import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(private http: HttpClient) { }

	// Cette methode va regrouper la liste selon le nom du fichier
	groupBy(list:any, keyGetter:any) {
		const map = new Map();
		list.forEach((item:any) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}

	groupArrayOfObjects(list, key) {
		return list.reduce(function (rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	};

	// Sort list of elements
	sortList(list:[]) {
		list.sort((a: any, b: any) => {
			if (a > b) return 1
			if (a < b) return -1
			return 0
		})
	}

	fetchData(){
		return this.http.get('assets/data/Network.json')
	}




	

}
