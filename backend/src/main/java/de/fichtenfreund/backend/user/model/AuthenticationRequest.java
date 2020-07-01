package de.fichtenfreund.backend.user.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class AuthenticationRequest implements Serializable {

    private String username;
    private String password;

}