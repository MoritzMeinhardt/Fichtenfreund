package de.fichtenfreund.backend.blog.paragraph;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;

@Entity
@Table(name = "PARAGRAPHS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParagraphEntity extends AbstractEntity {

    @Id
    @GenericGenerator(name = "PARAGRAPHS_SEQUENCE", strategy = "sequence", parameters = {
            @Parameter(name = "sequence", value = "PARAGRAPHS_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PARAGRAPHS_SEQUENCE")
    private Long id;

    @Column(name = "BLOG_ID")
    private Long blogId;

    @JsonProperty("paragraphPic")
    private String imageId;

    @JsonProperty("paragraphTitle")
    private String title;

    @JsonProperty("paragraphText")
    private String text;


}
