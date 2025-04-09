package com.ProjetM1.CERIInspireShop.repository;

import com.ProjetM1.CERIInspireShop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.parentCategory IS NULL")
    List<Category> findCategoriesWithNullParent();
    @Query("SELECT c FROM Category c WHERE c.parentCategory.categoryId = :categoryId")
    List<Category> findByParentCategoryId(Long categoryId);
}
