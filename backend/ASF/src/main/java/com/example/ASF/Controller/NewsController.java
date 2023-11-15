package com.example.ASF.Controller;

import com.example.ASF.Model.News;
import com.example.ASF.Service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        List<News> newsList = newsService.getNews();
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        Optional<News> news = newsService.getNewsById(id);
        return news.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<News> addNews(@RequestBody News news) {
        News newNews = newsService.addNews(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(newNews);
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(
            @PathVariable Long id,
            @RequestBody News news) {
        News updatedNews = newsService.updateNews(id, news);
        if (updatedNews != null) {
            return ResponseEntity.ok(updatedNews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        boolean deleted = newsService.deleteNews(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
