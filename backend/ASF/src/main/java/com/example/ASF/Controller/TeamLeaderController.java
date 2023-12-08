package com.example.ASF.Controller;

import com.example.ASF.DTO.AddTeamLeaderDTO;
import com.example.ASF.DTO.EditTeamLeaderDTO;
import com.example.ASF.Model.Department;
import com.example.ASF.Model.TeamLeader;
import com.example.ASF.Service.FileService;
import com.example.ASF.Service.TeamLeaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/team-leaders")
public class TeamLeaderController {

    private final TeamLeaderService teamLeaderService;

    private final FileService fileService;

    @Autowired
    public TeamLeaderController(TeamLeaderService teamLeaderService, FileService fileService) {
        this.teamLeaderService = teamLeaderService;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<TeamLeader>> getAllTeamLeaders() {
        List<TeamLeader> teamLeaders = teamLeaderService.getTeamLeaders();
        return ResponseEntity.ok(teamLeaders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamLeader> getTeamLeaderById(@PathVariable Long id) {
        Optional<TeamLeader> teamLeader = teamLeaderService.getTeamLeader(id);
        return teamLeader.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<TeamLeader> uploadWithDetails(@ModelAttribute AddTeamLeaderDTO teamLeaderDTO) {
        // Handle the received data here, such as saving the image and department details
        MultipartFile file = teamLeaderDTO.getFile();

        // Save the image (file) to a directory using FileService
        if (!file.isEmpty()) {
            try {
                String filePath = fileService.saveFile(file);
                TeamLeader createTeamLeader = new TeamLeader(teamLeaderDTO.getName(), filePath, teamLeaderDTO.getDescription());
                TeamLeader addedTeamLeader = this.teamLeaderService.addTeamLeader(createTeamLeader);

                // Return the response
                return ResponseEntity.ok(addedTeamLeader);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping(path = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<TeamLeader> updateTeamLeader(
            @PathVariable Long id,
            @ModelAttribute EditTeamLeaderDTO teamLeader) {

        if (Objects.equals(teamLeader.getFile().getOriginalFilename(), "empty-file.txt")) { // that means the image doesn't have to be updated
            TeamLeader teamLeaderUpdate = new TeamLeader(teamLeader.getName(), teamLeader.getPicture(), teamLeader.getDescription());
            TeamLeader updatedTeamLeader = teamLeaderService.updateTeamLeader(id, teamLeaderUpdate);
            if (updatedTeamLeader != null) {
                return ResponseEntity.ok(updatedTeamLeader);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            try {
                MultipartFile file = teamLeader.getFile();
                String filePath = fileService.saveFile(file);
                TeamLeader updateTeamLeader = new TeamLeader(teamLeader.getName(), filePath, teamLeader.getDescription());
                TeamLeader updatedTeamLeader = teamLeaderService.updateTeamLeader(id, updateTeamLeader);
                if (updatedTeamLeader != null) {
                    return ResponseEntity.ok(updatedTeamLeader);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeamLeader(@PathVariable Long id) {
        boolean deleted = teamLeaderService.deleteTeamLeader(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
