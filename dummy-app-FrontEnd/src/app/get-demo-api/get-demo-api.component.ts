import { Component, ElementRef } from '@angular/core';
import { DemoService } from '../demo.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-get-demo-api',
  templateUrl: './get-demo-api.component.html',
  styleUrls: ['./get-demo-api.component.css']
})
export class GetDemoAPIComponent {
  constructor(private demoService: DemoService) { }

  displayedColumns: string[] = ['demo-id', 'demo-title', 'demo-description', 'demo-price', 'demo-category'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorContainer', { read: ElementRef }) paginatorContainer!: ElementRef;



  currentPage = 1;
  totalItems = 0;
  loadedPages = new Set<number>();

  totalLoadedData = 0;
  currentPageIndex = 0;
  pageIndexByPageSize = 0;
  lastButtonClickCount = 0;

  ngOnInit(): void {
    this.demoService.getTotalCount().subscribe(count => {
      this.totalItems = count;
      this.loadProducts(this.currentPage);
    });
  }

  loadProducts(page: number): void {
    if (this.loadedPages.has(page))
      return;

    this.demoService.getProducts(page).subscribe(data => {
      this.dataSource.data = [...this.dataSource.data, ...data];
      this.loadedPages.add(page);
    });
  }

  onPageChange(event: PageEvent): void {
    const currentIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const neededData = (currentIndex + 1) * pageSize;
    this.totalLoadedData = neededData;
    this.currentPageIndex = currentIndex + 1;
    this.pageIndexByPageSize = this.totalItems / pageSize;

    this.updateNextButtonState();
    this.updateLastButtonState();
    this.handleFirstAndPrevButton();
  }
  handleNextButtonClick(): void {
    const dataLoadedInChunks = Math.floor(this.dataSource.data.length / 1000);
    const pageNumber = dataLoadedInChunks;

    if (this.totalLoadedData == this.dataSource.data.length && this.currentPageIndex != this.pageIndexByPageSize) {
      this.loadProducts(pageNumber + 1)
    }
  }



  updateNextButtonState(): void {
    setTimeout(() => {
      const nextButton: HTMLButtonElement = this.paginatorContainer?.nativeElement
        ?.querySelector('.mat-mdc-paginator-navigation-next');

      if (nextButton) {
        const disable = this.dataSource.data.length >= this.totalItems && this.currentPageIndex == this.pageIndexByPageSize;
        nextButton.disabled = disable;

        nextButton.onclick = () => this.handleNextButtonClick();

      }
    });
  }
  //function to handle first and prev button
  handleFirstAndPrevButton(): void {
    setTimeout(() => {
      const firstButton: HTMLButtonElement = this.paginatorContainer?.nativeElement
        ?.querySelector('.mat-mdc-paginator-navigation-first');
      const prevButton: HTMLButtonElement = this.paginatorContainer?.nativeElement
        ?.querySelector('.mat-mdc-paginator-navigation-previous');
      if (firstButton) {
        firstButton.onclick = () => {
          this.lastButtonClickCount = 0;

        }
      }
      if (prevButton) {
        prevButton.onclick = () => {
          this.lastButtonClickCount = 0;

        }
      }
    });
  }
  updateLastButtonState(): void {
    setTimeout(() => {
      const lastButton: HTMLButtonElement = this.paginatorContainer?.nativeElement
        ?.querySelector('.mat-mdc-paginator-navigation-last');


      if (lastButton) {

        const disable = this.dataSource.data.length >= this.totalItems &&
          this.currentPageIndex >= this.pageIndexByPageSize;

        lastButton.disabled = disable;

        lastButton.onclick = () => this.handleLastButtonClick();
      }


    });
  }

  handleLastButtonClick(): void {
    this.lastButtonClickCount++;
    const dataLoadedInChunks = Math.floor(this.dataSource.data.length / 1000);
    const pageNumber = dataLoadedInChunks;


    if ((this.totalLoadedData == this.dataSource.data.length && this.currentPageIndex != this.pageIndexByPageSize) && (this.lastButtonClickCount % 2 == 0)) {

      this.loadProducts(pageNumber + 1)
    }
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.updateNextButtonState();
    this.updateLastButtonState();
    this.handleFirstAndPrevButton();
  }

}