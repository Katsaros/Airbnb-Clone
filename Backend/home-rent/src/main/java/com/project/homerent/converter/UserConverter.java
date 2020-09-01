package com.project.homerent.converter;

import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.dto.UserPostDto;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class UserConverter {

    @Autowired
    private UserService userService;
    private static UserService userServiceStatic;

    @Autowired
    PasswordEncoder encoder;
    private static PasswordEncoder encoderStatic;

    @Autowired
    public void setStatic() {
        this.userServiceStatic = userService;
        this.encoderStatic = encoder;
    }

    public static UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstname(user.getFirstName());
        userDto.setLastname(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setApproved(user.getApproved());
        userDto.setTelephone(user.getTelephone());
        userDto.setImage(user.getImage());

        return userDto;
    }

    public static User convert(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        user.setApproved(userDto.getApproved());
        user.setImage(userDto.getImage());
        user.setTelephone(userDto.getTelephone());

        User userFromDb = userServiceStatic.findById(userDto.getId());

        user.setMyHomeList(userFromDb.getMyHomeList());
        user.setSentMessages(userFromDb.getSentMessages());
        user.setReservations(userFromDb.getReservations());
        user.setRoles(userFromDb.getRoles());
        user.setPassword(userFromDb.getPassword());

        return user;
    }

    public static User convert(UserPostDto userPostDto) {
        User user = new User();
        user.setId(userPostDto.getId());
        user.setUsername(userPostDto.getUsername());
        user.setFirstName(userPostDto.getFirstname());
        user.setLastName(userPostDto.getLastname());
        user.setEmail(userPostDto.getEmail());
        user.setApproved(userPostDto.getApproved());
        user.setImage(userPostDto.getImage());
        user.setTelephone(userPostDto.getTelephone());

        User userFromDb = userServiceStatic.findById(userPostDto.getId());

        if(userPostDto.getPassword()!=null)user.setPassword(encoderStatic.encode(userPostDto.getPassword()));
        else user.setPassword(userFromDb.getPassword());

        user.setMyHomeList(userFromDb.getMyHomeList());
        user.setSentMessages(userFromDb.getSentMessages());
        user.setReservations(userFromDb.getReservations());
        user.setRoles(userFromDb.getRoles());

        return user;
    }
}