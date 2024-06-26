import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/entities/category';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() stateChange = new EventEmitter<boolean>(); 
  filtersApplied: boolean = false;

  isCollapsed = false; // new property to track collapsed state
  categories: Category[] = [];
  activeCategory: string | null = null;
  activeSubcategory: string | null = null;
  activeFilter: string | null = null;
  someVariable: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService,
    private dataTransfer: DataTransferService
  ) {}

  ngOnInit() {
    this.loadCategories();
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
    if (sidebarCollapsed == 'false') {
      this.isCollapsed = true;
    }
    setTimeout(() => {
      this.toggleSidenav();
    });
  }

  loadCategories() {
    this.categoryService.getParentCategories().subscribe(parentCategories => {
      console.log('Parent Categories:', parentCategories);
      this.categories = parentCategories;
    });
  }

  toggleCategory(category: Category) {
    if (this.activeCategory === category.name) {
      this.activeCategory = null;
      this.activeSubcategory = null;
      this.activeFilter = null;
    } else {
      this.activeCategory = category.name;
    }
  }
  
  toggleSubcategory(subcategory: Category) {
    console.log("Selected subcategory", subcategory.name, ":", subcategory.categoryId);
    if (this.activeSubcategory === subcategory.name) {
      this.activeSubcategory = null;
      this.activeFilter = null;
    } else {
      this.activeSubcategory = subcategory.name;
    }
  }

  categoryId(filter: Category) {
    console.log("Selected filter", filter.name, ":", filter.categoryId);
    this.activeFilter = filter.name;
    this.dataTransfer.setSelectedCategory(filter.categoryId);
    this.filtersApplied = true;
  }
  
  formatLabel(value: number): string {
    if (value >= 10) {
      return Math.round(value) + '€';
    }
    return `${value}`;
  }

  onSliderChange(event: any) {
    const sliderValue = event.target.value;
    const valueAsNumber = Number(sliderValue);
    console.log("Converted slider value:", valueAsNumber);
    this.someVariable = valueAsNumber;
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
    this.stateChange.emit(this.isCollapsed);
    this.cdr.detectChanges();
    localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
  }

  applyFilters() {
    this.filtersApplied = true;
  }

  clearFilters() {
    this.activeCategory = null;
    this.activeSubcategory = null;
    this.activeFilter = null;
    this.dataTransfer.setSelectedCategory(0);
    this.filtersApplied = false;
  }
}
