package com.project.homerent.service;


import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.MyHome;

import java.util.List;


public interface HostService {
    MyHomeDto findHomeDtoById(Long id) throws Exception;

    MyHome findHomeById(Long id);

//    MyHomeDto findDtoById(Long id);
//    List<HomeDto> findAll();

    List<MyHomeDto> findByUserId(Long id);
    MyHomeDto save(MyHomeDto myHomeDto);
    void deleteById(Long id);
}
