package com.project.homerent.service;


import com.project.homerent.model.dto.HomeDto;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.usermodel.User;

import java.util.List;


public interface HostService {
    MyHome findHomeByHostId(Long id);
//    MyHomeDto findDtoById(Long id);

//    List<HomeDto> findAll();
    List<HomeDto> findAllByHostId(Long id);
    HomeDto save(HomeDto homeDto);

    void deleteById(Long id);
}
