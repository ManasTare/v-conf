package com.example.controller;

import com.example.models.User;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registration")
@CrossOrigin(origins = "http://localhost:5173") // React dev server
public class RegisterController {

    private final UserService service;

    public RegisterController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAllRegistrations();
    }

    @PostMapping
    public User save(@RequestBody User user) {
        return service.saveRegistration(user);
    }
}
