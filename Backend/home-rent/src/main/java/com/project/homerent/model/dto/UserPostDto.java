package com.project.homerent.model.dto;

import com.project.homerent.model.usermodel.Role;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserPostDto {
    private long userId;

    @NotNull
    @NotEmpty
    private String username;

    @NotNull
    @NotEmpty
    private String password;

    private String email;

    private String firstname;
    private String lastname;

    private Set<Role> roles;

    private String telephone;
    private String approved;
}