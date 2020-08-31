package com.project.homerent.converter;

import com.project.homerent.model.dto.MessageDto;
import com.project.homerent.model.messagemodel.Message;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.service.MessageService;
import com.project.homerent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class MessageConverter {

    @Autowired
    private UserService userService;
    private static UserService userServiceStatic;

    @Autowired
    private MessageService messageService;
    private static MessageService messageServiceStatic;

    @Autowired
    public void setStatic() {
        this.userServiceStatic = userService;
        this.messageServiceStatic = messageService;
    }

    public static MessageDto convertToDto(Message message) {
        MessageDto messageDto = new MessageDto();
        messageDto.setMessageId(message.getMessageId());
        messageDto.setCreationTimestamp(message.getCreationTimestamp());
        messageDto.setMessage(message.getMessageText());
        messageDto.setRead(message.isRead());
        messageDto.setReceiverId(message.getRecipientId());
        messageDto.setSenderId(message.getSender().getId());
        return messageDto;
    }

    public static Message convert(MessageDto messageDto) {
        Message message = new Message();
        message.setMessageId(messageDto.getMessageId());
        message.setCreationTimestamp(messageDto.getCreationTimestamp());
        message.setMessageText(messageDto.getMessage());
        message.setRead(messageDto.isRead());

        User user = userServiceStatic.findById(messageDto.getSenderId());
        message.setSender(user);

        message.setRecipientId(messageDto.getReceiverId());
        User receiver = userServiceStatic.findById(messageDto.getReceiverId());

        message.setRecipientUsername(receiver.getUsername());

        return message;
    }
}