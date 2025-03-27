package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication()
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


//✅ 1️⃣ Spring Boot starts → Scans for @RestController components
//✅ 2️⃣ Registers controllers in the ApplicationContext
//✅ 3️⃣ Sets up DispatcherServlet and register the controller on it to handle requests
//✅ 4️⃣ Matches URL paths (@GetMapping, @PostMapping, etc.) to controller methods
//✅ 5️⃣ Executes controller method → Returns response
//✅ 6️⃣ Spring converts Java objects to JSON → Sends response to the client




}

//GOOGLE_CLOUD_PROJECT=bustracking-39cee;GOOGLE_APPLICATION_CREDENTIALS=C:/Users/Admin/Downloads/bustracking-39cee-firebase-adminsdk-fbsvc-c7e785ee41.json;C:/Users/Admin/Downloads/bustracking-39cee-firebase-adminsdk-fbsvc-c7e785ee41.json


