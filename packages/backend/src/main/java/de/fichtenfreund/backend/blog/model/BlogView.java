package de.fichtenfreund.backend.blog.model;

import de.fichtenfreund.backend.blog.paragraph.ParagraphEntity;
import de.fichtenfreund.backend.comment.model.CommentEntity;
import de.fichtenfreund.backend.image.model.ImageWithoutPayloadView;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

public interface BlogView {

    Long getId();

    String getTitle();

    Long getTitlePictureId();

    List<ParagraphEntity> getParagraphEntities();

    List<CommentEntity> getCommentEntities();

    List<ImageWithoutPayloadView> getGalleryImages();

    String getCategory();

    String getCreatedBy();

    String getUpdatedBy();

    Date getCreatedOn();

    Date getUpdatedOn();
}
