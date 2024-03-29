package de.fichtenfreund.backend.image.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Data
@Table(name = "IMAGES")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true) // TODO REMOVE
public class ImageEntity extends AbstractEntity {

    @Id
    @GenericGenerator(name = "IMAGES_SEQUENCE", strategy = "sequence", parameters = {
            @org.hibernate.annotations.Parameter(name = "sequence", value = "IMAGES_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IMAGES_SEQUENCE")
    private Long id;

    @Column(name = "BLOG_ID")
    private Long blogId;

    private String title;

    private String altText;

    @JsonIgnore
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] smallImage;

    @JsonIgnore
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] mediumImage;

    @JsonIgnore
    @Type(type = "org.hibernate.type.ImageType")
    private byte[] largeImage;
}
