package de.fichtenfreund.backend.blog;

import de.fichtenfreund.backend.blog.model.BlogEntity;
import de.fichtenfreund.backend.blog.paragraph.ParagraphEntity;
import de.fichtenfreund.backend.image.ImageService;
import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BlogService {

    private BlogRepository blogRepository;
    private ImageService imageService;

    public Page<BlogEntity> getAllBlogEntries(Pageable pageRequest) {
        return blogRepository.findAll(pageRequest);
    }

    public BlogEntity getById(Long id) {
        return blogRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public BlogEntity create(BlogEntity blogToBeCreated) {
        List<Long> galleryImagesIds = blogToBeCreated.getGalleryImages().stream()
                .map(ImageEntity::getId).collect(Collectors.toList());
        blogToBeCreated.setGalleryImages(List.of());
        BlogEntity existingBlog = blogRepository.save(blogToBeCreated);
        List<ImageEntity> images = new LinkedList<>();
        galleryImagesIds
                .forEach(id -> {
                    ImageEntity img = imageService.getById(id);
                    img.setBlogId(existingBlog.getId());
                    imageService.update(img);
                    images.add(img);
                });

        existingBlog.setGalleryImages(images);
        return existingBlog;
    }

    public BlogEntity update(BlogEntity blogToBeUpdated, Long id) {
        assert(id.equals(blogToBeUpdated.getId()));

        BlogEntity existingBlog = getById(id);
        updateGalleryImagesOfBlogEntry(blogToBeUpdated, existingBlog);
        updateParagraphsOfBlogEntry(blogToBeUpdated, existingBlog);
        existingBlog.setTitle(blogToBeUpdated.getTitle());
        existingBlog.setTitlePictureId(blogToBeUpdated.getTitlePictureId());
        existingBlog.setCategory(blogToBeUpdated.getCategory());
        return blogRepository.save(existingBlog);
    }

    private void updateGalleryImagesOfBlogEntry(BlogEntity blogToBeUpdated, BlogEntity existingBlog) {
        // Remove deleted images
        List<ImageEntity> removedGalleryImages = existingBlog.getGalleryImages().stream()
                .filter(existingGalleryImages -> blogToBeUpdated.getGalleryImages().stream().noneMatch(galleryImages -> existingGalleryImages.getId().equals(galleryImages.getId())))
                .collect(Collectors.toList());
        existingBlog.getGalleryImages().removeAll(removedGalleryImages);

        // Add new images
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

    private void updateParagraphsOfBlogEntry(BlogEntity blogToBeUpdated, BlogEntity existingBlog) {
        // Update existing paragraphs
        existingBlog.getParagraphEntities().forEach(existingParagraph ->
                blogToBeUpdated.getParagraphEntities().stream()
                        .filter(paragraph -> existingParagraph.getId().equals(paragraph.getId()))
                        .forEach(paragraph -> {
                            existingParagraph.setTitle(paragraph.getTitle());
                            existingParagraph.setImageId(paragraph.getImageId());
                            existingParagraph.setText(paragraph.getText());
                        })
        );

        // Remove deleted paragraphs
        List<ParagraphEntity> removedParagraphs = existingBlog.getParagraphEntities().stream()
                .filter(existingParagraphs -> blogToBeUpdated.getParagraphEntities().stream().noneMatch(paragraphs -> existingParagraphs.getId().equals(paragraphs.getId())))
                .collect(Collectors.toList());
        existingBlog.getParagraphEntities().removeAll(removedParagraphs);

        // Add new paragraphs
        blogToBeUpdated.getParagraphEntities().stream()
                .filter(paragraph -> paragraph.getId() == null)
                .forEach(paragraph -> existingBlog.getParagraphEntities().add(paragraph));
    }


    public void delete(Long id) {
        blogRepository.deleteById(id);
    }
}
