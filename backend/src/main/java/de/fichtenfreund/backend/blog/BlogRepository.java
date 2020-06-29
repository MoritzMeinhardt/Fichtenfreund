package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

interface BlogRepository extends JpaRepository<BlogEntity, Long> {

}
