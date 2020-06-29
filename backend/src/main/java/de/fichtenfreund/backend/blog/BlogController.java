package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogDTO;
import de.fichtenfreund.backend.blog.model.BlogEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/blogs")
@AllArgsConstructor
@CrossOrigin
public class BlogController {

    private BlogService blogService;
    private ModelMapper modelMapper;

    @GetMapping
    public List<BlogDTO> getBlogEntries() {
        return blogService.getAllBlogEntries().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BlogDTO getById(@PathVariable("id") Long id) {
        return convertToDTO(blogService.getById(id));
    }

    @PostMapping
    public BlogDTO createBlog(@RequestBody() BlogDTO blogToBeCreated) {
        return convertToDTO(blogService.create(convertToEntity(blogToBeCreated)));
    }

    @PutMapping
    public BlogDTO updateBlog(BlogDTO blogToBeUpdated) {
        return convertToDTO(blogService.update(convertToEntity(blogToBeUpdated)));
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathParam("id") Long id) {
        blogService.delete(id);
    }

    private BlogDTO convertToDTO(BlogEntity blogEntity) {
        return modelMapper.map(blogEntity, BlogDTO.class);
    }

    private BlogEntity convertToEntity(BlogDTO blogDTO) {
        return modelMapper.map(blogDTO, BlogEntity.class);
    }
}
