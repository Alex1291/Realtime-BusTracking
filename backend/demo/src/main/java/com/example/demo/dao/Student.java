package com.example.demo.dao;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Student {

    private String id;
    private String student_email;
    private String student_name;
    private String student_password;
    private String student_phone;
    private String student_dob;
    private String student_address;
    private String student_account_status;
}
