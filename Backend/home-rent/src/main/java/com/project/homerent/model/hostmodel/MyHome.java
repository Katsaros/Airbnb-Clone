package com.project.homerent.model.hostmodel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.homerent.model.enums.Events;
import com.project.homerent.model.enums.Pets;
import com.project.homerent.model.enums.Smoking;
import com.project.homerent.model.usermodel.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="myhome")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MyHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myhome_id", nullable = false)
    private long id;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name ="owner_id", nullable = false)
    private User owner;

    @Lob
    private Byte[] image;

    @Column(name = "rule_smoking")
    @Enumerated(EnumType.STRING)
    private Smoking smoking;

    @Column(name = "rule_pets")
    @Enumerated(EnumType.STRING)
    private Pets pets;

    @Column(name = "rule_events")
    @Enumerated(EnumType.STRING)
    private Events events;

    @Column(name = "open_booking", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date openBooking;

    @Column(name = "close_booking", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date closeBooking;

    @OneToMany(mappedBy = "bookedHome", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Reservation> reservations;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "myhome_address", nullable = false)
    private String address;

    @Column(name = "myhome_address_latitude", nullable = false)
    private String latitude;

    @Column(name = "myhome_address_longitude", nullable = false)
    private String longitude;

    @ManyToOne
    @JoinColumn(name ="homecategory_id")
    private HomeCategory homeCategory;

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

    @Length(max = 200)
    private String houseRules;

    // Amenities
    private boolean ac;

    private boolean elevator;

    private boolean heating;

    private boolean kitchen;

    private boolean parking;

    private boolean tv;

    private boolean wifi;
}