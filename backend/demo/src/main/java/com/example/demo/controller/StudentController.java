package com.example.demo.controller;

import com.example.demo.dao.Student;
import com.example.demo.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/students")
@AllArgsConstructor
public class StudentController {


    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    //@PathVariable("id") refer to {id}
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable("id") String id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }


    //@RequestBody - to convert json message into User data type
    //ResponseEntity<String> - return a response in a form of String
    @PostMapping()
    public ResponseEntity<String> createStudent(@RequestBody Student student) {
        //Returns a success response (HTTP 200 OK)
        return ResponseEntity.ok(studentService.createStudent(student));
        //1️⃣ new User(id, "John Doe") creates a Java object.
        //2️⃣ Spring Boot automatically converts this object into JSON using Jackson (a built-in JSON library).
        //3️⃣ The ResponseEntity.ok(...) wraps the object into an HTTP response.
        //4️⃣ The client (like a web browser or Postman) receives a JSON response.
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<String> updateStudent(@PathVariable("id") String id ,@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(studentService.updateStudent(id, updates));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") String id){
        return ResponseEntity.ok(studentService.deleteStudent(id));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getStudentCount() {
        long count = studentService.getCollectionCount("student");
        return ResponseEntity.ok(count);
    }



}
