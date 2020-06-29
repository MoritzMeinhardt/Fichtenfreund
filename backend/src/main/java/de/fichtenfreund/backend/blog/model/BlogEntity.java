package de.fichtenfreund.backend.blog.model;

import de.fichtenfreund.backend.Travel.Travel;
import de.fichtenfreund.backend.blog.GalleryImage.GalleryImage;
import de.fichtenfreund.backend.blog.paragraph.Paragraph;
import de.fichtenfreund.backend.comment.Comment;
import de.fichtenfreund.backend.country.Country;
import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.*;
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

    private String titlePicture;

    @Transient
    private List<Paragraph> paragraphs;

    @Transient
    private List<Comment> comments;

    @Transient
    private List<GalleryImage> galleryImages;

    private String category;

    @Transient
    private List<Country> referredCountries;

    @Transient
    private Travel referredTravel;

}
