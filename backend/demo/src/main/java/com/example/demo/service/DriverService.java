package com.example.demo.service;

import com.example.demo.dao.Driver;
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
@Slf4j
public class DriverService {
    private final Firestore db;

    //CREATE
    public String createDriver(Driver driver) {
        try {
            driver.setId(driver.getDriver_email());

            ApiFuture<WriteResult> future = db.collection("driver")
                    .document(driver.getDriver_email())
                    .set(driver);

            WriteResult result = future.get();

            return "Write result: " + result;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // READ
    public Driver getDriver(String id) {
        try {
            DocumentReference docRef = db.collection("driver").document(id);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            Driver driver = null;

            if (document.exists()) {
                driver = document.toObject(Driver.class);
            } else {
                System.out.println("No such document!");
            }

            return driver;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<Driver> getAllDrivers() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("driver").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Driver> drivers = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                drivers.add(document.toObject(Driver.class));
            }

            return drivers;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // UPDATE
    public String updateDriver(String driverId, Map<String, Object> updates) {

        try {
            DocumentReference docRef = db.collection("driver").document(driverId);


            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    //DELETE
    public String deleteDriver(String id) {
        try {
            ApiFuture<WriteResult> users = db.collection("driver").document(id).delete();

            return "Driver deleted at : " + users.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }


    public long getCollectionCount(String collectionName) {
        try {
            ApiFuture<QuerySnapshot> future = db.collection(collectionName).get();
            QuerySnapshot querySnapshot = future.get();
            return querySnapshot.size();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error retrieving collection count: " + e.getMessage(), e);
        }
    }

}
