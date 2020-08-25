package com.project.homerent.model.dto;

import com.project.homerent.model.usermodel.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class HomeDto {
    private long id;

    private User owner;

    @Temporal(TemporalType.DATE)
    private Date openBooking;

    @Temporal(TemporalType.DATE)
    private Date closeBooking;

//    private List<CalendarDates> calendarDates;

    private int price;

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