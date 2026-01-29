//package com.example.controller;
//
//import com.example.models.User;
//import com.example.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.dto.InvoiceRequestDTO;
//import com.example.service.Invoicemanager;
//import org.springframework.web.client.RestTemplate;
//
//@RestController
//@RequestMapping("/api/invoice")
//public class InvoiceController {
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @Autowired
//    private Invoicemanager invoiceService; // monolith service
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/confirm")
//    public ResponseEntity<String> confirmOrder(
//            @RequestBody InvoiceRequestDTO dto,
//            Authentication authentication) {
//
//        if (authentication == null) {
//            return ResponseEntity.status(401).body("Unauthorized");
//        }
//
//        String username = authentication.getName();
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        dto.setUserId(user.getId());
//
//        // 1️⃣ TRY MICROSERVICE FIRST
//        try {
//            String response = restTemplate.postForObject(
//                    "http://localhost:9003/api/invoice/confirm",
//                    dto,
//                    String.class);
//
//            return ResponseEntity.ok(
//                    "Invoice generated via MICROservice");
//
//        } catch (Exception ex) {
//
//            // 2️⃣ FALLBACK TO MONOLITH
//            System.out.println("Microservice down, using monolith...");
//
//            invoiceService.generateInvoice(dto);
//
//            return ResponseEntity.ok(
//                    "Invoice generated via MONOLITH (fallback)");
//        }
//    }
//
//}


package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.InvoiceRequestDTO;
import com.example.service.Invoicemanager;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

    @Autowired
    private Invoicemanager invoiceService;

    @Autowired
    private com.example.repository.UserRepository userRepository;

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmOrder(
            @RequestBody InvoiceRequestDTO dto,
            org.springframework.security.core.Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String username = authentication.getName();
        com.example.models.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Force the user ID to be the authenticated user's ID
        dto.setUserId(user.getId());

        invoiceService.generateInvoice(dto);
        return ResponseEntity.ok("Invoice generated");
    }
}
