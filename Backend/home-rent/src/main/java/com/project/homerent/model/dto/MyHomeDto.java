package com.project.homerent.model.dto;

import com.project.homerent.model.usermodel.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class MyHomeDto {
    private long id;

//    private UserDto owner;
    private long ownerId;
    private String ownerUsername;

    private List<ReservationDto> reservations;
//    private List<UserDto> owner;

    @Temporal(TemporalType.DATE)
    private Date openBooking;

    @Temporal(TemporalType.DATE)
    private Date closeBooking;

//    private List<CalendarDates> calendarDates;

    @Lob
    private Byte[] image;

    private double price;

    private String address;

    private String latitude;

    private String longitude;

//    private HomeCategory homeCategory;

//    private Collection<Picture> pictures = new HashSet<>();

    private String description;

    private Integer squareMeters;

    private double overnightPrice;

    private double extraPersonPrice;

    private Integer maxPeople;

    private Integer minOvernights;

    private Integer beds;

    private Integer bathrooms;

    private Integer bedrooms;

    private String transport;

    private String neighborhood;

    private String houseRules;

    private boolean ac;

    private boolean elevator;

    private boolean heating;

    private boolean kitchen;

    private boolean parking;

    private boolean tv;

    private boolean wifi;
}