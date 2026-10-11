package com.carparts.service;


import com.carparts.exception.BadRequestException;
import io.jsonwebtoken.io.IOException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadDir = Paths.get("upload");


    public FileStorageService(){
        try{
            if(!Files.exists(uploadDir)){
                Files.createDirectories(uploadDir);
            }

        } catch (java.io.IOException e) {
            throw new RuntimeException("ould ot initialize storage folder!", e);
        }
    }

    public String  saveFile(MultipartFile file){
        if(file.isEmpty()){
            throw new BadRequestException("Upload file is empty!");
        }

        try{
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if(originalFilename != null && originalFilename.contains(".")){
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path targetLocation = this.uploadDir.resolve(uniqueFileName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + uniqueFileName;
        } catch (java.io.IOException e) {
            throw new RuntimeException("Could not save image file: " + e.getMessage());
        }
    }
}
