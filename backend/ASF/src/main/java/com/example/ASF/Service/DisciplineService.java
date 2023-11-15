package com.example.ASF.Service;

import com.example.ASF.Model.Discipline;
import com.example.ASF.Repository.IDisciplineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplineService {

    @Autowired
    private IDisciplineRepository disciplineRepository;

    public DisciplineService(IDisciplineRepository disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }

    public List<Discipline> getDisciplines(){
        return this.disciplineRepository.findAll();
    }

    public Optional<Discipline> getDiscipline(Long id){
        return this.disciplineRepository.findById(id);
    }

    public Discipline addDiscipline(Discipline discipline){
        return this.disciplineRepository.save(discipline);
    }

    public Discipline updateDiscipline(Long id, Discipline discipline){
        Optional<Discipline> disciplineFromRepo = this.disciplineRepository.findById(id);
        if(disciplineFromRepo.isPresent()){
            disciplineFromRepo.get().setName(discipline.getName());
            disciplineFromRepo.get().setCategory(discipline.getCategory());
            disciplineFromRepo.get().setLink(discipline.getLink());
            return this.disciplineRepository.save(disciplineFromRepo.get());
        }
        return null;
    }

    public boolean deleteDiscipline(Long id){
        Optional<Discipline> discipline = this.disciplineRepository.findById(id);
        if(discipline.isPresent()){
            this.disciplineRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
