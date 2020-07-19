package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogEntity;
import de.fichtenfreund.backend.blog.model.BlogView;
import de.fichtenfreund.backend.blog.model.BlogViewWithoutImages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface BlogRepository extends JpaRepository<BlogEntity, Long> {

    Page<BlogViewWithoutImages> findAllProjectedByOrderByCreatedOnDesc(Pageable pageable);

    BlogView findViewById(Long id);
}
