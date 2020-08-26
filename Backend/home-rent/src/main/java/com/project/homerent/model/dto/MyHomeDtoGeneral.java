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
public class MyHomeDtoGeneral {
    private long id;

    //    private User owner;
    private long ownerId;
    private String ownerUsername;

    @Temporal(TemporalType.DATE)
    private Date openBooking;

    @Temporal(TemporalType.DATE)
    private Date closeBooking;

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

}