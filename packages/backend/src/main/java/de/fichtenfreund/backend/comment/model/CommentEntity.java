package de.fichtenfreund.backend.comment.model;

import de.fichtenfreund.backend.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;

@Entity
@Table(name = "COMMENTS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentEntity extends AbstractEntity {

    @Id
    @GenericGenerator(name = "COMMENTS_SEQUENCE", strategy = "sequence", parameters = {
            @Parameter(name = "sequence", value = "COMMENTS_SEQUENCE")
    })
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMMENTS_SEQUENCE")
    private Long id;

    @Column(name = "BLOG_ID")
    private Long blogId;

    @Column(name = "USER")
    private String name;

    private String email;

    private String commentText;
}
