package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.models.User;
import com.example.service.UserService;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/registration")
public class RegisterController {

    @Autowired
    private UserService service;
    
    
 
    @GetMapping
    public List<User> getAll() {
        return service.getAllRegistrations();
    }


    @PostMapping
    public User save(@RequestBody User registration) {
        return service.saveRegistration(registration);
    }
}
