package com.project.homerent.converter;

import com.project.homerent.model.dto.HomeCategoryDto;
import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.service.HomeCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class HomeCategoryConverter {

    @Autowired
    private HomeCategoryService homeCategoryService;

    public static HomeCategoryDto convertToDto(HomeCategory homeCategory) {
        HomeCategoryDto homeCategoryDto = new HomeCategoryDto();
//        homeCategoryDto.setId(homeCategory.getId());
        homeCategoryDto.setHomeCategoryTitle(homeCategory.getHomeCategoryTitle());
        return homeCategoryDto;
    }

    public HomeCategory convert(HomeCategoryDto homeCategoryDto) {
        HomeCategory homeCategory = homeCategoryService.findHomeCategoryByHomeCategoryTitle(homeCategoryDto.getHomeCategoryTitle());
        return homeCategory;
    }
}