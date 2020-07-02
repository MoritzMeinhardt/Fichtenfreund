package de.fichtenfreund.backend.user.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Data
@RequiredArgsConstructor
public class AuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 345L;

    @Setter(AccessLevel.NONE)
    private final String token;
    private Long id;
    private String username;
    private List<String> roles;
    private boolean success;
}

