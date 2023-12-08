package com.example.ASF.Controller;

import com.example.ASF.DTO.AddDepartmentDTO;
import com.example.ASF.DTO.EditDepartmentDTO;
import com.example.ASF.Model.Department;
import com.example.ASF.Model.TeamLeader;
import com.example.ASF.Service.DepartmentService;
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
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;
    private final FileService fileService;

    private final TeamLeaderService teamLeaderService;

    @Autowired
    public DepartmentController(DepartmentService departmentService, FileService fileService, TeamLeaderService teamLeaderService) {
        this.departmentService = departmentService;
        this.fileService = fileService;
        this.teamLeaderService = teamLeaderService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentService.getDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Optional<Department> department = departmentService.getDepartment(id);
        return department.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Department> uploadWithDetails(@ModelAttribute AddDepartmentDTO department) {
        // Handle the received data here, such as saving the image and department details
        MultipartFile file = department.getFile();
        System.out.println(department.getTeamLeaderId());

        // Save the image (file) to a directory using FileService
        if (!file.isEmpty()) {
            try {
                String filePath = fileService.saveFile(file);
                Optional<TeamLeader> teamLeader = this.teamLeaderService.getTeamLeader(department.getTeamLeaderId());
                Department createDepartment;
                if(teamLeader.isPresent()) {
                    createDepartment = new Department(department.getName(), filePath, department.getDescription(), teamLeader.get());
                }
                else{
                    createDepartment = new Department(department.getName(), filePath, department.getDescription(), null);
                }
                Department addedDepartment = this.departmentService.addDepartment(createDepartment);

                // Return the response
                return ResponseEntity.ok(addedDepartment);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping(path = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<Department> updateWithDetails(@PathVariable Long id, @ModelAttribute EditDepartmentDTO department) {
        System.out.println(id);
        if(Objects.equals(department.getFile().getOriginalFilename(), "empty-file.txt")){ // that means the image doesn't have to be updated
            Optional<TeamLeader> teamLeader = this.teamLeaderService.getTeamLeader(department.getTeamLeaderId());
            Department updateDepartment;
            if(teamLeader.isPresent()) {
                updateDepartment = new Department(department.getName(), department.getPicture(), department.getDescription(), teamLeader.get());
            }
            else{
                updateDepartment = new Department(department.getName(), department.getPicture(), department.getDescription(), null);
            }
            Department updatedDepartment = departmentService.updateDepartment(id, updateDepartment);
            if (updatedDepartment != null) {
                return ResponseEntity.ok(updatedDepartment);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
        // Save the image (file) to a directory using FileService
        else{
            try {
                MultipartFile file = department.getFile();
                String filePath = fileService.saveFile(file);
                Optional<TeamLeader> teamLeader = this.teamLeaderService.getTeamLeader(department.getTeamLeaderId());
                Department updateDepartment;
                if(teamLeader.isPresent()) {
                    updateDepartment = new Department(department.getName(), filePath, department.getDescription(), teamLeader.get());
                }
                else{
                    updateDepartment = new Department(department.getName(), filePath, department.getDescription(), null);
                }
                Department updatedDepartment = departmentService.updateDepartment(id, updateDepartment);
                if (updatedDepartment != null) {
                    return ResponseEntity.ok(updatedDepartment);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        System.out.println("HI there");
        boolean deleted = departmentService.deleteDepartment(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
