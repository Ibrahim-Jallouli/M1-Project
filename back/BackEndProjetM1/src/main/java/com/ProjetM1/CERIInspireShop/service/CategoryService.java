package com.ProjetM1.CERIInspireShop.service;

import com.ProjetM1.CERIInspireShop.dto.ParentCategoryDto;
import com.ProjetM1.CERIInspireShop.model.Category;

import java.util.List;

public interface CategoryService {
    List<ParentCategoryDto> getParentCategories();
    List<ParentCategoryDto> getSubCategoriesByCategoryId(Long categoryId);
}
