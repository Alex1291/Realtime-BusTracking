package com.example.demo.service;


import com.example.demo.dao.Bus;
import com.example.demo.dao.BusLocation;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
@Slf4j
public class BusLocationService {
    private final Firestore db;

    public List<BusLocation> getAllBuseLocations() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("bus_locations").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<BusLocation> bus_locations = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                bus_locations.add(document.toObject(BusLocation.class));
            }

            return bus_locations;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
