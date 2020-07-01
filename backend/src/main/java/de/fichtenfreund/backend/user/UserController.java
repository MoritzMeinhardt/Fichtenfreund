package de.fichtenfreund.backend.user;

import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/users")
@CrossOrigin
public class UserController {

    @PostMapping("authenticate")
    public AuthenticatedDTO authenticate() {
        return AuthenticatedDTO.builder()
                .success(true)
                .token("my personal token")
                .user(new User("username", "password", List.of()))
                .build();
    }
}
