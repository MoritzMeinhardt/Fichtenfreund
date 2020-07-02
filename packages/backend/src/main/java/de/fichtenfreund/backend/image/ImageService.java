package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class ImageService {

    private ImageRepository imageRepository;

    public Long create(ImageEntity image) {

        // create small image
        image.setSmallImage(ImageResizer.toSize(image.getRawImage(), ImageResizer.SMALL_WIDTH));
        // create medium image
        image.setMediumImage(ImageResizer.toSize(image.getRawImage(), ImageResizer.MEDIUM_WIDTH));
        // create large image
        image.setLargeImage(ImageResizer.toSize(image.getRawImage(), ImageResizer.LARGE_WIDTH));
        return imageRepository.save(image).getId();
    }

    public Long update(ImageEntity image) {
        return imageRepository.save(image).getId();
    }

    public ImageEntity getById(Long id) {
        return imageRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
