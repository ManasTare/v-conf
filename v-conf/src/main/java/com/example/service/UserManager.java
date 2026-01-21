package com.example.service;

import org.springframework.stereotype.Service;

import com.example.dto.LoginRequest;


public interface UserManager {
	
	String login(LoginRequest request);
	
//	String Outh(String email);
}
