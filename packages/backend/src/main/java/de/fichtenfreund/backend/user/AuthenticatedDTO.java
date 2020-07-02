package de.fichtenfreund.backend.user;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.userdetails.User;

@Data
@Builder
public class AuthenticatedDTO {

    boolean success;
    String token;
    User user;

}
