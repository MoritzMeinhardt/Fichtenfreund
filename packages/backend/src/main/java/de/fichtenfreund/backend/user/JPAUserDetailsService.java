package de.fichtenfreund.backend.user;

import de.fichtenfreund.backend.user.model.MyUserDetails;
import de.fichtenfreund.backend.user.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//import org.springframework.security.core.userdetails.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class JPAUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(userName);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + userName));
        return user.map(MyUserDetails::from).get();
        //return new User("foo","foo",new ArrayList<>());
    }

/*	public UserDetails findUserById(Integer id) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findById(id);
		user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + id));
		return user.map(MyUserDetails::new).get();
	}

	public UserDetails getLoggedInUser() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userDetails;
	}*/
}