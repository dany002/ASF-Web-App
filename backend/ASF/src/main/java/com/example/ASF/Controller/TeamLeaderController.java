package com.example.ASF.Controller;

import com.example.ASF.Model.TeamLeader;
import com.example.ASF.Service.TeamLeaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/team-leaders")
public class TeamLeaderController {

    private final TeamLeaderService teamLeaderService;

    @Autowired
    public TeamLeaderController(TeamLeaderService teamLeaderService) {
        this.teamLeaderService = teamLeaderService;
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

    @PostMapping
    public ResponseEntity<TeamLeader> addTeamLeader(@RequestBody TeamLeader teamLeader) {
        TeamLeader newTeamLeader = teamLeaderService.addTeamLeader(teamLeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTeamLeader);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamLeader> updateTeamLeader(
            @PathVariable Long id,
            @RequestBody TeamLeader teamLeader) {
        TeamLeader updatedTeamLeader = teamLeaderService.updateTeamLeader(id, teamLeader);
        if (updatedTeamLeader != null) {
            return ResponseEntity.ok(updatedTeamLeader);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeamLeader(@PathVariable Long id) {
        boolean deleted = teamLeaderService.deleteTeamLeader(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
