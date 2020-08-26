//package com.project.homerent.model.hostmodel;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.List;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@Entity
//@Table(name="home_category")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//public class HomeCategory {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "homecategory_id", nullable = false)
//    private long id;
//
//    @Column(name = "homecategory_title", nullable = false)
//    private String homeCategoryTitle;
//
//    @OneToMany(mappedBy="homeCategory", cascade = CascadeType.ALL)
//    private List<MyHome> myHomes;
//}