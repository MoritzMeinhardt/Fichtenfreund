package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/file-upload") // TODO rename to images
@CrossOrigin
@AllArgsConstructor
public class ImageController {

    private ImageService imageService;

    @Secured("ADMIN")
    @PostMapping
    public Long create(@RequestParam("file-to-upload") MultipartFile file) throws IOException {
        return imageService.create(convertToEntity(file), file.getBytes());
    }

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getById(@PathVariable("id") Long id, @RequestParam("size") Optional<String> size) {
        String selectedSize = size.orElse("medium");

        switch (selectedSize){
            case "small":
                return imageService.getSmallImage(id).getSmallImage();
            case "medium":
                return imageService.getMediumImage(id).getMediumImage();
            case "large":
                return imageService.getLargeImage(id).getLargeImage();
            default:
                throw new IllegalArgumentException("The size " + selectedSize + " is not allowed. Use small, medium or large.");
        }
    }

    @GetMapping("merge")
    public Page<ImageEntity> mergeImageToBytea(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return imageService.merge(PageRequest.of(page, 10));
    }

    private ImageEntity convertToEntity(MultipartFile file) {
        return ImageEntity.builder()
                .title(file.getName())
                .altText("placeholder")
                .build();
    }
}
