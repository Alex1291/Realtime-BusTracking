package com.example.demo.controller;

import com.example.demo.dao.BusStop;
import com.example.demo.dao.Route;
import com.example.demo.service.RouteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/v1/routes") // note
@AllArgsConstructor
public class RouteController {
    private final RouteService routeService;


    @GetMapping
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(routeService.getAllRoutes());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable("id") String id) {
        return ResponseEntity.ok(routeService.getRoute(id));
    }

    @PostMapping()
    public ResponseEntity<String> createRoute(@RequestBody Route route){
        return ResponseEntity.ok(routeService.createRoute(route));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoute(@PathVariable String id) {
        try {
            return ResponseEntity.ok( routeService.deleteRoute(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @PutMapping("/{id}/edit")
    public ResponseEntity<String> updateRoute(@PathVariable("id") String id ,@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(routeService.updateRoute(id, updates));
    }


    @PutMapping("/{routeId}/addBusStops")
    public ResponseEntity<String> addBusStops(
            @PathVariable String routeId,
            @RequestBody Map<String, Object> requestBody) {

        List<BusStop> busStops = (List<BusStop>) requestBody.get("busStops"); // Extract bus stops
        double routeDistance = (double) requestBody.get("totalDistance"); // Extract totalDistance

        String formatted = String.format("%.2f", routeDistance);



        return ResponseEntity.ok(routeService.addBusStops(routeId, busStops, formatted));
    }



}
