package de.fichtenfreund.backend.blog.paragraph;

import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.Data;

@Data
public class Paragraph extends AbstractEntity {
    String paragraphPic;
    String paragraphTitle;
    String paragraphText;

}
