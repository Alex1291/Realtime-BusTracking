package com.example.demo.dao;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Staff {

    private String id;
    private String staff_email;
    private String staff_name;
    private String staff_password;
    private String staff_isAdmin;
}
