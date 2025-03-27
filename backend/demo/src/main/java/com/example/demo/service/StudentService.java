package com.example.demo.service;


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

//@Service - mark this class as @Service will let Spring automatically take this and inject into respective controller
//@Service -  It tells Spring to be managed as a Spring Bean.
@Service
@AllArgsConstructor
@Slf4j //provide log function
public class StudentService {

    private final Firestore db;
    //Spring scans the project for @Component, @Service, @Repository, and @Bean annotations.
    //It finds @Bean methods that return Firestore (like in FirebaseConfig)
    //Spring automatically injects the Firestore bean when creating UserService.
    //if there is more than 1 method that return same data type, can use @Primary or @Qualifier("beanName") or @Bean(name = "customName") to specify which bean to DI


//    Reading a document? → DocumentSnapshot
//    Writing to a document? → WriteResult
//    Referencing a document without fetching data? → DocumentReference


    //CREATE
    public String createStudent(Student student) {
        try {
            student.setId(student.getStudent_email());

            ApiFuture<WriteResult> future = db.collection("student")
                    .document(student.getStudent_email())
                    .set(student);

            WriteResult result = future.get();

            return "Write result: " + result;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // READ
    public Student getStudent(String id) {
        try {
            DocumentReference docRef = db.collection("student").document(id);

            //ApiFuture<DocumentSnapshot> → Represents the pending result of the Firestore query.
            //docRef.get() → Asynchronously fetches the document.
            ApiFuture<DocumentSnapshot> future = docRef.get();

            //future.get() blocks on response
            DocumentSnapshot document = future.get();

            Student student = null;

            if (document.exists()) {
                student = document.toObject(Student.class);
            } else {
                System.out.println("No such document!");
            }

            return student;
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<Student> getAllStudents() {
        try {

            ApiFuture<QuerySnapshot> future = db.collection("student").get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            List<Student> students = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                students.add(document.toObject(Student.class));
            }

            return students;

        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // UPDATE
    public String updateStudent(String studentId, Map<String, Object> updates) {
        // 1. Check if ID exists
        // 2. Check if user is valid
        try {
            DocumentReference docRef = db.collection("student").document(studentId);


            ApiFuture<WriteResult> writeResult = docRef.update(updates);

            return "Update time : " + writeResult.get().getUpdateTime();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    //DELETE
    public String deleteStudent(String id) {
        try {
            ApiFuture<WriteResult> users = db.collection("student").document(id).delete();

            return "User deleted at : " + users.get().getUpdateTime();
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
