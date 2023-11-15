package com.example.ASF.Service;


import com.example.ASF.Model.TeamLeader;
import com.example.ASF.Repository.ITeamLeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamLeaderService {

    @Autowired
    private ITeamLeaderRepository teamLeaderRepository;

    public TeamLeaderService(ITeamLeaderRepository teamLeaderRepository) {
        this.teamLeaderRepository = teamLeaderRepository;
    }

    public List<TeamLeader> getTeamLeaders(){
        return this.teamLeaderRepository.findAll();
    }

    public Optional<TeamLeader> getTeamLeader(Long id){
        return this.teamLeaderRepository.findById(id);
    }

    public TeamLeader addTeamLeader(TeamLeader teamLeader){
        return this.teamLeaderRepository.save(teamLeader);
    }

    public TeamLeader updateTeamLeader(Long id, TeamLeader teamLeader){
        Optional<TeamLeader> teamLeaderFromRepo = this.teamLeaderRepository.findById(id);
        if (teamLeaderFromRepo.isPresent()){
            teamLeaderFromRepo.get().setName(teamLeader.getName());
            teamLeaderFromRepo.get().setPicture(teamLeader.getPicture());
            teamLeaderFromRepo.get().setDepartment(teamLeader.getDepartment());
            return this.teamLeaderRepository.save(teamLeaderFromRepo.get());
        }
        return null;
    }

    public boolean deleteTeamLeader(Long id){
        Optional<TeamLeader> teamLeader = this.teamLeaderRepository.findById(id);
        if (teamLeader.isPresent()){
            this.teamLeaderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
