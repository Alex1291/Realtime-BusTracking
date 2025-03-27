package com.example.demo.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BusStop {
    private String stopName;
    private double lat;
    private double lng;
}
