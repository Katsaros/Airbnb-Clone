package com.project.homerent.converter;

import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.dto.UserPostDto;
import com.project.homerent.model.usermodel.User;
import org.springframework.stereotype.Component;

@Component
public class UserPostConverter {


    public static UserPostDto convertToDto(User user) {
        UserPostDto userPostDto = new UserPostDto();

        userPostDto.setUserId(user.getId());

        userPostDto.setUsername(user.getUsername());
        userPostDto.setPassword(user.getPassword());
        userPostDto.setFirstname(user.getFirstName());
        userPostDto.setLastname(user.getLastName());
        userPostDto.setEmail(user.getEmail());
        userPostDto.setRoles(user.getRoles());

        return userPostDto;
    }

    public static User convert(UserPostDto userPostDto) {
        User user = new User();

        user.setId(userPostDto.getUserId());

        user.setUsername(userPostDto.getUsername());
        user.setPassword(userPostDto.getPassword());
        user.setFirstName(userPostDto.getFirstname());
        user.setLastName(userPostDto.getLastname());
        user.setEmail(userPostDto.getEmail());
        user.setRoles(userPostDto.getRoles());

        return user;
    }

    public static User convert(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());

        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
//        user.setEmail(userDto.getEmail());

        return user;
    }
}