package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/file-upload") // TODO rename to images
@CrossOrigin
@AllArgsConstructor
public class ImageController {

    final Long ABOUT_US_IMAGE_ID = 1000L;

    private ImageService imageService;

    @Secured("ADMIN")
    @PostMapping
    public Long create(@RequestParam("file-to-upload") MultipartFile file) {
        return imageService.create(convertToEntity(file));
    }

    @GetMapping("/title")
    public byte[] getTitleImage() {
        return imageService.getTitleImage().getImage();
    }

    @GetMapping("/aboutUs")
    public byte[] getAboutUsImage() {
        return imageService.getById(ABOUT_US_IMAGE_ID).getImage();
    }

    @GetMapping("/{id}")
    public byte[] getById(@PathVariable("id") Long id) {
        return imageService.getById(id).getImage();
    }

    private ImageEntity convertToEntity(MultipartFile file) {
        try {
            return ImageEntity.builder()
                    .title(file.getName())
                    .altText("placeholder")
                    .isTitle(false)
                    .isMeta(false)
                    .image(file.getBytes())
                    .build();
        } catch (IOException e) {
           throw new RuntimeException(e);
        }
    }
}
