import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISales } from '../daily-sales/sales.model';
import { IProduct } from '../products/products.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private allSrv: OthersService, private router: Router, public utils: UtilsService) { }

  noOfProducts: number = 0
  noOfSales: number = 0
  noOfSalesToday: number = 0
  sales: ISales[] | undefined
  weeklyAccount: ISales[] = []
  daysAndReport: any
  salesDays: any
  salesData: any
  formattedWeeklyAccount: ISales[] | undefined
  products: Array<IProduct> = []
  default: Number = 50
  page = 1
  date: Date | undefined

  ngOnInit(): void {
    this.getProducts()

    this.getSales()

    this.getDailyAccount()

    this.getWeeklyAccount()
  }

  salesChartOptions = {
    salesSeries: [{
      data: []
    }],

    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [],
    }
  }

  salesChart: ApexChart = {
    type: 'bar',
  }

  productSeries: ApexNonAxisChartSeries = []
  productChartLabels: string[] = []
  productChart: ApexChart = {
    type: 'donut',
    toolbar: {
      show: true
    }
  }
  productChartTitle: ApexTitleSubtitle = {
    text: 'Products Quantity',
    align: 'center'
  }
  productChartDataLabels: ApexDataLabels = {
    enabled: false
  }

  getDailyAccount() {
    this.utils.isLoading = true
    this.allSrv.getDailyAccount().subscribe((res: any) => {
      this.noOfSalesToday = res.data.length
    }).add(() => this.utils.isLoading = false)
  }

  getWeeklyAccount() {
    this.utils.isLoading = true
    this.allSrv.getWeeklyAccount().subscribe((res: any) => {
      this.weeklyAccount = res.data
      this.transformSalesDate(this.weeklyAccount)
      this.daysAndReport = this.groupByDays('datesold', this.weeklyAccount)
      this.salesDays = Object.keys(this.daysAndReport).map(dr => {return dr.split(' ').slice(0, 3).join(' ')})
      this.salesChartOptions.xaxis.categories = [...this.salesDays] as never[]

      for (const prop in this.daysAndReport) {
        this.salesData = this.daysAndReport[prop].length
        this.salesChartOptions.salesSeries[0].data.push(this.salesData as never)
      }
      
    })
  }

  getSales() {
    this.utils.isLoading = true
    this.allSrv.getSales(this.page).subscribe((res: any) => {
      this.noOfSales = res.count
      this.sales = res.results.slice(0, 8)
    }).add(() => this.utils.isLoading = false)
  }

  getProducts() {
    this.utils.isLoading = true
    this.allSrv.getProducts().subscribe((res: any) => {
      this.noOfProducts = res.length
      this.products = res
      this.productChartLabels = this.products.map((p: IProduct) => p.item_name) as string[]
      this.productSeries = this.products.map((p: IProduct) => p.quantity)
    }).add(() => this.utils.isLoading = false)
  }

  transformSalesDate(report: ISales[]) {
    report.map((sale: ISales) => {
      let date: Date = new Date(sale.datesold)
      sale.datesold = String(date).split(' ').join(' ')
      return sale
    })
  }

  groupByDays(key: string, arr: any[]) {
    const group = () => arr
      .reduce((cache, sale) => {
        const property = sale[key]
        if (property in cache) {
          return { ...cache, [property]: cache[property].concat(sale) }
        }
        return { ...cache, [property]: [sale] }
      }, {}) 
    return group()
  }

  allProducts() {
    this.router.navigate(['/products'])
  }

  allSales() {
    this.router.navigate(['/dailysales/sales'])
  }
  

}
