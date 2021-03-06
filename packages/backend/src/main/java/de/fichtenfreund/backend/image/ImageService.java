package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
@AllArgsConstructor
public class ImageService {

    private ImageRepository imageRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public Long create(ImageEntity image, byte[] rawImage) {

        // create small image
        image.setSmallImage(ImageResizer.toSize(rawImage, ImageResizer.SMALL_WIDTH));
        // create medium image
        image.setMediumImage(ImageResizer.toSize(rawImage, ImageResizer.MEDIUM_WIDTH));
        // create large image
        image.setLargeImage(ImageResizer.toSize(rawImage, ImageResizer.LARGE_WIDTH));

        Long savedImageId = imageRepository.save(image).getId();
         try {
            imageRepository.saveRawImage(savedImageId, new javax.sql.rowset.serial.SerialBlob(rawImage));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
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
    @Transactional(propagation = Propagation.REQUIRED)
    public void addBlogIdToImage(Long id, Long blogId) {
        imageRepository.addBlogIdToImage(id, blogId);
    }
}
