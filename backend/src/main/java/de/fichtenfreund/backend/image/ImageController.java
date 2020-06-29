package de.fichtenfreund.backend.image;

import de.fichtenfreund.backend.image.model.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/file-upload") // TODO rename to images
@CrossOrigin
@AllArgsConstructor
public class ImageController {

    private ImageService imageService;

    @PostMapping
    public Long create(@RequestParam("file-to-upload") MultipartFile file) {
        return imageService.create(convertToEntity(file));
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
