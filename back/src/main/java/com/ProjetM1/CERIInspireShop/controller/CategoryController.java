package com.ProjetM1.CERIInspireShop.controller;


import com.ProjetM1.CERIInspireShop.dto.ParentCategoryDto;
import com.ProjetM1.CERIInspireShop.model.Category;
import com.ProjetM1.CERIInspireShop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/publicApi/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/parentCategories")
    public ResponseEntity<List<ParentCategoryDto>> getParentCategories() {
        List<ParentCategoryDto> parentCategories = categoryService.getParentCategories();
        return ResponseEntity.ok(parentCategories);
    }

    @GetMapping("/subCategories/{categoryId}")
    public ResponseEntity<List<ParentCategoryDto>> getSubCategoriesOfCategory(@PathVariable Long categoryId) {
        List<ParentCategoryDto> subCategories = categoryService.getSubCategoriesByCategoryId(categoryId);
        return ResponseEntity.ok(subCategories);
    }
}
