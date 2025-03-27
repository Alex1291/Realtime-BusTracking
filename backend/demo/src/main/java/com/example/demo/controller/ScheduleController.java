package com.example.demo.controller;


import com.example.demo.dao.Schedule;
import com.example.demo.service.ScheduleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/schedules")
@AllArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    //@PathVariable("id") refer to {id}
    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getSchedule(@PathVariable("id") String id) {
        return ResponseEntity.ok(scheduleService.getSchedule(id));
    }


    //@RequestBody - to convert json message into User data type
    //ResponseEntity<String> - return a response in a form of String
    @PostMapping()
    public ResponseEntity<String> createSchedule(@RequestBody Schedule schedule) {
        //Returns a success response (HTTP 200 OK)
        return ResponseEntity.ok(scheduleService.createSchedule(schedule));
        //1️⃣ new User(id, "John Doe") creates a Java object.
        //2️⃣ Spring Boot automatically converts this object into JSON using Jackson (a built-in JSON library).
        //3️⃣ The ResponseEntity.ok(...) wraps the object into an HTTP response.
        //4️⃣ The client (like a web browser or Postman) receives a JSON response.
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<String> updateSchedule(@PathVariable("id") String id ,@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(scheduleService.updateSchedule(id, updates));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSchedule(@PathVariable("id") String id){
        return ResponseEntity.ok(scheduleService.deleteSchedule(id));
    }

}
