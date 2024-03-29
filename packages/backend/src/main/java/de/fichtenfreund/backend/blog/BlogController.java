package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogDTO;
import de.fichtenfreund.backend.blog.model.BlogEntity;
import de.fichtenfreund.backend.blog.model.BlogView;
import de.fichtenfreund.backend.blog.model.BlogViewWithoutImages;
import de.fichtenfreund.backend.blog.paragraph.ParagraphEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
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
    public Page<BlogDTO> getBlogEntries(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        if (page == null || size == null) {
           return blogService.getAllBlogEntriesWithSmallPayload(Pageable.unpaged()).map(this::convertToDTO);
        }
        return blogService.getAllBlogEntriesWithSmallPayload(PageRequest.of(page, size)).map(this::convertToDTO);
    }

    @GetMapping("/{id}")
    public BlogDTO getById(@PathVariable("id") Long id) {
        return convertToDTO(blogService.getViewById(id));
    }

    @Secured("ADMIN")
    @PostMapping
    public BlogDTO createBlog(@RequestBody() BlogDTO blogToBeCreated) {
        return convertToDTO(blogService.create(convertToEntity(blogToBeCreated)));
    }

    @Secured("ADMIN")
    @PutMapping("/{id}")
    public BlogDTO updateBlog(@RequestBody() BlogDTO blogToBeUpdated, @PathVariable("id") Long id) {
        return convertToDTO(blogService.update(convertToEntity(blogToBeUpdated), id));
    }

    @Secured("ADMIN")
    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable("id") Long id) {
        blogService.delete(id);
    }

    private BlogDTO convertToDTO(BlogEntity blogEntity) {
        return modelMapper.map(blogEntity, BlogDTO.class);
    }

    private BlogDTO convertToDTO(BlogView blogEntity) {
        BlogDTO dto = modelMapper.map(blogEntity, BlogDTO.class);
        List<ParagraphEntity> sortedParagraphs = dto.getParagraphEntities().stream()
                .sorted(Comparator.comparingLong(ParagraphEntity::getId)).collect(Collectors.toList());
        dto.setParagraphEntities(sortedParagraphs);
        return dto;
    }

    private BlogDTO convertToDTO(BlogViewWithoutImages blogEntity) {
        BlogDTO dto = modelMapper.map(blogEntity, BlogDTO.class);
        List<ParagraphEntity> sortedParagraphs = dto.getParagraphEntities().stream()
                .sorted(Comparator.comparingLong(ParagraphEntity::getId)).collect(Collectors.toList());
        dto.setParagraphEntities(sortedParagraphs);
        return dto;
    }

    private BlogEntity convertToEntity(BlogDTO blogDTO) {
        return modelMapper.map(blogDTO, BlogEntity.class);
    }
}
