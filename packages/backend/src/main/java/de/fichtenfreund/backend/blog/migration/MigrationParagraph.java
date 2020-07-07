package de.fichtenfreund.backend.blog.migration;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MigrationParagraph {
    private Long id;

    private Long blogId;

    @JsonProperty("paragraphPic")
    private String imageId;

    @JsonProperty("paragraphTitle")
    private String title;

    @JsonProperty("paragraphText")
    private String text;

}
