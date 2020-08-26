package com.project.homerent.converter;

import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.hostmodel.Reservation;
import com.project.homerent.service.HostService;
import com.project.homerent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MyHomeConverter {

    @Autowired
    private HostService hostService;
    private static HostService hostServiceStatic;

    @Autowired
    private UserService userService;
    private static UserService userServiceStatic;

    @Autowired
    public void setStatic() {
        this.hostServiceStatic = hostService;
        this.userServiceStatic = userService;
    }

    public static MyHomeDto convertToDto(MyHome myHome) {
        MyHomeDto myHomeDto = new MyHomeDto();
        myHomeDto.setOwnerId(myHome.getOwner().getId());
        myHomeDto.setOwnerUsername(myHome.getOwner().getUsername());
        myHomeDto.setId(myHome.getId());
        myHomeDto.setAddress(myHome.getAddress());
        myHomeDto.setBathrooms(myHome.getBathrooms());
        myHomeDto.setBedrooms(myHome.getBedrooms());
        myHomeDto.setBeds(myHome.getBeds());
        myHomeDto.setOpenBooking(myHome.getOpenBooking());
        myHomeDto.setCloseBooking(myHome.getCloseBooking());
        myHomeDto.setDescription(myHome.getDescription());
        myHomeDto.setExtraPersonPrice(myHome.getExtraPersonPrice());
        myHomeDto.setHouseRules(myHome.getHouseRules());
        myHomeDto.setLatitude(myHome.getLatitude());
        myHomeDto.setLongitude(myHome.getLongitude());
        myHomeDto.setMaxPeople(myHome.getMaxPeople());
        myHomeDto.setBeds(myHome.getBeds());
        myHomeDto.setMinOvernights(myHome.getMinOvernights());
        myHomeDto.setNeighborhood(myHome.getNeighborhood());
        myHomeDto.setOvernightPrice(myHome.getOvernightPrice());
        myHomeDto.setPrice(myHome.getPrice());
        myHomeDto.setSquareMeters(myHome.getSquareMeters());
        myHomeDto.setTransport(myHome.getTransport());

        List<ReservationDto> reservationDtoList = myHome.getReservations().stream().map(ReservationConverter::convertToDto).collect(Collectors.toList());
        myHomeDto.setReservations(reservationDtoList);

        return myHomeDto;
    }

    public static MyHome convert(MyHomeDto myHomeDto) {
        MyHome myHome = new MyHome();
        myHome.setId(myHomeDto.getId());

        myHome.setOwner(userServiceStatic.findById(myHomeDto.getOwnerId()));

//        myHome.setHomeCategory(myHomeDto.getId());
        myHome.setAddress(myHomeDto.getAddress());
        myHome.setBathrooms(myHomeDto.getBathrooms());
        myHome.setBedrooms(myHomeDto.getBedrooms());
        myHome.setBeds(myHomeDto.getBeds());
        myHome.setOpenBooking(myHomeDto.getOpenBooking());
        myHome.setCloseBooking(myHomeDto.getCloseBooking());
        myHome.setDescription(myHomeDto.getDescription());
        myHome.setExtraPersonPrice(myHomeDto.getExtraPersonPrice());
        myHome.setHouseRules(myHomeDto.getHouseRules());
        myHome.setLatitude(myHomeDto.getLatitude());
        myHome.setLongitude(myHomeDto.getLongitude());
        myHome.setMaxPeople(myHomeDto.getMaxPeople());
        myHome.setBeds(myHomeDto.getBeds());
        myHome.setMinOvernights(myHomeDto.getMinOvernights());
        myHome.setNeighborhood(myHomeDto.getNeighborhood());
        myHome.setOvernightPrice(myHomeDto.getOvernightPrice());
        myHome.setPrice(myHomeDto.getPrice());
        myHome.setSquareMeters(myHomeDto.getSquareMeters());
        myHome.setTransport(myHomeDto.getTransport());

        if(myHomeDto.getReservations() == null)
            myHome.setReservations(new ArrayList<Reservation>());
        else {
            List<Reservation> reservationList = myHomeDto.getReservations().stream().map(ReservationConverter::convert).collect(Collectors.toList());
            myHome.setReservations(reservationList);
        }

        return myHome;
    }

}