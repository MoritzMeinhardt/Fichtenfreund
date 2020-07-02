package de.fichtenfreund.backend.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

class AuditorAwareImpl implements AuditorAware<String> {

    public Optional<String> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.of("anonymous");
        }

        return Optional.of(((User) authentication.getPrincipal()).getUsername());
    }
}