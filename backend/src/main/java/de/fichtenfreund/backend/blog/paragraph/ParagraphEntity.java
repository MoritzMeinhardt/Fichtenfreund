package de.fichtenfreund.backend.blog.paragraph;

import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;

@Entity
@Table(name = "PARAGRAPHS")
@Data
public class ParagraphEntity extends AbstractEntity {

    @Id
    @GenericGenerator(name = "PARAGRAPHS_SEQUENCE", strategy = "sequence", parameters = {
            @Parameter(name = "sequence", value = "PARAGRAPHS_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PARAGRAPHS_SEQUENCE")
    private Long id;

    private String imageId;

    private String title;

    private String text;


}
