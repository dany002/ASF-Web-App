package com.example.ASF.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "picture")
    private String picture;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "team_leader_id")
    private TeamLeader team_leader;

    public Department(Long id, String name, String picture, String description, TeamLeader team_leader) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.team_leader = team_leader;
    }

    public Department(String name, String picture, String description, TeamLeader team_leader) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.team_leader = team_leader;
    }

    public Department(String name, String description, TeamLeader team_leader) {
        this.name = name;
        this.description = description;
        this.team_leader = team_leader;
    }

    public Department(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Department() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TeamLeader getTeam_leader() {
        return team_leader;
    }

    public void setTeam_leader(TeamLeader team_leader) {
        this.team_leader = team_leader;
    }
}
