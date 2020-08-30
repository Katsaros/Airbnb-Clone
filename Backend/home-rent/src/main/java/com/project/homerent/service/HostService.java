package com.project.homerent.service;


import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.MyHomePostDto;
import com.project.homerent.model.hostmodel.AllHomesList;
import com.project.homerent.model.hostmodel.MyHome;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;


public interface HostService {
    MyHomeDto findHomeDtoById(Long id) throws Exception;

    MyHome findHomeById(Long id);

    List<MyHomeDto> findAll();

    MyHome findByAddress(String address);

    AllHomesList findAllUsingFilters(int people,
                                     double latitude,
                                     double longitude,
                                     Date bookDate,
                                     Date leaveDate);

    AllHomesList findAllUsingMoreFilters(AllHomesList allHomesList,
                                         String maxPrice,
                                         Boolean wifi,
                                         Boolean elevator,
                                         Boolean heating,
                                         Boolean kitchen,
                                         Boolean parking,
                                         Boolean tv,
                                         Boolean ac,
                                         String type
    );

    List<MyHomeDto> findByUserId(Long id);
    MyHomeDto save(MyHomeDto myHomeDto);
    MyHomePostDto save(MyHomePostDto MyHomePostDto);
    void deleteById(Long id);


}
