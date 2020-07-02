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
        return imageRepository.save(image).getId();
    }

    public Long update(ImageEntity image) {
        return imageRepository.save(image).getId();
    }

    public ImageEntity getById(Long id) {
        return imageRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public ImageEntity getTitleImage() {
        return imageRepository.getFirstByIsTitle(true);
    }

}
