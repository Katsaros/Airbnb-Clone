package com.project.homerent.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MessageConnectionsDto {
    private long senderId;
    private long receiverId;
    private String receiverName;
}
