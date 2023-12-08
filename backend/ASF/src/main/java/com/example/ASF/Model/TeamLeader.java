package com.example.ASF.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "TeamLeader")
public class TeamLeader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "picture")
    private String picture;

    @Column(name = "description")
    private String description;



    public TeamLeader(Long id, String name, String picture, String description) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.description = description;
    }

    public TeamLeader(String name, String picture, String description) {
        this.name = name;
        this.picture = picture;
        this.description = description;
    }


    public TeamLeader(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public TeamLeader() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

}
