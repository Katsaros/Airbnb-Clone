package com.project.homerent.repository;

import com.project.homerent.model.dto.HomeDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.usermodel.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HostRepository extends JpaRepository<MyHome, Long> {
    Optional<HomeDto> findById(long homeId);
}