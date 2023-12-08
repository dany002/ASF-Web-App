package com.example.ASF.DTO;

import org.springframework.web.multipart.MultipartFile;

public class AddDepartmentDTO {
    private String name;
    private String description;

    private MultipartFile file;

    private Long teamLeaderId;

    public AddDepartmentDTO(String name, String description, MultipartFile multipartFile, Long teamLeaderId) {
        this.name = name;
        this.description = description;
        this.file = multipartFile;
        this.teamLeaderId = teamLeaderId;
    }

    public Long getTeamLeaderId() {
        return teamLeaderId;
    }

    public void setTeamLeaderId(Long teamLeaderId) {
        this.teamLeaderId = teamLeaderId;
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
}
