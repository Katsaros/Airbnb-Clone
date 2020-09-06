package com.project.homerent.model.dto;

import com.project.homerent.model.usermodel.Role;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Lob;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserPostDto {
    private long id;

    private String username;

    private String password;

    private String email;

    private String firstname;
    private String lastname;

    private String telephone;
    private int approved;

    @Lob
    private Byte[] image;
}