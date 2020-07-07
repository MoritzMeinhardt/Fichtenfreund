package de.fichtenfreund.backend.blog.migration;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.fichtenfreund.backend.comment.model.CommentEntity;
import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MigrationObject {

    private Long id;

    private String title;

    @JsonProperty("titlePicture")
    private String titlePictureId;

    @JsonProperty("paragraphs")
    private List<MigrationParagraph> paragraphEntities;

    @JsonProperty("comments")
    private List<CommentEntity> commentEntities;

    private List<ImageEntity> galleryImages;

    private String category;
}