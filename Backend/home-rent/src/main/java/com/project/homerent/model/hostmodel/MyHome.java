package com.project.homerent.model.hostmodel;

import com.project.homerent.model.usermodel.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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


//    @Column(name = "myhome_address", nullable = false)
//    private String homeAddress;

}