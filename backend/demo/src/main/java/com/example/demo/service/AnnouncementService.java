package com.example.demo.service;

import com.example.demo.dao.Announcement;
import com.example.demo.dao.Student;
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
public class AnnouncementService {

    private final Firestore db;


    //CREATE
    public String createAnnouncement(Announcement announcement) {
        try {

            ApiFuture<DocumentReference> addedDocRef = db.collection("announcement").add(announcement);

            String documentId = addedDocRef.get().getId();

            announcement.setId(documentId);

            db.collection("announcement").document(documentId).set(announcement);

            return "Write result: " + documentId;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // READ
    public Announcement getAnnouncement(String id) {
        try {
            DocumentReference docRef = db.collection("announcement").document(id);

            //ApiFuture<DocumentSnapshot> → Represents the pending result of the Firestore query.
            //docRef.get() → Asynchronously fetches the document.
            ApiFuture<DocumentSnapshot> future = docRef.get();

            //future.get() blocks on response
            DocumentSnapshot document = future.get();

            Announcement announcement = null;

            if (document.exists()) {
                announcement = document.toObject(Announcement.class);
            } else {
                System.out.println("No such document!");
            }

            return announcement;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<Announcement> getAllAnnouncements() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("announcement").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Announcement> announcements = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                announcements.add(document.toObject(Announcement.class));
            }

            return announcements;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
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

