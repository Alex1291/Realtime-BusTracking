package com.example.demo.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Schedule {
    private String id;
    private String schedule_bus;
    private String schedule_driver;
    private String schedule_name;
    private String schedule_route;
    private String schedule_status;
    private String schedule_time;

    private String scheduleDurationStart;
    private String scheduleDurationEnd;
    private String schedule_days;

    private String scheduleRepeat;;
}
