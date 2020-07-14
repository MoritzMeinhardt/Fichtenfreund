package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.*;
import org.springframework.data.repository.CrudRepository;

interface ImageRepository extends CrudRepository<ImageEntity, Long> {

    ImageSmallView getSmallById(Long id);

    ImageMediumView getMediumById(Long id);

    ImageLargeView getLargeById(Long id);
}
