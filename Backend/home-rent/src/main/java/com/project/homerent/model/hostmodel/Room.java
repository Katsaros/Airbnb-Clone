//package com.project.homerent.model.hostmodel;
//
//import com.project.homerent.model.usermodel.User;
//import com.sun.istack.NotNull;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.validator.constraints.Length;
//
//import javax.persistence.*;
//import java.util.List;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@Entity
//@Table(name="myhome")
//public class Room {
//
//    private Integer id;
//
//    @NotNull
//    @OneToOne(mappedBy = "home",fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
//    private MyHome home;
//
//    @NotNull
//    private Type type;
//
////    private Collection<Picture> pictures = new HashSet<>();
////
//    private List<Amenities> amenities;
////
////    private Collection<Rule> rules = new HashSet<>();
////
////    @NotNull
////    private Location location;
//
//    @NotNull
//    @Length(max = 45)
//    private String title;
//
//    @NotNull
//    @Length(max = 300)
//    private String description;
//
//    @NotNull
//    private Integer square_meters;
//
//    @NotNull
//    private double overnight_price;
//
//    @NotNull
//    private double exta_person_price;
//
//    @NotNull
//    private Integer max_people;
//
//    @NotNull
//    private Integer min_overnights;
//
//    @NotNull
//    private Integer beds;
//
//    @NotNull
//    private Integer bathrooms;
//
//    @NotNull
//    private Integer bedrooms;
//
//    private String transport;
//
//    private String neightborhood;
//
//    @Length(max = 200)
//    private String house_rules;
//
//}
