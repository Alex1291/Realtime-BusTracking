package com.example.demo.service;


import com.example.demo.dao.Bus;
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


//Since @AllArgsConstructor only create 1 contructor, then spring will auto inject. No need autowired
// @Autowired only need to use when there is more than 1 contructor. To inform spring  injecting dependencies directly to which constructor
@Service
@AllArgsConstructor
@Slf4j
public class BusService {
    private final Firestore db;

    //CREATE
    public String createBus(Bus bus) {
        try {
            ApiFuture<DocumentReference> addedDocRef = db.collection("bus").add(bus);

            String documentId = addedDocRef.get().getId();

            bus.setId(documentId);

            db.collection("bus").document(documentId).set(bus);

            return "Write result: " + documentId;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // READ
    public Bus getBus(String id) {
        try {
            DocumentReference docRef = db.collection("bus").document(id);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            Bus bus = null;

            if (document.exists()) {
                bus = document.toObject(Bus.class);
            } else {
                System.out.println("No such document!");
            }

            return bus;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<Bus> getAllBuses() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("bus").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Bus> buses = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                buses.add(document.toObject(Bus.class));
            }

            return buses;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // UPDATE
    public String updateBus(String busId, Map<String, Object> updates) {

        try {
            DocumentReference docRef = db.collection("bus").document(busId);


            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    //DELETE
    public String deleteBus(String id) {
        try {
            ApiFuture<WriteResult> users = db.collection("bus").document(id).delete();

            return "Bus deleted at : " + users.get().getUpdateTime();
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
