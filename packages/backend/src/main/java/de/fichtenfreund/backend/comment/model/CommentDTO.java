package de.fichtenfreund.backend.comment.model;

import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.Data;

@Data
public class CommentDTO extends AbstractEntity {

    private Long id;

    private Long blogId;

    private String name;

    private String email;

    private String commentText;

}
