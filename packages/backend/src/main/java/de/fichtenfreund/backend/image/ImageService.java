package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class ImageService {

    private ImageRepository imageRepository;

    public Long create(ImageEntity image, byte[] rawImage) {

        // create small image
        image.setSmallImage(ImageResizer.toSize(rawImage, ImageResizer.SMALL_WIDTH));
        // create medium image
        image.setMediumImage(ImageResizer.toSize(rawImage, ImageResizer.MEDIUM_WIDTH));
        // create large image
        image.setLargeImage(ImageResizer.toSize(rawImage, ImageResizer.LARGE_WIDTH));

        Long savedImageId = imageRepository.save(image).getId();
        imageRepository.saveRawImage(savedImageId, rawImage);
        return savedImageId;
    }

    public Long update(ImageEntity image) {
        return imageRepository.save(image).getId();
    }

    public ImageWithoutPayloadView getById(Long id) {
        return imageRepository.getNoPayloadById(id);
    }

    public ImageSmallView getSmallImage(Long id){
        return imageRepository.getSmallById(id);
    }

    public ImageMediumView getMediumImage(Long id){
        return imageRepository.getMediumById(id);
    }

    public ImageLargeView getLargeImage(Long id){
        return imageRepository.getLargeById(id);
    }

    public void addBlogIdToImage(Long id, Long blogId) {
        imageRepository.addBlogIdToImage(id, blogId);
    }
}
