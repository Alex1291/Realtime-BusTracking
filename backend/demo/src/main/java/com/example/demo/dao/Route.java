package com.example.demo.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class Route {
    private String id;
    private String route_name;
    private String route_duration;
    private String routeTotalDistance;
    private List<BusStop> route_stops;
}
