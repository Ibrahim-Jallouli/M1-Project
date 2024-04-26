package com.ProjetM1.CERIInspireShop.dto;

import com.ProjetM1.CERIInspireShop.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ParentCategoryDto {
    private Long categoryId;
    private String name;
    private String description;
    private Set<ParentCategoryDto> childCategories;

    // Constructeur pour créer un CategoryDTO à partir d'un objet Category
    public ParentCategoryDto(Category category) {
        this.categoryId = category.getCategoryId();
        this.name = category.getName();
        this.description = category.getDescription();
        if (category.getChildCategories() != null) {
            this.childCategories = category.getChildCategories()
                    .stream()
                    .map(ParentCategoryDto::new)
                    .collect(Collectors.toSet());
        }
    }
}
