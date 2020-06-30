package de.fichtenfreund.backend.blog.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.fichtenfreund.backend.Travel.Travel;
import de.fichtenfreund.backend.blog.GalleryImage.GalleryImage;
import de.fichtenfreund.backend.blog.paragraph.ParagraphEntity;
import de.fichtenfreund.backend.comment.Comment;
import de.fichtenfreund.backend.country.Country;
import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.Data;

import java.util.List;

@Data
public class BlogDTO extends AbstractEntity {

    private Long id;

    private String title;

    @JsonProperty("titlePicture")
    private Long titlePictureId;

    private List<ParagraphEntity> paragraphEntities;

    private List<Comment> comments;

    private List<GalleryImage> galleryImages;

    private String category;

    private List<Country> referredCountries;

    private Travel referredTravel;
}
