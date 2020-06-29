package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.ImageEntity;
import org.springframework.data.repository.CrudRepository;

interface ImageRepository extends CrudRepository<ImageEntity, Long> {
}
