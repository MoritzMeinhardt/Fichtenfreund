package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@AllArgsConstructor
public class BlogService {

    private BlogRepository blogRepository;

    public List<BlogEntity> getAllBlogEntries() {
        return blogRepository.findAll();
    }

    public BlogEntity getById(Long id) {
        return blogRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public BlogEntity create(BlogEntity blogToBeCreated) {
        return blogRepository.save(blogToBeCreated);
    }

    public BlogEntity update(BlogEntity blogToBeUpdated) {
        return blogRepository.save(blogToBeUpdated);
    }

    public void delete(Long id) {
        blogRepository.deleteById(id);
    }
}
