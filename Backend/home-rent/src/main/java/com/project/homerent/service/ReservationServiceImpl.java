package com.project.homerent.service;

import com.project.homerent.converter.HomeCategoryConverter;
import com.project.homerent.converter.MyHomeConverter;
import com.project.homerent.converter.ReservationConverter;
import com.project.homerent.model.dto.HomeCategoryDto;
import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.hostmodel.Reservation;
import com.project.homerent.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    ReservationRepository reservationRepository;

    @Override
    public ReservationDto findReservationDtoById(Long id) {
        Reservation reservation;
        reservation = reservationRepository.findById(id).get();
        return ReservationConverter.convertToDto(reservation);
    }

    @Override
    public Reservation findReservationById(Long id) {
        Reservation reservation;
        reservation = reservationRepository.findById(id).get();
        return reservation;
    }

    @Override
    public List<ReservationDto> findAll() {
        return reservationRepository.findAll()
                .stream()
                .map(ReservationConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDto save(ReservationDto reservationDto) {
        Reservation reservation = ReservationConverter.convert(reservationDto);

        reservation = reservationRepository.save(reservation);

        return ReservationConverter.convertToDto(reservation);
    }

}
