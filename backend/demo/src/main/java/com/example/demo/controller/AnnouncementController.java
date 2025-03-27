package com.example.demo.controller;

import com.example.demo.dao.Announcement;
import com.example.demo.dao.Student;
import com.example.demo.service.AnnouncementService;
import com.example.demo.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/announcements")
@AllArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        return ResponseEntity.ok(announcementService.getAllAnnouncements());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getStudent(@PathVariable("id") String id) {
        return ResponseEntity.ok(announcementService.getAnnouncement(id));
    }


    @PostMapping()
    public ResponseEntity<String> createStudent(@RequestBody Announcement announcement) {

        return ResponseEntity.ok(announcementService.createAnnouncement(announcement));

    }


    @GetMapping("/count")
    public ResponseEntity<Long> getAnnouncementCount() {
        long count = announcementService.getCollectionCount("announcement");
        return ResponseEntity.ok(count);
    }


}
