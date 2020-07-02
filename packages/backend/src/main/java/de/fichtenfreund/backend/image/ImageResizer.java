package de.fichtenfreund.backend.image;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ImageResizer {

    public static final int SMALL_WIDTH = 500;
    public static final int MEDIUM_WIDTH = 1500;
    public static final int LARGE_WIDTH = 2500;

    public static byte[] toSize(byte[] inputImageAsByteArray, int width) {
        BufferedImage inputImage = createImageFromBytes(inputImageAsByteArray);

        if (inputImage.getWidth() > width) {
            double factor = (double) width / (double) inputImage.getWidth();
            int scaledHeight = (int) (inputImage.getHeight() * factor);
            try {
                return resize(inputImage, width, scaledHeight);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        } else {
            return inputImageAsByteArray;
        }
    }

    private static byte[] resize(BufferedImage inputImage,
                              int scaledWidth, int scaledHeight)
            throws IOException {
        // creates output image
        BufferedImage outputImage = new BufferedImage(scaledWidth,
                scaledHeight, inputImage.getType());

        // scales the input image to the output image
        Graphics2D g2d = outputImage.createGraphics();
        g2d.drawImage(inputImage, 0, 0, scaledWidth, scaledHeight, null);
        g2d.dispose();

        // writes to byte array
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, "jpg", bos );
        return bos.toByteArray();
    }

    private static BufferedImage createImageFromBytes(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
