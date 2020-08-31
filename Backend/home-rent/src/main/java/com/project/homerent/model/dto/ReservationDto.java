package com.project.homerent.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.usermodel.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Data
public class ReservationDto {

    private long reservationId;

    private long bookedHomeId;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date bookedDate;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date leaveDate;

    int isBooked;

    private long userIdBooked;
    private String userNameBooked;

    int hostReviewStars;

    String hostReviewDescription;

    int homeReviewStars;

    String homeReviewDescription;
}
