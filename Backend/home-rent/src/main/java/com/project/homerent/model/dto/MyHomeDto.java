package com.project.homerent.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
//import com.project.homerent.model.enums.HouseType;
import com.project.homerent.model.enums.Events;
import com.project.homerent.model.enums.Pets;
import com.project.homerent.model.enums.Smoking;
import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.model.usermodel.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;
import java.util.List;

@XmlRootElement
@Data
public class MyHomeDto {
    private long id;

    private long ownerId;
    private String ownerUsername;

    private List<ReservationDto> reservations;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date openBooking;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date closeBooking;

    @Enumerated(EnumType.STRING)
    private Smoking smoking;

    @Enumerated(EnumType.STRING)
    private Pets pets;

    @Enumerated(EnumType.STRING)
    private Events events;

    @Lob
    private Byte[] image;

    private double price;

    private String address;

    private String latitude;

    private String longitude;

    private HomeCategoryDto homeCategory;

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

    private boolean elevator;

    private boolean heating;

    private boolean kitchen;

    private boolean parking;

    private boolean tv;

    private boolean wifi;

    private boolean ac;

}