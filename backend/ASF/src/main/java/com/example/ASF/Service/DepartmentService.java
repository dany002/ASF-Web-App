package com.example.ASF.Service;


import com.example.ASF.Model.Department;
import com.example.ASF.Repository.IDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private IDepartmentRepository departmentRepository;

    public DepartmentService(IDepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getDepartments(){
        return this.departmentRepository.findAll();
    }

    public Optional<Department> getDepartment(Long id){
        return this.departmentRepository.findById(id);
    }

    public Department addDepartment(Department department){
        return this.departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department department){
        Optional<Department> departmentFromRepo = this.departmentRepository.findById(id);
        if(departmentFromRepo.isPresent()){
            departmentFromRepo.get().setDescription(department.getDescription());
            departmentFromRepo.get().setName(department.getName());
            departmentFromRepo.get().setPicture(department.getPicture());
            departmentFromRepo.get().setTeam_leader(department.getTeam_leader());
            return this.departmentRepository.save(departmentFromRepo.get());
        }
        else
            return null;
    }

    public boolean deleteDepartment(Long id){
        Optional<Department> department = this.departmentRepository.findById(id);
        if(department.isPresent()){
            this.departmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
