package com.example.demo.service;

import com.example.demo.dao.BusStop;
import com.example.demo.dao.Route;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
@Slf4j
public class RouteService {
    private final Firestore db;

    public List<Route> getAllRoutes() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("route").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Route> routes = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                routes.add(document.toObject(Route.class));
            }

            return routes;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public Route getRoute(String id) {
        try {
            DocumentReference docRef = db.collection("route").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            Route route = null;

            if (document.exists()) {
                route = document.toObject(Route.class);
            } else {
                System.out.println("No such document!");
            }

            return route;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }


    public String createRoute(Route route) {
        try {
            ApiFuture<DocumentReference> addedDocRef = db.collection("route").add(route);

            String documentId = addedDocRef.get().getId();

            route.setRoute_stops(new ArrayList<>());

            route.setRouteTotalDistance("0");

            route.setId(documentId);

            db.collection("route").document(documentId).set(route);

            return "Write result: " + documentId;


        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String deleteRoute(String id) {
        try {
            ApiFuture<WriteResult> users = db.collection("route").document(id).delete();

            return "Route deleted at : " + users.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }


    public String updateRoute(String id, Map<String, Object> updates) {
        try {
            DocumentReference docRef = db.collection("route").document(id);

            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    public String addBusStops(String routeId, List<BusStop> busStops, String routeDistance) {
        try {
            DocumentReference docRef = db.collection("route").document(routeId);

            Map<String, Object> updates = new HashMap<>();
            updates.put("route_stops", busStops);
            updates.put("routeTotalDistance", routeDistance);

            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

}
