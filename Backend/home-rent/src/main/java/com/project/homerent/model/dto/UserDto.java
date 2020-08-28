package com.project.homerent.model.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Lob;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private long id;
    @NotNull
    @NotEmpty
    private String username;

    private String firstname;
    private String lastname;

    private String email;

    private String telephone;
    private int approved;

    @Lob
    private Byte[] image;
}