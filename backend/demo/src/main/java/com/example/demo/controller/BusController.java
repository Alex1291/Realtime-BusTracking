package com.example.demo.controller;

import com.example.demo.dao.Bus;
import com.example.demo.service.BusService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/buses")
@AllArgsConstructor
public class BusController {
    private final BusService busService;

    @GetMapping
    public ResponseEntity<List<Bus>> getAllDrivers() {
        return ResponseEntity.ok(busService.getAllBuses());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Bus> getBus(@PathVariable("id") String id) {
        return ResponseEntity.ok(busService.getBus(id));
    }


    @PostMapping()
    public ResponseEntity<String> createBus(@RequestBody Bus bus) {

        return ResponseEntity.ok(busService.createBus(bus));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<String> updateBus(@PathVariable("id") String id ,@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(busService.updateBus(id, updates));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable("id") String id){
        return ResponseEntity.ok(busService.deleteBus(id));
    }


    @GetMapping("/count")
    public ResponseEntity<Long> getBusCount() {
        long count = busService.getCollectionCount("bus");
        return ResponseEntity.ok(count);
    }

}
