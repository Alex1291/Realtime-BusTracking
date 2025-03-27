package com.example.demo.config;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {
    //@Bean or @Component or @Service or etc allow Spring to handle bean's lifecycle instead of us manually creating and managing instances
    @Bean
    public Firestore firestore() {
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp();
        }
        return FirestoreClient.getFirestore();
    }
}
