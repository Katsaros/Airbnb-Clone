package com.project.homerent.converter;

import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.usermodel.User;
import org.springframework.stereotype.Component;


@Component
public class UserConverter {

    public static UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstname(user.getFirstName());
        userDto.setLastname(user.getLastName());
        return userDto;
    }

    public static User convert(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());

        return user;
    }
}