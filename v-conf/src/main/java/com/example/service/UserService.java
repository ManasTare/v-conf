package com.example.service;

import java.util.List;

import com.example.models.User;

public interface UserService {
	 public List<User> getAllRegistrations();
	 public User saveRegistration(User reg) ;
}
