package com.project.homerent.service;


import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.usermodel.User;

import java.util.List;


public interface UserService {
    User findByUsername(String username);
    User findById(Long id);
    UserDto findDtoById(Long id);

    List<UserDto> findAll();
    UserDto save(UserDto userPostDto);

    void approve(Long id);

    void deleteById(Long id);
}
