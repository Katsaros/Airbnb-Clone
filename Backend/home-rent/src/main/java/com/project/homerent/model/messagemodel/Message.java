package com.project.homerent.model.messagemodel;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.homerent.model.usermodel.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name="messages")
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Message {

    @Id
    @Column(name = "message_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;

    @Column(name = "messageText")
    private String messageText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id", nullable = false)
    private User sender;

    @Column(name = "recipient_id")
    private long recipientId;

    @Column(name = "recipient_username")
    private String recipientUsername;

    @Column(name = "is_read")
    private boolean read;

    @Column(name = "created_timestamp")
    @CreationTimestamp
    private Date creationTimestamp;
}