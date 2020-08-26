package com.project.homerent.service;


import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.MyHome;

import java.util.List;


public interface HostService {
    MyHomeDto findHomeDtoById(Long id) throws Exception;

    MyHome findHomeById(Long id);

    List<MyHomeDto> findAll();

//    MyHomeDto findDtoById(Long id);
    List<MyHomeDto> findAllUsingFilters(int people, double latitude, double longitude);

    List<MyHomeDto> findByUserId(Long id);
    MyHomeDto save(MyHomeDto myHomeDto);
    void deleteById(Long id);
}
