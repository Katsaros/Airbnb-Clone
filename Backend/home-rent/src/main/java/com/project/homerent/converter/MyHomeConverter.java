package com.project.homerent.converter;

import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.MyHomePostDto;
import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.hostmodel.Reservation;
import com.project.homerent.service.HomeCategoryService;
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
    private HomeCategoryService homeCategoryService;
    private static HomeCategoryService homeCategoryServiceStatic;

    @Autowired
    public void setStatic() {
        this.hostServiceStatic = hostService;
        this.userServiceStatic = userService;
        this.homeCategoryServiceStatic = homeCategoryService;
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

        myHomeDto.setHomeCategory(HomeCategoryConverter.convertToDto(myHome.getHomeCategory()));

        myHomeDto.setAc(myHome.isAc());
        myHomeDto.setWifi(myHome.isWifi());
        myHomeDto.setTv(myHome.isTv());
        myHomeDto.setParking(myHome.isParking());
        myHomeDto.setKitchen(myHome.isKitchen());
        myHomeDto.setHeating(myHome.isHeating());
        myHomeDto.setElevator(myHome.isElevator());

        myHomeDto.setImage(myHome.getImage());

        List<ReservationDto> reservationDtoList = myHome.getReservations().stream().map(ReservationConverter::convertToDto).collect(Collectors.toList());
        myHomeDto.setReservations(reservationDtoList);

        return myHomeDto;
    }

    public static MyHomePostDto convertToPostDto(MyHome myHome) {
        MyHomePostDto myHomePostDto = new MyHomePostDto();
        myHomePostDto.setOwnerId(myHome.getOwner().getId());
        myHomePostDto.setOwnerUsername(myHome.getOwner().getUsername());

        myHomePostDto.setAddress(myHome.getAddress());
        myHomePostDto.setBathrooms(myHome.getBathrooms());
        myHomePostDto.setBedrooms(myHome.getBedrooms());
        myHomePostDto.setBeds(myHome.getBeds());

        myHomePostDto.setOpenBooking(myHome.getOpenBooking());
        myHomePostDto.setCloseBooking(myHome.getCloseBooking());
        myHomePostDto.setDescription(myHome.getDescription());
        myHomePostDto.setExtraPersonPrice(myHome.getExtraPersonPrice());
        myHomePostDto.setHouseRules(myHome.getHouseRules());
        myHomePostDto.setLatitude(myHome.getLatitude());
        myHomePostDto.setLongitude(myHome.getLongitude());
        myHomePostDto.setMaxPeople(myHome.getMaxPeople());
        myHomePostDto.setBeds(myHome.getBeds());
        myHomePostDto.setMinOvernights(myHome.getMinOvernights());
        myHomePostDto.setNeighborhood(myHome.getNeighborhood());
        myHomePostDto.setOvernightPrice(myHome.getOvernightPrice());
        myHomePostDto.setPrice(myHome.getPrice());
        myHomePostDto.setSquareMeters(myHome.getSquareMeters());
        myHomePostDto.setTransport(myHome.getTransport());

        myHomePostDto.setHomeCategory(HomeCategoryConverter.convertToDto(myHome.getHomeCategory()));

        myHomePostDto.setAc(myHome.isAc());
        myHomePostDto.setWifi(myHome.isWifi());
        myHomePostDto.setTv(myHome.isTv());
        myHomePostDto.setParking(myHome.isParking());
        myHomePostDto.setKitchen(myHome.isKitchen());
        myHomePostDto.setHeating(myHome.isHeating());
        myHomePostDto.setElevator(myHome.isElevator());

        myHomePostDto.setImage(myHome.getImage());

        List<ReservationDto> reservationDtoList = myHome.getReservations().stream().map(ReservationConverter::convertToDto).collect(Collectors.toList());
        myHomePostDto.setReservations(reservationDtoList);

        return myHomePostDto;
    }

    public static MyHome convert(MyHomeDto myHomeDto) {
        MyHome myHome = new MyHome();
        myHome.setId(myHomeDto.getId());

        myHome.setOwner(userServiceStatic.findById(myHomeDto.getOwnerId()));

        myHome.setHomeCategory(homeCategoryServiceStatic.findHomeCategoryByHomeCategoryTitle(myHomeDto.getHomeCategory().getHomeCategoryTitle()));

        myHome.setAddress(myHomeDto.getAddress());
        myHome.setBathrooms(myHomeDto.getBathrooms());
        myHome.setBedrooms(myHomeDto.getBedrooms());
        myHome.setBeds(myHomeDto.getBeds());
//        Date date1=new SimpleDateFormat("yyyy-MM-dd").parse(myHomeDto.getOpenBooking());
//        myHome.setOpenBooking(date1);
//        Date date2=new SimpleDateFormat("yyyy-MM-dd").parse(myHomeDto.getCloseBooking());
//        myHome.setCloseBooking(date2);
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
        myHome.setAc(myHomeDto.isAc());
        myHome.setWifi(myHomeDto.isWifi());
        myHome.setTv(myHomeDto.isTv());
        myHome.setParking(myHomeDto.isParking());
        myHome.setKitchen(myHomeDto.isKitchen());
        myHome.setHeating(myHomeDto.isHeating());
        myHome.setElevator(myHomeDto.isElevator());

        myHome.setImage(myHomeDto.getImage());

        if(myHomeDto.getReservations() == null)
            myHome.setReservations(new ArrayList<Reservation>());
        else {
            List<Reservation> reservationList = myHomeDto.getReservations().stream().map(ReservationConverter::convert).collect(Collectors.toList());
            myHome.setReservations(reservationList);
        }

        return myHome;
    }

    public static MyHome convertPostDtoToHome(MyHomePostDto myHomePostDto) {
        MyHome myHome = new MyHome();

        myHome.setOwner(userServiceStatic.findById(myHomePostDto.getOwnerId()));

        myHome.setHomeCategory(homeCategoryServiceStatic.findHomeCategoryByHomeCategoryTitle(myHomePostDto.getHomeCategory().getHomeCategoryTitle()));

        myHome.setAddress(myHomePostDto.getAddress());
        myHome.setBathrooms(myHomePostDto.getBathrooms());
        myHome.setBedrooms(myHomePostDto.getBedrooms());
        myHome.setBeds(myHomePostDto.getBeds());
//        Date date1=new SimpleDateFormat("yyyy-MM-dd").parse(myHomeDto.getOpenBooking());
//        myHome.setOpenBooking(date1);
//        Date date2=new SimpleDateFormat("yyyy-MM-dd").parse(myHomeDto.getCloseBooking());
//        myHome.setCloseBooking(date2);
        myHome.setOpenBooking(myHomePostDto.getOpenBooking());
        myHome.setCloseBooking(myHomePostDto.getCloseBooking());
        myHome.setDescription(myHomePostDto.getDescription());
        myHome.setExtraPersonPrice(myHomePostDto.getExtraPersonPrice());
        myHome.setHouseRules(myHomePostDto.getHouseRules());
        myHome.setLatitude(myHomePostDto.getLatitude());
        myHome.setLongitude(myHomePostDto.getLongitude());
        myHome.setMaxPeople(myHomePostDto.getMaxPeople());
        myHome.setBeds(myHomePostDto.getBeds());
        myHome.setMinOvernights(myHomePostDto.getMinOvernights());
        myHome.setNeighborhood(myHomePostDto.getNeighborhood());
        myHome.setOvernightPrice(myHomePostDto.getOvernightPrice());
        myHome.setPrice(myHomePostDto.getPrice());
        myHome.setSquareMeters(myHomePostDto.getSquareMeters());
        myHome.setTransport(myHomePostDto.getTransport());
        myHome.setAc(myHomePostDto.isAc());
        myHome.setWifi(myHomePostDto.isWifi());
        myHome.setTv(myHomePostDto.isTv());
        myHome.setParking(myHomePostDto.isParking());
        myHome.setKitchen(myHomePostDto.isKitchen());
        myHome.setHeating(myHomePostDto.isHeating());
        myHome.setElevator(myHomePostDto.isElevator());

        myHome.setImage(myHomePostDto.getImage());

        if(myHomePostDto.getReservations() == null)
            myHome.setReservations(new ArrayList<Reservation>());
        else {
            List<Reservation> reservationList = myHomePostDto.getReservations().stream().map(ReservationConverter::convert).collect(Collectors.toList());
            myHome.setReservations(reservationList);
        }

        return myHome;
    }

}