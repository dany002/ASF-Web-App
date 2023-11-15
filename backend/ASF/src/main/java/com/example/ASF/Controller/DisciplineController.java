package com.example.ASF.Controller;

import com.example.ASF.Model.Discipline;
import com.example.ASF.Service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/disciplines")
public class DisciplineController {

    private final DisciplineService disciplineService;

    @Autowired
    public DisciplineController(DisciplineService disciplineService) {
        this.disciplineService = disciplineService;
    }

    @GetMapping
    public ResponseEntity<List<Discipline>> getAllDisciplines() {
        List<Discipline> disciplines = disciplineService.getDisciplines();
        return ResponseEntity.ok(disciplines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discipline> getDisciplineById(@PathVariable Long id) {
        Optional<Discipline> discipline = disciplineService.getDiscipline(id);
        return discipline.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Discipline> addDiscipline(@RequestBody Discipline discipline) {
        Discipline newDiscipline = disciplineService.addDiscipline(discipline);
        return ResponseEntity.status(HttpStatus.CREATED).body(newDiscipline);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Discipline> updateDiscipline(
            @PathVariable Long id,
            @RequestBody Discipline discipline) {
        Discipline updatedDiscipline = disciplineService.updateDiscipline(id, discipline);
        if (updatedDiscipline != null) {
            return ResponseEntity.ok(updatedDiscipline);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscipline(@PathVariable Long id) {
        boolean deleted = disciplineService.deleteDiscipline(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
