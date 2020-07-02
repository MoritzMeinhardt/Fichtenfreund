package de.fichtenfreund.backend.comment;

import de.fichtenfreund.backend.comment.model.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

interface CommentRepository extends JpaRepository<CommentEntity, Long> {

}
