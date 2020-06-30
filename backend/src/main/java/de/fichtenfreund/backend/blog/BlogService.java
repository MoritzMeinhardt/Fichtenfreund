package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogEntity;
import de.fichtenfreund.backend.image.ImageService;
import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BlogService {

    private BlogRepository blogRepository;
    private ImageService imageService;

    public List<BlogEntity> getAllBlogEntries() {
        return blogRepository.findAll();
    }

    public BlogEntity getById(Long id) {
        return blogRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public BlogEntity create(BlogEntity blogToBeCreated) {
        //TODO handle images
        return blogRepository.save(blogToBeCreated);
    }

    public BlogEntity update(BlogEntity blogToBeUpdated, Long id) {
        assert(id.equals(blogToBeUpdated.getId()));

        BlogEntity existingBlog = getById(id);
        updateGalleryImagesOfBlogEntry(blogToBeUpdated, existingBlog);
        return blogRepository.save(existingBlog);
    }

    private void updateGalleryImagesOfBlogEntry(BlogEntity blogToBeUpdated, BlogEntity existingBlog) {
        // Update existing fields
        existingBlog.getGalleryImages().forEach(existingGalleryImage ->
                blogToBeUpdated.getGalleryImages().stream()
                        .filter(galleryImage -> existingGalleryImage.getId().equals(galleryImage.getId()))
                        .forEach(galleryImage -> {
                            if (galleryImage.getTitle() != null) existingGalleryImage.setTitle(galleryImage.getTitle());
                            if (galleryImage.getImage() != null) existingGalleryImage.setImage(galleryImage.getImage());
                            if (galleryImage.getAltText() != null) existingGalleryImage.setAltText(galleryImage.getAltText());
                        })
        );

        // Remove deleted fields
        List<ImageEntity> removedGalleryImages = existingBlog.getGalleryImages().stream()
                .filter(existingGalleryImages -> blogToBeUpdated.getGalleryImages().stream().noneMatch(galleryImages -> existingGalleryImages.getId().equals(galleryImages.getId())))
                .collect(Collectors.toList());
        existingBlog.getGalleryImages().removeAll(removedGalleryImages);

        // Add new fields
        blogToBeUpdated.getGalleryImages().stream()
                .filter(galleryImage -> existingBlog.getGalleryImages().stream()
                        .filter(galleryImage2 -> galleryImage.getId().equals(galleryImage2.getId())).count() < 1)
                .collect(Collectors.toList())
        .forEach(galleryImage -> {
            ImageEntity img = imageService.getById(galleryImage.getId());
            img.setBlogId(existingBlog.getId());
            imageService.update(img);
            existingBlog.getGalleryImages().add(img);
        });
    }

    public void delete(Long id) {
        blogRepository.deleteById(id);
    }
}
