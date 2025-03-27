package com.example.demo.service;

import com.example.demo.dao.Schedule;
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
public class ScheduleService {
    private final Firestore db;

    //CREATE
    public String createSchedule(Schedule schedule) {
        try {
            ApiFuture<DocumentReference> addedDocRef = db.collection("schedule").add(schedule);

            String documentId = addedDocRef.get().getId();

            schedule.setId(documentId);

            db.collection("schedule").document(documentId).set(schedule);

            return "Write result: " + documentId;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // READ
    public Schedule getSchedule(String id) {
        try {
            DocumentReference docRef = db.collection("schedule").document(id);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            Schedule schedule = null;

            if (document.exists()) {
                schedule = document.toObject(Schedule.class);
            } else {
                System.out.println("No such document!");
            }

            return schedule;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<Schedule> getAllSchedules() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("schedule").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Schedule> schedules = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                schedules.add(document.toObject(Schedule.class));
            }

            return schedules;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // UPDATE
    public String updateSchedule(String scheduleId, Map<String, Object> updates) {

        try {
            DocumentReference docRef = db.collection("schedule").document(scheduleId);


            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    //DELETE
    public String deleteSchedule(String id) {
        try {
            ApiFuture<WriteResult> schedule = db.collection("schedule").document(id).delete();

            return "Schedule deleted at : " + schedule.get().getUpdateTime();
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
