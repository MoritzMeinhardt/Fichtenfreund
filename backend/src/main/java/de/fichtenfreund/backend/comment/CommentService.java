package de.fichtenfreund.backend.comment;

import de.fichtenfreund.backend.comment.model.CommentEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class CommentService {

    private CommentRepository commentRepository;

    public CommentEntity getById(Long id) {
        return commentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public CommentEntity create(CommentEntity commentToBeCreated) {
        return commentRepository.save(commentToBeCreated);
    }

    public CommentEntity update(CommentEntity commentToBeUpdated) {
        return commentRepository.save(commentToBeUpdated);
    }

    public void delete(Long id) {
        commentRepository.deleteById(id);
    }
}
