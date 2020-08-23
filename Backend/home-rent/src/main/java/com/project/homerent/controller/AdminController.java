package com.project.homerent.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.dto.UserPostDto;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.service.UserService;
import com.project.homerent.util.Helpers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.project.homerent.util.Helpers.convertToJson;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> findAll(){
        return ResponseEntity.ok().body(userService.findAll());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<String> findUserById(@PathVariable("id") Long id) throws JsonProcessingException {
        UserDto userDto = userService.findDtoById(id);
        return ResponseEntity.ok().body(convertToJson(userDto));
    }

    @PutMapping("/users")
    public ResponseEntity<String> updateUser(@RequestBody @Nullable UserDto userPostDto) throws JsonProcessingException {
//        if (userPostDto != null) {
//            String password;
//            if(userPostDto.getPassword().isEmpty() || userPostDto.getPassword()==null) {
//                User tempUser = userService.findById(userPostDto.getUserId());
//                if(tempUser!=null)password = tempUser.getPassword();
//                else
//                    return ResponseEntity.badRequest().body("{\"Status\": \"user not found\"}");
//            }
//            else {
//                password = userPostDto.getPassword();
//            }
//
//            String encodedPassword = passwordEncoder.encode(password);
//            userPostDto.setPassword(encodedPassword);
            return ResponseEntity.ok().body(convertToJson(userService.save(userPostDto)));
//        }
//        else
//            return ResponseEntity.badRequest().body("{\"Status\": \"user not found\"}");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> DeleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok().body("{\"Status\": \"Successful Deletion\"}");
    }

    @PostMapping("/users/{id}/approve")
    public ResponseEntity<String> ApproveUser(@PathVariable("id") Long id) {
        userService.approve(id);

        return ResponseEntity.ok().body("{\"Status\": \"User Approved\"}");
    }
}