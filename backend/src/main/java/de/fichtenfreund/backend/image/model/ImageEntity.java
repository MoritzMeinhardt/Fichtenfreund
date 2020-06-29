package de.fichtenfreund.backend.image.model;

import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data
@Table(name = "IMAGES")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageEntity extends AbstractEntity {

    @Id
    @GenericGenerator(name = "IMAGES_SEQUENCE", strategy = "sequence", parameters = {
            @org.hibernate.annotations.Parameter(name = "sequence", value = "IMAGES_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IMAGES_SEQUENCE")
    private Long id;

    private String title;

    private String altText;

    private boolean isTitle;

    private boolean isMeta;

    private byte[] image;

}
