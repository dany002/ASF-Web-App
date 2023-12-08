package com.example.ASF.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    private final String uploadsDir = "/home/senzationall/Desktop/ASF-Web-App/resources/test"; // TODO put in env

    public String saveFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";

        if (originalFilename != null && !originalFilename.isEmpty()) {
            int lastDotIndex = originalFilename.lastIndexOf('.');
            if (lastDotIndex > 0) {
                fileExtension = originalFilename.substring(lastDotIndex + 1);
            }
        }

        // Generate a unique name for the file
        String uniqueFileName = generateUniqueFileName() + "." + fileExtension;

        String filePath = uploadsDir + File.separator + uniqueFileName;

        byte[] bytes = file.getBytes();
        Path path = Paths.get(filePath);
        Files.write(path, bytes);

        return uniqueFileName;
    }

    private String generateUniqueFileName() {
        // Logic to generate a unique filename, you can use UUID or timestamp, for example
        return UUID.randomUUID().toString(); // Using UUID for uniqueness
    }


}

