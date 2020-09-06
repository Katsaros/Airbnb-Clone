package com.project.homerent.converter;

import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.dto.UserPostDto;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserPostConverter {

    @Autowired
    private UserService userService;
    private static UserService userServiceStatic;

    @Autowired
    public void setStatic() {
        this.userServiceStatic = userService;
    }

    public static UserPostDto convertToDto(User user) {
        UserPostDto userPostDto = new UserPostDto();

        userPostDto.setId(user.getId());

        userPostDto.setUsername(user.getUsername());
        userPostDto.setPassword(user.getPassword());
        userPostDto.setFirstname(user.getFirstName());
        userPostDto.setLastname(user.getLastName());
        userPostDto.setEmail(user.getEmail());
//        userPostDto.setRoles(user.getRoles());

        return userPostDto;
    }

    public static User convert(UserPostDto userPostDto) {
        User user = new User();

        user.setId(userPostDto.getId());

        user.setUsername(userPostDto.getUsername());
        user.setPassword(userPostDto.getPassword());
        user.setFirstName(userPostDto.getFirstname());
        user.setLastName(userPostDto.getLastname());
        user.setEmail(userPostDto.getEmail());
//        user.setRoles(userPostDto.getRoles());

        return user;
    }

    public static User convert(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());

        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        user.setImage(userDto.getImage());
        user.setApproved(userDto.getApproved());
        user.setTelephone(userDto.getTelephone());

        User userFromDb = userServiceStatic.findById(userDto.getId());

        user.setMyHomeList(userFromDb.getMyHomeList());
        user.setSentMessages(userFromDb.getSentMessages());
        user.setReservations(userFromDb.getReservations());
        user.setRoles(userFromDb.getRoles());

        return user;
    }
}