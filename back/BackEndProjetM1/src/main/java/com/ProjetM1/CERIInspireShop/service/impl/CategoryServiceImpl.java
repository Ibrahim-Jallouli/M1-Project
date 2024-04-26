package com.ProjetM1.CERIInspireShop.service.impl;

import com.ProjetM1.CERIInspireShop.dto.ParentCategoryDto;
import com.ProjetM1.CERIInspireShop.model.Category;
import com.ProjetM1.CERIInspireShop.repository.CategoryRepository;
import com.ProjetM1.CERIInspireShop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<ParentCategoryDto> getParentCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(this::mapCategoryToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ParentCategoryDto> getSubCategoriesByCategoryId(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            // Gérer le cas où la catégorie n'existe pas
            return null;
        }
        return category.getChildCategories()
                .stream()
                .map(this::mapCategoryToDto)
                .collect(Collectors.toList());
    }
    public ParentCategoryDto mapCategoryToDto(Category category){
        return new ParentCategoryDto(category);
    }
}
