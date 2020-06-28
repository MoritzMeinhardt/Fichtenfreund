package de.fichtenfreund.backend.comment;

import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.Data;

@Data
public class Comment extends AbstractEntity {
    String name;
    String email;
    String commentText;
    Double created; // legacy, is now covered by AbstractEntity TODO remove
}
