package com.project.homerent.repository;

import com.project.homerent.model.hostmodel.HomeCategory;
import com.project.homerent.model.hostmodel.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAll();
    Optional<Reservation> findById(Long id);
}