package com.example.ASF.DTO;

import org.springframework.web.multipart.MultipartFile;

public class EditTeamLeaderDTO {
    private String name;
    private String description;
    private MultipartFile file;
    private String picture;

    public EditTeamLeaderDTO(String name, String description, MultipartFile file, String picture) {
        this.name = name;
        this.description = description;
        this.file = file;
        this.picture = picture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
