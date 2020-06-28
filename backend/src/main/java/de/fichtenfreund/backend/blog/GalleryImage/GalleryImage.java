package de.fichtenfreund.backend.blog.GalleryImage;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class GalleryImage {
    String url;
    String caption;
    String description;
    ZonedDateTime zonedDateTime; // legacy TODO was called date
}
