package com.example.ASF.Repository;

import com.example.ASF.Model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INewsRepository extends JpaRepository<News, Long> {
}
