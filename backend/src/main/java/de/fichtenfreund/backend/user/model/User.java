package de.fichtenfreund.backend.user.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "USER_DETAILS")
@Data
public class User implements Serializable {

    private static final long serialVersionUID = 2364534L;

    @Id
    @GenericGenerator(name = "USER_DETAILS_SEQUENCE", strategy = "sequence", parameters = {
            @org.hibernate.annotations.Parameter(name = "sequence", value = "USER_DETAILS_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_DETAILS_SEQUENCE")
    private int id;

    private String username;
    private String password;
    private boolean active;
    private String roles;

}
