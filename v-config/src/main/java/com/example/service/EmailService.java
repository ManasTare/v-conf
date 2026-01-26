package com.example.service;

import com.example.models.User;

public interface EmailService {
    void sendRegistrationEmail(User user);
}
