package de.fichtenfreund.backend.blog.model;

import de.fichtenfreund.backend.Travel.Travel;
import de.fichtenfreund.backend.blog.paragraph.ParagraphEntity;
import de.fichtenfreund.backend.comment.model.CommentEntity;
import de.fichtenfreund.backend.country.Country;
import de.fichtenfreund.backend.image.model.ImageEntity;
import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "BLOG_ENTRIES")
@Data
public class BlogEntity extends AbstractEntity {

    @Id
    @GenericGenerator(name = "BLOG_SEQUENCE", strategy = "sequence", parameters = {
            @Parameter(name = "sequence", value = "BLOG_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BLOG_SEQUENCE")
    private Long id;

    private String title;

    private Long titlePictureId;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true)
    @JoinColumn(name = "BLOG_ID")
    private List<ParagraphEntity> paragraphEntities;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true)
    @JoinColumn(name = "BLOG_ID")
    private List<CommentEntity> commentEntities;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true)
    @JoinColumn(name = "BLOG_ID")
    private List<ImageEntity> galleryImages;

    private String category;

    @Transient
    private List<Country> referredCountries;

    @Transient
    private Travel referredTravel;

}
