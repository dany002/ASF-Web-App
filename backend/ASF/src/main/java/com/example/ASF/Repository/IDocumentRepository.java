package com.example.ASF.Repository;

import com.example.ASF.Model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IDocumentRepository extends JpaRepository<Document, Long> {
}
