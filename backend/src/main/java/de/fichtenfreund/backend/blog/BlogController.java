package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/blogs")
public class BlogController {

    @GetMapping
    public BlogDTO getBlogs() {
        return new BlogDTO();
    }
}
