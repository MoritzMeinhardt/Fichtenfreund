package de.fichtenfreund.backend.comment;

import de.fichtenfreund.backend.comment.model.CommentDTO;
import de.fichtenfreund.backend.comment.model.CommentEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping(value = "/api/blogs/{blogId}/comments")
@AllArgsConstructor
@CrossOrigin
public class CommentController {

    private CommentService commentService;
    private ModelMapper modelMapper;

    @PostMapping
    public CommentDTO createComment(@RequestBody() CommentDTO commentToBeCreated, @PathVariable("blogId") Long blogId) {
        commentToBeCreated.setBlogId(blogId);
        return convertToDTO(commentService.create(convertToEntity(commentToBeCreated)));
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathParam("id") Long id) {
        commentService.delete(id);
    }

    private CommentDTO convertToDTO(CommentEntity commentEntity) {
        return modelMapper.map(commentEntity, CommentDTO.class);
    }

    private CommentEntity convertToEntity(CommentDTO commentDTO) {
        return modelMapper.map(commentDTO, CommentEntity.class);
    }
}
