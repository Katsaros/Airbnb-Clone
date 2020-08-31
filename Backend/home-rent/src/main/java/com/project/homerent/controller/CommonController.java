package com.project.homerent.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.model.dto.MessageDto;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.service.*;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.Principal;
import java.util.List;

import static com.project.homerent.util.Helpers.convertToJson;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/secure")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN') or hasRole('USER')")
public class CommonController {

    @Autowired
    private UserService userService;

    @Autowired
    private HostService hostService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private MessageService messageService;

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

    @PostMapping("/home/book")
    public ResponseEntity<String> booking(@RequestBody ReservationDto reservationDto, Principal principal) throws Exception {
        User user = userService.findByUsername(principal.getName());
        if(user.getRoles().stream().findFirst().isPresent())
            return ResponseEntity.ok().body(convertToJson(reservationService.save(reservationDto)));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Status\": \"Error booking the room\"}");
    }

    @PutMapping("/home/book")
    public ResponseEntity<String> updateBooking(@RequestBody ReservationDto reservationDto, Principal principal) throws Exception {
        User user = userService.findByUsername(principal.getName());
        if(user.getRoles().stream().findFirst().isPresent())
            return ResponseEntity.ok().body(convertToJson(reservationService.save(reservationDto)));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Status\": \"Error updating booking\"}");
    }

    @PostMapping("/message/send")
    public ResponseEntity<String> messageSend(@RequestBody MessageDto messageDto, Principal principal) throws Exception {
        User user = userService.findByUsername(principal.getName());
        if(user.getRoles().stream().findFirst().isPresent())
            return ResponseEntity.ok().body(convertToJson(messageService.save(messageDto)));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Status\": \"Error sending the message\"}");
    }

    @DeleteMapping("/message/{id}")
    public ResponseEntity<String> DeleteMessage(@PathVariable("id") Long id) {
        messageService.deleteById(id);
        return ResponseEntity.ok().body("{\"Status\": \"Successful Message Deletion\"}");
    }

    @GetMapping("/messages/receivedfrom/{id}")
    public ResponseEntity<String> messagesReceivedFromUser(@PathVariable("id") Long id,Principal principal) throws Exception {
        User user = userService.findByUsername(principal.getName());
        if(user.getRoles().stream().findFirst().isPresent())
            return ResponseEntity.ok().body(convertToJson(messageService.findMessagesBySenderId(id)));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Status\": \"Error sending the message\"}");
    }

    @GetMapping("/messages/sender/{sender}/receiver/{receiver}")
    public ResponseEntity<String> history(@PathVariable("sender") Long sender,@PathVariable("receiver") Long receiver,Principal principal) throws Exception {
        User user = userService.findByUsername(principal.getName());
        if(user.getRoles().stream().findFirst().isPresent())
            return ResponseEntity.ok().body(convertToJson(messageService.findHistory(sender, receiver)));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Status\": \"Error with user id\"}");
    }
}