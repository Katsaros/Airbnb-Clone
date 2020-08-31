package com.project.homerent.repository;

import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.messagemodel.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAll();
    Optional<Message> findById(Long id);
    List<Message> findBySenderId(Long senderId);
    List<Message> findByRecipientId(Long receiverId);
}