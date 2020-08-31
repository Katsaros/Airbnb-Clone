package com.project.homerent.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class MessageDto {
    private long messageId;
    private long senderId;
    private long receiverId;

    private String message;
    private boolean read;

    //    @JsonFormat(pattern="yyyy-MM-dd")
    private Date creationTimestamp;
}
