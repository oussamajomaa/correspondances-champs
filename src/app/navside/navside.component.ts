import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OptionChartService } from '../services/option-chart.service';
import { EChartsOption } from 'echarts';
import { Options } from '@angular-slider/ngx-slider';

import * as jquery from 'jquery';

@Component({
	selector: 'app-navside',
	templateUrl: './navside.component.html',
	styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements AfterViewInit {
	@ViewChild('sidenav') sidenav: ElementRef;
	@ViewChild('content') content: ElementRef;
	@ViewChild('menu') menu: ElementRef;
	@ViewChild('close') close: ElementRef;
	@ViewChild('inputChamp') inputChamp: ElementRef;

	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
		this.screenHeight = window.innerHeight;

		if (this.screenWidth <= 800) {
			this.sidenav.nativeElement.style.left = "-250px"
			this.content.nativeElement.style.marginLeft = "0"
			this.menu.nativeElement.style.display = "block"
		}
		else {
			this.sidenav.nativeElement.style.left = "0"
			this.content.nativeElement.style.marginLeft = "250px"
			this.menu.nativeElement.style.display = "none"
		}

		this.onCloseMenu()
	}


	sliderValue: number = 40;
	highValue: number = 60;
	sliderOptions: Options = {
		floor: 0,
		ceil: 100
	};

	contributors: any = []
	books: any = []
	classification: any = []
	options: any
	optionPie: EChartsOption = {};
	optionBar: EChartsOption = {};
	optionPolarBar: EChartsOption = {};
	optionLine: EChartsOption = {};
	optionRadar: EChartsOption = {};
	optionPolarRadialBar: EChartsOption = {};
	optionScatter: EChartsOption = {};
	optionFunnel: EChartsOption = {};
	optionTimeLine: EChartsOption = {};
	optionSunburst: EChartsOption = {};
	optionArea: EChartsOption = {};

	bc: any = []
	key: any
	title: string
	titleFilter: string
	text: string
	data: any = []
	data1: any = []
	data2: any = []
	newData1: any = []
	newData2: any = []
	response: any = []
	dataObject: any = []
	newDataObject: any = []
	params: string
	dates = []
	typeChart: string

	selectedItem: any = []
	sliderValues: any = []

	screenWidth: any;
	screenHeight: any;

	corres: any = []
	champ: string
	champs = []
	metadata = []
	onMetadata = false

	constructor(private dataService: DataService, private optionChart: OptionChartService) {
		// this.onResize()
	}

	ngAfterViewInit(): void {
		// Get data from json file and put it in a list 'corres'
		this.dataService.fetchData().subscribe((res: any) => {
			this.corres = res.map(item => {
				// If date format is more than year
				if (item.Date.length > 4) {
					item.Date = item.Date.substr(0, 4)
				}
				return item
			})

			// regroup list by date
			let dates = this.dataService.groupArrayOfObjects(this.corres,"Date")
			// convert object to list
			let arr = Object.entries(dates)
			
			// Iterate the list and get list of dates
			arr.map(item => {
				this.dates.push({name:item[0]});
			})
		})



		// select2
		jquery('.js-example-basic-single').select2({
			width: '100%',
			placeholder: this.title
		});
		this.screenWidth = window.innerWidth;
		this.screenHeight = window.innerHeight;
		if (this.screenWidth <= 800) {
			this.sidenav.nativeElement.style.left = "-250px"
			this.content.nativeElement.style.marginLeft = "0"
			this.close.nativeElement.style.display = "none"
		}
		else {
			this.sidenav.nativeElement.style.left = "0"
			this.content.nativeElement.style.marginLeft = "250px"
			this.close.nativeElement.style.display = "none"
		}
	}

	// uploadData(event){
	// 	let jsonObj :any
	// 	let file = event.target.files[0]
	// 	let fileReader = new FileReader();
	// 	fileReader.readAsText(file, "UTF-8");
	// 	fileReader.onload = () => {
	// 		jsonObj=(JSON.parse(fileReader.result.toString()));
	// 		console.log(jsonObj)
	// 		// this.corres = jsonObj
	// 		this.corres = jsonObj.map(item => {
	// 			// If date format is more than year
	// 			if (item.Date.length > 4) {
	// 				item.Date = item.Date.substr(0, 4)
	// 			}
	// 			return item
	// 		})

	// 		// regroup list by date
	// 		let dates = this.dataService.groupArrayOfObjects(this.corres,"Date")
	// 		// convert object to list
	// 		let arr = Object.entries(dates)
			
	// 		// Iterate the list and get list of dates
	// 		arr.map(item => {
	// 			this.dates.push({name:item[0]});
	// 		})
	// 		console.log(this.dates);	
	// 	}	
	// }

	addChamps() {
		if (this.champ) this.champs.push(this.champ)
		this.inputChamp.nativeElement.value = ''
		this.inputChamp.nativeElement.focus()

	}

	removeChamp(champ: string) {
		this.champs = this.champs.filter(item => {
			return item != champ
		})
	}

	confirmMetadata() {
		this.metadata = this.champs
		this.champs = []
		this.onMetadata = true
	}

	onClickMenu() {
		this.sidenav.nativeElement.style.left = "0"
		this.content.nativeElement.style.marginLeft = "250px"
		this.close.nativeElement.style.display = "block"
	}

	onCloseMenu() {
		if (this.screenWidth <= 800) {
			this.sidenav.nativeElement.style.left = "-250px"
			this.content.nativeElement.style.marginLeft = "0"
			this.close.nativeElement.style.display = "none"
		}
	}

	executeFilter() {
		this.selectedItem = jquery('.js-example-basic-single').val()

		this.newDataObject = []
		this.selectedItem.map(name => {
			let object = this.dataObject.filter(item => {
				if (item.name === name)
					return item
			})
			this.newDataObject.push(object[0])
		})

		this.data1 = []
		this.data2 = []
		this.newDataObject.forEach(item => {
			this.data1.push(item.name)
			this.data2.push(item.value)
		})

		this.displayCharts(this.data1, this.data2, this.newDataObject)
	}


	onButtonClick(params) {
		this.dataObject = []
		this.data1 = []
		this.data2 = []
		this.sliderValue = this.dates[0].name;
		this.highValue = this.dates[this.dates.length - 1].name;
		this.sliderOptions = {
			floor: this.dates[0].name,
			ceil: this.dates[this.dates.length - 1].name
		};
		this.sliderValues = [this.dates[0].name, this.dates[this.dates.length - 1].name]
		this.params = params

		this.getDataParams(this.params, this.data, this.data1, this.data2, this.dataObject, this.corres)
		this.dataService.sortList(this.data1)

		if (this.params === '') {
			this.newDataObject = []
			this.dataObject = []
			this.data1 = []
			this.data2 = []
			this.title = ''
			this.typeChart = ""
		}

		this.displayCharts(this.data1, this.data2, this.dataObject)
		// if (this.typeChart) this.onCloseMenu()
	}


	// filtrer selon une période
	onChangeDate() {
		this.newDataObject = []
		this.dataObject = []
		this.data1 = []
		this.data2 = []
		this.title = ''

		let newCcorres = []
		
		this.corres.filter(item => {
			if ((item.Date) >= this.sliderValues[0] &&
				(item.Date) < this.sliderValues[1])
				newCcorres.push(item)
		})

		this.getDataParams(this.params, this.data, this.data1, this.data2, this.dataObject, newCcorres)
		this.dataService.sortList(this.data1)

		this.displayCharts(this.data1, this.data2, this.dataObject)

	}

	getDataParams(params: string, data: any, data1: any[], data2: any[], dataObject: any[], tableCorres: any[]) {
		data = this.dataService.groupArrayOfObjects(tableCorres,params)

		// this.title = 'Chart of books according to the contributor role'
		this.titleFilter = `Select a ${params}`
		this.text = `Correspondance ${params}`

		

		// convert object to list
		let arr = Object.entries(data)
			
		// Iterate the list and get list of dates
		arr.map((item:any) => {
			// this.dates.push({name:item[0]});
			dataObject.push({ value: item[1].length, name: item[0].substr(0, 30) })
		})

		dataObject.sort((a, b) => {
			if (a.name > b.name) return 1
			if (a.name < b.name) return -1
			return 0
		})

		dataObject.forEach(item => {
			data1.push(item.name)
			data2.push(item.value)
		})
	}

	displayCharts(data1, data2, dataObject) {
		this.optionPie = this.optionChart.optionPie(dataObject, 'correspondance (s)', this.text)
		this.optionPolarRadialBar = this.optionChart.optionPolarRadial(dataObject, 'correspondance (s)', this.text)
		this.optionBar = this.optionChart.optionBar(data1, data2, 'correspondance (s)', this.text)
		this.optionLine = this.optionChart.optionLine(data1, data2, 'correspondance (s)', this.text)
		this.optionArea = this.optionChart.optionArea(data1, data2, 'correspondance (s)', this.text)
		this.optionFunnel = this.optionChart.optionFunnel(dataObject, 'correspondance (s)', this.text)
	}

	selectType(event) {
		this.typeChart = event
		this.onCloseMenu()

	}


}
