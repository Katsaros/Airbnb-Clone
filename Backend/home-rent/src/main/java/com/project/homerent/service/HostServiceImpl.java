package com.project.homerent.service;

import com.project.homerent.converter.MyHomeConverter;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.repository.HostRepository;
import com.project.homerent.util.Helpers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class HostServiceImpl implements HostService {
    @Autowired
    HostRepository hostRepository;

    @Override
    public MyHomeDto findHomeDtoById(Long id) throws Exception {
        MyHome myHome;
        try {
            myHome = hostRepository.findById(id).get();
        } catch (NoSuchElementException nsee) {
            throw new Exception("Report not found", nsee.getCause());
        }
        return MyHomeConverter.convertToDto(myHome);
    }

    @Override
    public MyHome findHomeById(Long id) {
        MyHome myHome;
        myHome = hostRepository.findById(id).get();
        return myHome;
    }

    @Override
    public List<MyHomeDto> findByUserId(Long id) {
        return hostRepository.findByOwnerId(id)
                .stream()
                .map(MyHomeConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MyHomeDto save(MyHomeDto myHomeDto) {
        MyHome myHome = MyHomeConverter.convert(myHomeDto);

        myHome = hostRepository.save(myHome);

        return MyHomeConverter.convertToDto(myHome);
    }

    @Override
    public void deleteById(Long id) {
    }

    public List<MyHomeDto> findAll() {
        return hostRepository.findAll()
                .stream()
                .map(MyHomeConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MyHomeDto> findAllUsingFilters(int people, double latitude, double longitude) {
        List<MyHomeDto> tempListWithAllHomes = hostRepository.findAll()
                .stream()
                .map(MyHomeConverter::convertToDto)
                .collect(Collectors.toList());

        //filter people
        List<MyHomeDto> filteredHomeListWithMaxPeople = tempListWithAllHomes.stream().filter(t->t.getMaxPeople()>people).collect(Collectors.toList());
        //filter distance by range search
        List<MyHomeDto> filteredHomeListByDistance = getHomeListByDistance(filteredHomeListWithMaxPeople, latitude, longitude);

        return filteredHomeListByDistance;
    }


    private List<MyHomeDto> getHomeListByDistance(List<MyHomeDto> homeList, double givenLat, double givenLong){
        double maxDistance = 30; //kilometers
        List<MyHomeDto> filteredHomes = homeList.stream()
                .map(home -> {
                    double distanceFromEachHome = Helpers.distance(Double.parseDouble(home.getLatitude()),Double.parseDouble(home.getLongitude()), givenLat, givenLong, "K");
                    System.out.println("distance Between visitor search and actual Home "+ distanceFromEachHome);
                    if(distanceFromEachHome < maxDistance)
                        return home;
                    else
                        return null;
                })
                .collect(Collectors.toList());

        while (filteredHomes.remove(null));

        if(filteredHomes.isEmpty() || filteredHomes==null)
            return Collections.emptyList();
        else
            return filteredHomes;
    }
}
