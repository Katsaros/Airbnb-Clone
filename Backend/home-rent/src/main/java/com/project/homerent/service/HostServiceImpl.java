package com.project.homerent.service;

import com.project.homerent.converter.UserConverter;
import com.project.homerent.converter.UserPostConverter;
import com.project.homerent.model.dto.HomeDto;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HostServiceImpl implements HostService {

    @Override
    public MyHome findHomeByHostId(Long id) {
        return null;
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
