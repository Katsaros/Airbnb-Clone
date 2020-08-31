package com.project.homerent.repository;

import com.project.homerent.model.hostmodel.MyHome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HostRepository extends JpaRepository<MyHome, Long> {
    List<MyHome> findByOwnerId(Long homeId);
    List<MyHome> findAll();
    Optional<MyHome> findById(Long id);

    Optional<MyHome> findByAddress(String address);
}