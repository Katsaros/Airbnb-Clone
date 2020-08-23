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
@Table(name="incident_authority")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class HomeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myhome_id", nullable = false)
    private long id;

    @Column(name = "myhome_name", nullable = false)
    private String authorityName;

    @OneToMany(mappedBy="authority", cascade = CascadeType.ALL)
    private List<HomeCategory> incidents;

    @OneToMany(mappedBy="authority", cascade = CascadeType.ALL)
    private List<User> users;
}