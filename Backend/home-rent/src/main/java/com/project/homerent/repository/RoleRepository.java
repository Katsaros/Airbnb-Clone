package com.project.homerent.repository;


import com.project.homerent.model.usermodel.ERole;
import com.project.homerent.model.usermodel.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

