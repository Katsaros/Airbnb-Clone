package com.project.homerent.service;

import com.project.homerent.converter.HomeCategoryConverter;
import com.project.homerent.model.dto.HomeCategoryDto;
import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.repository.HomeCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HomeCategoryServiceImpl implements HomeCategoryService {
    @Autowired
    HomeCategoryRepository homeCategoryRepository;

    @Override
    public HomeCategoryDto findHomeCategoryDtoById(Long id) {
        HomeCategory homeCategory;
        homeCategory = homeCategoryRepository.findById(id).get();
        return HomeCategoryConverter.convertToDto(homeCategory);
    }
    @Override
    public HomeCategoryDto findHomeCategoryDtoByHomeCategoryTitle(String title) {
        HomeCategory homeCategory;
        homeCategory = homeCategoryRepository.findByHomeCategoryTitle(title).get();
        return HomeCategoryConverter.convertToDto(homeCategory);
    }

    @Override
    public HomeCategory findHomeCategoryById(Long id) {
        HomeCategory homeCategory;
        homeCategory = homeCategoryRepository.findById(id).get();
        return homeCategory;
    }

    @Override
    public HomeCategory findHomeCategoryByHomeCategoryTitle(String title) {
        HomeCategory homeCategory;
        homeCategory = homeCategoryRepository.findByHomeCategoryTitle(title).get();
        return homeCategory;
    }

    @Override
    public List<HomeCategoryDto> findAll() {
        return homeCategoryRepository.findAll()
                .stream()
                .map(HomeCategoryConverter::convertToDto)
                .collect(Collectors.toList());
    }

}
