package com.example.demo.controller;

import com.example.demo.dao.Bus;
import com.example.demo.dao.BusLocation;
import com.example.demo.service.BusLocationService;
import com.example.demo.service.BusService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/busLocations")
@AllArgsConstructor
public class BusLocationController {
    private final BusLocationService busLocationService;

    @GetMapping
    public ResponseEntity<List<BusLocation>> getAllBusLocations() {
        return ResponseEntity.ok(busLocationService.getAllBuseLocations());
    }
}
