package de.fichtenfreund.backend.user;

import de.fichtenfreund.backend.user.model.AuthenticationRequest;
import de.fichtenfreund.backend.user.model.AuthenticationResponse;
import de.fichtenfreund.backend.user.model.MyUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/users")
@CrossOrigin
@AllArgsConstructor
public class UserController {

    /*@PostMapping("authenticate")
    public AuthenticatedDTO authenticate() {
        return AuthenticatedDTO.builder()
                .success(true)
                .token("my personal token")
                .user(new User("username", "password", List.of()))
                .build();
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        Authentication authenticate = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );
    } */

    private AuthenticationManager authenticationManager;

    private JwtUtil jwtTokenUtil;

    private JPAUserDetailsService userDetailsService;

    @PostMapping(value = "/login")
    //@CrossOrigin
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        HttpHeaders responseHeaders = new HttpHeaders();

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );

        //if authentication was succesful else throw an exception
        final MyUserDetails userDetails = (MyUserDetails) userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        AuthenticationResponse response = new AuthenticationResponse(jwt);

        response.setId(userDetails.getId());
        response.setUsername(userDetails.getUsername());
        List<String> roles = new ArrayList<>();
        userDetails.getAuthorities().forEach((a) -> roles.add(a.getAuthority()));
        response.setRoles(roles);

        return new ResponseEntity<>(response, responseHeaders, HttpStatus.OK);

    }
}
