package com.project.homerent.model.hostmodel;

import com.project.homerent.model.usermodel.User;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="myhome")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MyHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myhome_id", nullable = false)
    private long id;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name ="owner_id", nullable = false)
    private User owner;

    @Column(name = "myhome_address", nullable = false)
    private String homeAddress;

    @ManyToOne
    @JoinColumn(name ="homecategory_id", nullable = false)
    private HomeCategory homeCategory;

//    @NotNull
//    private Type type;

//    private Collection<Picture> pictures = new HashSet<>();
//
//    private List<Amenities> amenities;
//
//    private Collection<Rule> rules = new HashSet<>();
//
//    @NotNull
//    private Location location;

    @NotNull
    @Length(max = 45)
    private String title;

    @NotNull
    @Length(max = 300)
    private String description;

    @NotNull
    private Integer squareMeters;

    @NotNull
    private double overnightPrice;

    @NotNull
    private double extraPersonPrice;

    @NotNull
    private Integer maxPeople;

    @NotNull
    private Integer minOvernights;

    @NotNull
    private Integer beds;

    @NotNull
    private Integer bathrooms;

    @NotNull
    private Integer bedrooms;

    private String transport;

    private String neighborhood;

    @Length(max = 200)
    private String houseRules;
}