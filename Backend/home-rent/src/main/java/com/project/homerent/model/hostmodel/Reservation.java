package com.project.homerent.model.hostmodel;

import com.project.homerent.model.usermodel.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="reservation")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Reservation {
    @Id
    @Column(name = "reservation_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="myhome_id", nullable = false)
    private MyHome bookedHome;

    @Column(name = "booked_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date bookedDate;

    @Column(name = "leave_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date leaveDate;

    @Column(name = "booked")
    int booked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id", nullable = false)
    private User userBooked;
}
