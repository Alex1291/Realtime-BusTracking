package com.example.demo.controller;

import com.example.demo.dao.Staff;
import com.example.demo.service.StaffService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/staffs")
@AllArgsConstructor
public class StaffController {


    private final StaffService staffService;

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaffs() {
        return ResponseEntity.ok(staffService.getAllStaffs());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable("id") String id) {
        return ResponseEntity.ok(staffService.getStaff(id));
    }


    @PostMapping()
    public ResponseEntity<String> createStaff(@RequestBody Staff staff) {

        return ResponseEntity.ok(staffService.createStaff(staff));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<String> updateStaff(@PathVariable("id") String id ,@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(staffService.updateStaff(id, updates));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable("id") String id){
        return ResponseEntity.ok(staffService.deleteStaff(id));
    }



}
