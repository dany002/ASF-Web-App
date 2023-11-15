package com.example.ASF.Service;


import com.example.ASF.Model.News;
import com.example.ASF.Repository.INewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private INewsRepository newsRepository;

    public NewsService(INewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<News> getNews(){
        return this.newsRepository.findAll();
    }

    public Optional<News> getNewsById(Long id){
        return this.newsRepository.findById(id);
    }

    public News addNews(News news){
        return this.newsRepository.save(news);
    }

    public News updateNews(Long id, News news){
        Optional<News> newsFromRepo = this.newsRepository.findById(id);
        if (newsFromRepo.isPresent()){
            newsFromRepo.get().setDescription(news.getDescription());
            newsFromRepo.get().setDate(news.getDate());
            newsFromRepo.get().setTitle(news.getTitle());
            return this.newsRepository.save(newsFromRepo.get());
        }
        return null;
    }

    public boolean deleteNews(Long id){
        Optional<News> news = this.newsRepository.findById(id);
        if (news.isPresent()){
            this.newsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
