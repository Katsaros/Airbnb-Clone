package com.project.homerent.service;


import com.project.homerent.model.dto.HomeCategoryDto;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.model.hostmodel.MyHome;

import java.util.Date;
import java.util.List;


public interface HomeCategoryService {
    HomeCategoryDto findHomeCategoryDtoById(Long id);
    HomeCategoryDto findHomeCategoryDtoByHomeCategoryTitle(String title);
    HomeCategory findHomeCategoryByHomeCategoryTitle(String title);
    HomeCategory findHomeCategoryById(Long id);
    List<HomeCategoryDto> findAll();
}
