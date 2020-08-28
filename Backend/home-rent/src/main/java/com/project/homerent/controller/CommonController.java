package com.project.homerent.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.service.HostService;
import com.project.homerent.service.ImageService;
import com.project.homerent.service.UserService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

import static com.project.homerent.util.Helpers.convertToJson;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/secure/")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN') or hasRole('USER')")
public class CommonController {

    @Autowired
    private UserService userService;

    @Autowired
    private HostService hostService;

    @Autowired
    private ImageService imageService;

    @GetMapping("/user/{id}/image")
    public void renderImageFromDB(@PathVariable String id, HttpServletResponse response) throws Exception {
        UserDto userDto = userService.findDtoById(Long.valueOf(id));

        if(userDto!=null) {
            if(userDto.getImage() != null) {
                byte[] byteArray = new byte[userDto.getImage().length];
                int i = 0;

                for (Byte wrappedByte : userDto.getImage()) {
                    byteArray[i++] = wrappedByte; //auto unboxing
                }
                response.setContentType("image/jpeg");
                InputStream is = new ByteArrayInputStream(byteArray);
                IOUtils.copy(is, response.getOutputStream());
            }
        }
    }

}