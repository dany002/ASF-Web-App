package com.example.ASF.Service;

import com.example.ASF.Model.Project;
import com.example.ASF.Repository.IProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    IProjectRepository projectRepository;

    public ProjectService(IProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getProjects(){
        return this.projectRepository.findAll();
    }

    public Optional<Project> getProject(Long id){
        return this.projectRepository.findById(id);
    }

    public Project addProject(Project project){
        return this.projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project){
        Optional<Project> projectFromRepo = this.projectRepository.findById(id);
        if (projectFromRepo.isPresent()){
            projectFromRepo.get().setDescription(project.getDescription());
            projectFromRepo.get().setPicture(project.getPicture());
            projectFromRepo.get().setTitle(project.getTitle());
            return this.projectRepository.save(projectFromRepo.get());
        }
        return null;
    }

    public boolean deleteProject(Long id){
        Optional<Project> project = this.projectRepository.findById(id);
        if (project.isPresent()){
            this.projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
