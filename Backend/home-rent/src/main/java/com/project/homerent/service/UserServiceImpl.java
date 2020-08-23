package com.project.homerent.service;

import com.project.homerent.converter.UserConverter;
import com.project.homerent.converter.UserPostConverter;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.dto.UserPostDto;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    UserConverter userConverter = new UserConverter();
    UserPostConverter userPostConverter = new UserPostConverter();

    @Autowired
    UserRepository userRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public UserDto findDtoById(Long id){
        return UserConverter.convertToDto(userRepository.findById(id).get());
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(UserConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDto save(UserDto userDto) {
        User tempUser = findById(userDto.getId());
        String password = tempUser.getPassword();

        User user = userPostConverter.convert(userDto);

        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
        user.setEmail(tempUser.getEmail());
        user.setPassword(tempUser.getPassword());
        user.setRoles(tempUser.getRoles());

        user = userRepository.save(user);

        return userConverter.convertToDto(user);
    }
}
