package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogEntity;
import de.fichtenfreund.backend.blog.model.BlogView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface BlogRepository extends JpaRepository<BlogEntity, Long> {

    List<BlogView> findAllProjectedBy();
}
