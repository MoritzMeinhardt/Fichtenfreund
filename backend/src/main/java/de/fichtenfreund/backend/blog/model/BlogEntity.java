package de.fichtenfreund.backend.blog.model;

import de.fichtenfreund.backend.Travel.Travel;
import de.fichtenfreund.backend.blog.GalleryImage.GalleryImage;
import de.fichtenfreund.backend.blog.paragraph.Paragraph;
import de.fichtenfreund.backend.comment.Comment;
import de.fichtenfreund.backend.country.Country;
import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

//@Entity
//@Table(name = "BLOG")
@Data
public class BlogEntity extends AbstractEntity {

    String title;

    String titlePicture;

    List<Paragraph> paragraphs;

    List<Comment> comments;

    List<GalleryImage> galleryImages;

    String category;

    List<Country> referredCountries;

    Travel referredTravel;

}
