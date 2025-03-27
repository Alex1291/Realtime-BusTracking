package com.example.demo.service;

import com.example.demo.dao.Staff;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
@Slf4j //provide log function
public class StaffService {

    private final Firestore db;

    //CREATE
    public String createStaff(Staff staff) {
        try {
            staff.setId(staff.getStaff_email());

            ApiFuture<WriteResult> future = db.collection("staff")
                    .document(staff.getStaff_email())
                    .set(staff);

            WriteResult result = future.get();

            return "Write result: " + result;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // READ
    public Staff getStaff(String id) {
        try {
            DocumentReference docRef = db.collection("staff").document(id);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            Staff staff = null;

            if (document.exists()) {
                staff = document.toObject(Staff.class);
            } else {
                System.out.println("No such document!");
            }

            return staff;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<Staff> getAllStaffs() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("staff").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Staff> staffs = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                staffs.add(document.toObject(Staff.class));
            }

            return staffs;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // UPDATE
    public String updateStaff(String staffId, Map<String, Object> updates) {

        try {
            DocumentReference docRef = db.collection("staff").document(staffId);


            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    //DELETE
    public String deleteStaff(String id) {
        try {
            ApiFuture<WriteResult> users = db.collection("staff").document(id).delete();

            return "Staff deleted at : " + users.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }


}

