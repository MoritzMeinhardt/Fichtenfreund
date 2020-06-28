package de.fichtenfreund.backend.blog.model;

import de.fichtenfreund.backend.Travel.Travel;
import de.fichtenfreund.backend.blog.GalleryImage.GalleryImage;
import de.fichtenfreund.backend.blog.paragraph.Paragraph;
import de.fichtenfreund.backend.comment.Comment;
import de.fichtenfreund.backend.country.Country;
import lombok.Data;

import java.util.List;

@Data
public class BlogDTO {

    private Long id;

    private String title;

    private String titlePicture;

    private List<Paragraph> paragraphs;

    private List<Comment> comments;

    private List<GalleryImage> galleryImages;

    private String category;

    private List<Country> referredCountries;

    private Travel referredTravel;
}
