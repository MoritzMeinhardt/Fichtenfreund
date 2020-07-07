package de.fichtenfreund.backend.blog.migration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.fichtenfreund.backend.blog.BlogController;
import de.fichtenfreund.backend.blog.model.BlogDTO;
import de.fichtenfreund.backend.blog.paragraph.ParagraphEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api")
@AllArgsConstructor
@CrossOrigin
public class MigrationController {

    private BlogController blogController;

    @Secured("ADMIN")
    @GetMapping("/migration")
    public String migrate() throws JsonProcessingException, FileNotFoundException {
        ObjectMapper objectMapper = new ObjectMapper();

        Scanner scanner = new Scanner(new File("blogs.json"));
        while (scanner.hasNextLine()) {
            String jsonLine = scanner.nextLine();
            System.out.println(jsonLine);
            MigrationObject blog = objectMapper.readValue(jsonLine, MigrationObject.class);
            blogController.createBlog(convertMigrationToDTO(blog));
        }

        return "migrated";
    }

    private BlogDTO convertMigrationToDTO(MigrationObject migrationObject) {
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setCategory("Norwegen");
        blogDTO.setCommentEntities(migrationObject.getCommentEntities());
        blogDTO.setParagraphEntities(migrationObject.getParagraphEntities().stream().map(this::convertParagraph).collect(Collectors.toList()));
        blogDTO.setTitle(migrationObject.getTitle());
        blogDTO.setGalleryImages(List.of());
        return blogDTO;
    }

    private ParagraphEntity convertParagraph(MigrationParagraph migrationParagraph) {
        ParagraphEntity paragraphEntity = new ParagraphEntity();
        paragraphEntity.setText(migrationParagraph.getText());
        paragraphEntity.setTitle(migrationParagraph.getTitle());
        return paragraphEntity;
    }
}
