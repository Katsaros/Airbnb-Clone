package com.project.homerent.service;

import com.project.homerent.converter.MyHomeConverter;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.repository.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
