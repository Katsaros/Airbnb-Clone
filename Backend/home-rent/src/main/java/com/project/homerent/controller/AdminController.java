package com.project.homerent.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.service.UserService;
import com.project.homerent.util.Helpers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
        return ResponseEntity.ok().body(Helpers.convertToJson(userDto));
    }

//    @PostMapping("/users")
//    public ResponseEntity<String> createUser() throws JsonProcessingException {
//
//    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> DeleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok().body("{\"Status\": \"Successful Deletion\"}");
    }

}