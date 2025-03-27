package com.example.demo.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Announcement {
    private String id;
    private String announcement_title;
    private String announcement_description;
    private String announcement_date;
    private String announcement_time;
    private String staff_email;
}