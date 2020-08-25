package com.project.homerent.service;

import com.project.homerent.model.dto.HomeDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.repository.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostServiceImpl implements HostService {
    @Autowired
    HostRepository hostRepository;

    @Override
    public MyHome findHomeByHostId(Long id) {
        return hostRepository.findById(id).get();
    }

    @Override
    public List<HomeDto> findAllByHostId(Long id) {
        return null;
    }

    @Override
    public HomeDto save(HomeDto homeDto) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
