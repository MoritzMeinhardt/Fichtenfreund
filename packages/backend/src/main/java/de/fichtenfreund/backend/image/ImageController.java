package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
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
    public Long create(@RequestParam("file-to-upload") MultipartFile file) {
        return imageService.create(convertToEntity(file));
    }

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getById(@PathVariable("id") Long id, @RequestParam("size") Optional<String> size) {
        String selectedSize = size.orElse("medium");

        switch (selectedSize){
            case "small":
                return imageService.getById(id).getSmallImage();
            case "medium":
                return imageService.getById(id).getMediumImage();
            case "large":
                return imageService.getById(id).getLargeImage();
            default:
                throw new IllegalArgumentException("The size " + selectedSize + " is not allowed. Use small, medium or large.");
        }
    }

    private ImageEntity convertToEntity(MultipartFile file) {
        try {
            return ImageEntity.builder()
                    .title(file.getName())
                    .altText("placeholder")
                    .rawImage(file.getBytes())
                    .build();
        } catch (IOException e) {
           throw new RuntimeException(e);
        }
    }
}
