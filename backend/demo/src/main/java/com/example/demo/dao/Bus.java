package com.example.demo.dao;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class Bus {
    private String id;
    private String bus_name;
    private String bus_capacity;
    private String bus_status;
}

