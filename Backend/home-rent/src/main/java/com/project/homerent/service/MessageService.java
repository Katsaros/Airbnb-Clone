package com.project.homerent.service;


import com.project.homerent.model.dto.MessageDto;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.hostmodel.Reservation;
import com.project.homerent.model.messagemodel.Message;

import java.util.List;


public interface MessageService {
    MessageDto findMessageDtoById(Long id);
    Message findMessageById(Long id);
    List<MessageDto> findAll();
    MessageDto save(MessageDto messageDto);

    List<MessageDto> findMessagesBySenderId(Long id);
    List<MessageDto> findMessagesByReceiverId(Long id);

    List<MessageDto> findHistory(Long sender, Long receiver);
    void deleteById(Long id);
}
