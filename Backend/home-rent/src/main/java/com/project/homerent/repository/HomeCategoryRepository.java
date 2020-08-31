package com.project.homerent.repository;

import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.model.hostmodel.MyHome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {
    List<HomeCategory> findAll();
    Optional<HomeCategory> findById(Long id);
    Optional<HomeCategory> findByHomeCategoryTitle(String title);
}