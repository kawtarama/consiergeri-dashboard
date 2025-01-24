import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
  
  templateUrl: './category.component.html',
  providers:[MessageService,ConfirmationService]
})

export class CategoryComponent implements OnInit {
[x: string]: any;
  categoryDialog: boolean = false;
  deleteCategoryDialog: boolean = false;
  deleteCategoriesDialog: boolean = false;
  categories: any[] = [];
  category: any = {};
  selectedCategories: any[] = [];
  submitted: boolean = false;
  cols: any[] = []; // Define cols property



  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.categories; // Assuming the backend returns { categories: [...] }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories',
        });
      }
    );
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }

  editCategory(category: any) {
    this.category = { ...category };
    this.categoryDialog = true;
  }



  deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }



  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;
  
    if (this.category.title?.trim()) {
      console.log('Saving Category:', this.category); // Add logging
  
      if (this.category.id) {
        this.categoryService.updateCategory(this.category.id, this.category).subscribe(
          (response) => {
            console.log('Update Response:', response); // Log successful response
            this.loadCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Category Updated',
              life: 3000,
            });
            this.hideDialog();
          },
          (error) => {
            console.error('Update Error:', error); // Detailed error logging
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message || 'Failed to update category',
            });
          }
        );
      } else {
        this.categoryService.createCategory(this.category).subscribe(
          (response) => {
            console.log('Create Response:', response); // Log successful response
            this.loadCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Category Created',
              life: 3000,
            });
            this.hideDialog();
          },
          (error) => {
            console.error('Create Error:', error); // Detailed error logging
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message || 'Failed to create category',
            });
          }
        );
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Title is required',
      });
    }
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  exportCSV() {
    // Implement CSV export logic here
  }

  deleteCategory(category: any) {
    this.category = category; // Store the current category
    this.deleteCategoryDialog = true; // Show confirmation dialog
  }
  
 // Single delete confirm
 // Single delete confirm
 confirmDelete() {
  this.deleteCategoryDialog = false;
  if (this.category && this.category.id) {
    this.categoryService.deleteCategory(this.category.id).subscribe(
      () => {
        // Remove the specific category from the list
        this.categories = this.categories.filter((val) => val.id !== this.category.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Deleted',
          life: 3000,
        });
        this.category = {}; // Reset category
      },
      (error) => {
        console.error('Delete Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete category',
        });
      }
    );
  }
}

 // category.component.ts

confirmDeleteSelected() {
  this.deleteCategoriesDialog = false;
  if (this.selectedCategories && this.selectedCategories.length > 0) {
    // Extract IDs of selected categories
    const categoryIds = this.selectedCategories.map(category => category.id);
    
    this.categoryService.deleteCategory(categoryIds).subscribe(
      () => {
        // Remove deleted categories from the list
        this.categories = this.categories.filter(
          category => !this.selectedCategories.some(selected => selected.id === category.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Categories Deleted',
          life: 3000,
        });
        this.selectedCategories = []; // Clear selected categories
      },
      (error) => {
        console.error('Bulk Delete Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete categories',
        });
      }
    );
  }
}

}