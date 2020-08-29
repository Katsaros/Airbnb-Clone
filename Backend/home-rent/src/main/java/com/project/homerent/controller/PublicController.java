package com.project.homerent.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.UserDto;
import com.project.homerent.model.hostmodel.AllHomesList;
import com.project.homerent.service.HostService;
import com.project.homerent.service.ImageService;
import com.project.homerent.service.UserService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
    @Autowired
    private ImageService imageService;

    @GetMapping("/homes/all")
    public ResponseEntity<String> getAllHomes()  throws JsonProcessingException {
        return ResponseEntity.ok().body(convertToJson(hostService.findAll()));
    }

    @GetMapping("/homes")
    public ResponseEntity<String> getHomesByFilter(
            @RequestParam String people,
            @RequestParam String latitude,
            @RequestParam String longitude,
            @RequestParam String arrivalDate,
            @RequestParam String departureDate
    ) throws JsonProcessingException, ParseException {
        if(people.isEmpty())people="0";
        if(latitude.isEmpty())latitude="0.0";
        if(longitude.isEmpty())longitude="0.0";
        if(arrivalDate.isEmpty())arrivalDate="1997-01-01";
        if(departureDate.isEmpty())departureDate="1997-01-01";
        Date arrivalDateConverted = new SimpleDateFormat("yyyy-MM-dd").parse(arrivalDate);
        Date departureDateConverted = new SimpleDateFormat("yyyy-MM-dd").parse(departureDate);

        return ResponseEntity.ok().body(convertToJson(hostService.findAllUsingFilters(
                Integer.parseInt(people),
                Double.parseDouble(latitude),
                Double.parseDouble(longitude),
                arrivalDateConverted,
                departureDateConverted
        )));
    }

    @PostMapping("/homes/more")
    public ResponseEntity<String> getHomesByMoreFilters(
            @RequestBody @Nullable AllHomesList allHomesList,
            @RequestParam String maxPrice,
            @RequestParam Boolean wifi
    ) throws JsonProcessingException {
        if(maxPrice.isEmpty())maxPrice="0.0";

        return ResponseEntity.ok().body(
                convertToJson(hostService.findAllUsingMoreFilters(
                        allHomesList,
                        Double.parseDouble(maxPrice),
                        wifi
                )));
    }

    @GetMapping("/home/{id}/image")
    public void renderImageFromDB(@PathVariable String id, HttpServletResponse response) throws Exception {
        MyHomeDto myHomeDto = hostService.findHomeDtoById(Long.valueOf(id));

        if(myHomeDto!=null) {
            if(myHomeDto.getImage() != null) {
                byte[] byteArray = new byte[myHomeDto.getImage().length];
                int i = 0;

                for (Byte wrappedByte : myHomeDto.getImage()) {
                    byteArray[i++] = wrappedByte; //auto unboxing
                }
                response.setContentType("image/jpeg");
                InputStream is = new ByteArrayInputStream(byteArray);
                IOUtils.copy(is, response.getOutputStream());
            }
        }
//        else {
//            return ResponseEntity.ok().body("{\"Status\": \"Error\"}");
//        }
    }

    @PostMapping("user/{id}/image")
    public String handleImagePost(@PathVariable String id, @RequestParam("imagefile") MultipartFile file){

        imageService.saveImageFileToUser(Long.valueOf(id), file);

        return "redirect:/user/" + id + "/show";
    }
}
