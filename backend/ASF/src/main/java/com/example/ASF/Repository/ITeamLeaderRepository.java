package com.example.ASF.Repository;

import com.example.ASF.Model.TeamLeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITeamLeaderRepository extends JpaRepository<TeamLeader, Long> {
}
