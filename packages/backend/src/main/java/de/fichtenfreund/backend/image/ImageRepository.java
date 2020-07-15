package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.*;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

interface ImageRepository extends CrudRepository<ImageEntity, Long> {

    ImageSmallView getSmallById(Long id);

    ImageMediumView getMediumById(Long id);

    ImageLargeView getLargeById(Long id);

    ImageWithoutPayloadView getNoPayloadById(Long id);

    @Modifying
    @Query("UPDATE ImageEntity c SET c.blogId = :blogId WHERE c.id = :id")
    void addBlogIdToImage(@Param("id") Long id, @Param("blogId") Long blogId);

    @Modifying
    @Query(value = "UPDATE IMAGES SET RAW_IMAGE = :rawImage WHERE ID = :id",
            nativeQuery = true)
    void saveRawImage(@Param("id") Long id, @Param("rawImage") byte[] rawImage);
}
