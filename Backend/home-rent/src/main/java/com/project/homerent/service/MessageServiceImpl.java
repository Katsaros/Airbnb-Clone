package com.project.homerent.service;

import com.project.homerent.converter.MessageConverter;
import com.project.homerent.model.dto.MessageDto;
import com.project.homerent.model.messagemodel.Message;
import com.project.homerent.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Override
    public MessageDto findMessageDtoById(Long id) {
        Message message;
        message = messageRepository.findById(id).get();
        return MessageConverter.convertToDto(message);
    }

    @Override
    public Message findMessageById(Long id) {
        Message message;
        message = messageRepository.findById(id).get();
        return message;
    }

    @Override
    public List<MessageDto> findMessagesBySenderId(Long id) {
        return messageRepository.findBySenderId(id)
                .stream()
                .map(MessageConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDto> findMessagesByReceiverId(Long id) {
        return messageRepository.findByRecipientId(id)
                .stream()
                .map(MessageConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDto> findHistory(Long sender, Long receiver) {
        List<MessageDto> historyMessages = new ArrayList<>();

        List<MessageDto> senderMessages = messageRepository.findBySenderId(sender)
            .stream()
            .filter(message -> message.getRecipientId()==receiver)
            .map(MessageConverter::convertToDto)
            .collect(Collectors.toList());

        List<MessageDto> receivedMessages = messageRepository.findBySenderId(receiver)
            .stream()
            .filter(message -> message.getRecipientId()==sender)
            .map(MessageConverter::convertToDto)
            .collect(Collectors.toList());

        int historySize = senderMessages.size() + receivedMessages.size();
        int priority;

        for (int senderLoop=0; senderLoop<senderMessages.size(); senderLoop++) {
            for (int receiverLoop=0; receiverLoop<receivedMessages.size(); receiverLoop++) {

                priority = findPriorityMessage(senderMessages.get(senderLoop), receivedMessages.get(receiverLoop));
                if (priority == -1) {
                    int loop = senderLoop+1;
                    if(loop>=senderMessages.size()){
                        historyMessages.add(receivedMessages.get(receiverLoop));
                        priority=100;
                    }
                    if(priority!=100) {
                        historyMessages.add(senderMessages.get(senderLoop));
                        if (loop < senderMessages.size()) senderLoop++;
                        receiverLoop--;
                    }
                }
                if (priority == 0) {
                    int loop = senderLoop+1;
                    if(loop<senderMessages.size())senderLoop++;
                    historyMessages.add(receivedMessages.get(receiverLoop));
                    senderLoop++;
                }
                if (priority > 0) {
                    historyMessages.add(receivedMessages.get(receiverLoop));
                }
                if(priority==100)break;
            }
        }

        return historyMessages;
    }

    private int findPriorityMessage(MessageDto senderMessage, MessageDto receiverDto) {
        if(senderMessage.getCreationTimestamp().compareTo(receiverDto.getCreationTimestamp())<0)return -1;
        else if(senderMessage.getCreationTimestamp().compareTo(receiverDto.getCreationTimestamp())>0)return 1;
        else return 0;
    }

    @Override
    public List<MessageDto> findAll() {
        return messageRepository.findAll()
                .stream()
                .map(MessageConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MessageDto save(MessageDto messageDto) {
        Message message = MessageConverter.convert(messageDto);

        message = messageRepository.save(message);

        return MessageConverter.convertToDto(message);
    }


    @Override
    public void deleteById(Long id) {
        messageRepository.deleteById(id);
    }

}
