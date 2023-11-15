package com.example.ASF.Service;

import com.example.ASF.Model.Document;
import com.example.ASF.Repository.IDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private IDocumentRepository documentRepository;

    public DocumentService(IDocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getDocuments(){
        return this.documentRepository.findAll();
    }

    public Optional<Document> getDocument(Long id){
        return this.documentRepository.findById(id);
    }

    public Document addDocument(Document document){
        return this.documentRepository.save(document);
    }

    public Document updateDocument(Long id, Document document){
        Optional<Document> documentFromRepo = this.documentRepository.findById(id);
        if (documentFromRepo.isPresent()){
            documentFromRepo.get().setResource(document.getResource());
            documentFromRepo.get().setTitle(document.getTitle());
            return this.documentRepository.save(documentFromRepo.get());
        }
        return null;
    }

    public boolean deleteDocument(Long id){
        Optional<Document> document = this.documentRepository.findById(id);
        if (document.isPresent()){
            this.documentRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
