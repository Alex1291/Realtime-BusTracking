package com.example.demo.controller;

import com.example.demo.dao.Driver;
import com.example.demo.dao.Staff;
import com.example.demo.service.DriverService;
import com.example.demo.service.StaffService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/drivers")
@AllArgsConstructor
public class DriverController {


    private final DriverService driverService;

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriver(@PathVariable("id") String id) {
        return ResponseEntity.ok(driverService.getDriver(id));
    }


    @PostMapping()
    public ResponseEntity<String> createDriver(@RequestBody Driver driver) {

        return ResponseEntity.ok(driverService.createDriver(driver));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<String> updateDriver(@PathVariable("id") String id ,@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(driverService.updateDriver(id, updates));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDriver(@PathVariable("id") String id){
        return ResponseEntity.ok(driverService.deleteDriver(id));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getDriverCount() {
        long count = driverService.getCollectionCount("driver");
        return ResponseEntity.ok(count);
    }


}
