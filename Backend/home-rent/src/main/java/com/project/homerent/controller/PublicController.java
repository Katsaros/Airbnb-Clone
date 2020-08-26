package com.project.homerent.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.service.HostService;
import com.project.homerent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.project.homerent.util.Helpers.convertToJson;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
//@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class PublicController {

    @Autowired
    private HostService hostService;

    @Autowired
    private UserService userService;

    @GetMapping("/homes/all")
    public ResponseEntity<String> getAllHomes()  throws JsonProcessingException {
        return ResponseEntity.ok().body(convertToJson(hostService.findAll()));
    }

    @GetMapping("/homes")
    public ResponseEntity<String> getHomesByFilter(@RequestParam String people, @RequestParam String latitude, @RequestParam String longitude, @RequestParam String bookDate, @RequestParam String leaveDate)  throws JsonProcessingException {
        if(people.isEmpty())people="0";
        if(latitude.isEmpty())latitude="0.0";
        if(longitude.isEmpty())longitude="0.0";

        return ResponseEntity.ok().body(convertToJson(hostService.findAllUsingFilters(Integer.parseInt(people), Double.parseDouble(latitude), Double.parseDouble(longitude))));
    }

}
