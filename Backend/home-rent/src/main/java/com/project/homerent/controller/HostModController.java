package com.project.homerent.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.service.HostService;
import com.project.homerent.service.UserService;
import com.project.homerent.util.Helpers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static com.project.homerent.util.Helpers.convertToJson;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/host")
@PreAuthorize("hasRole('MODERATOR')")
public class HostModController {

    @Autowired
    private HostService hostService;

    @Autowired
    private UserService userService;
    //todo tsekare an to approved einai 1 se ka8e API, an den einai den exei ginei approved apo admin

    @GetMapping("/homes")
    public ResponseEntity<String> getHostHomes(Principal principal) throws JsonProcessingException {
        User user = userService.findByUsername(principal.getName());

        if(user.getApproved()==0)
            return ResponseEntity.ok().body("{\"Host\": \"Isn't approved yet by administrator\"}");
        else
            return ResponseEntity.ok().body(Helpers.convertToJson(hostService.findAllByHostId(user.getId())));
    }
}