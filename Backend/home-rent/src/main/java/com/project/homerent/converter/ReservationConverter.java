package com.project.homerent.converter;

import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.hostmodel.Reservation;
import com.project.homerent.service.HostService;
import com.project.homerent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ReservationConverter {

    @Autowired
    private HostService hostService;
    private static HostService hostServiceStatic;

    @Autowired
    private UserService userService;
    private static UserService userServiceStatic;

    @Autowired
    public void setStatic() {
        this.hostServiceStatic = hostService;
        this.userServiceStatic = userService;
    }

    public static ReservationDto convertToDto(Reservation reservation) {
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setReservationId(reservation.getId());
        reservationDto.setBookedDate(reservation.getBookedDate());
        reservationDto.setLeaveDate(reservation.getLeaveDate());
        reservationDto.setBookedHomeId(reservation.getBookedHome().getId());
        reservationDto.setUserIdBooked(reservation.getUserBooked().getId());
        reservationDto.setUserNameBooked(reservation.getUserBooked().getUsername());

        return reservationDto;
    }

    public static Reservation convert(ReservationDto reservationDto) {
        Reservation reservation = new Reservation();
        reservation.setId(reservationDto.getReservationId());
        reservation.setBookedDate(reservationDto.getBookedDate());
        reservation.setLeaveDate(reservationDto.getLeaveDate());
        reservation.setBookedHome(hostServiceStatic.findHomeById(reservationDto.getBookedHomeId()));
        reservation.setUserBooked(userServiceStatic.findById(reservationDto.getUserIdBooked()));
        return reservation;
    }
}