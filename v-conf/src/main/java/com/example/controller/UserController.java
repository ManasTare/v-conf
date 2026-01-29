package com.example.controller;

import com.example.dto.ForgotPasswordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.example.dto.LoginRequest;
import com.example.service.UserManager;

@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserManager manager;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {

		try {
			String token = manager.login(request);

			return ResponseEntity.ok(token);
		} catch (RuntimeException ex) {

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
		}
	}

	@GetMapping("/oauth")
	public ResponseEntity<?> outh(@AuthenticationPrincipal OAuth2User user) {

		String email = user.getAttribute("email");
		String token = manager.Outh(email);

		return ResponseEntity.ok(token);

	}

	@PutMapping("/forgot")
	public ResponseEntity<?> forgot(@RequestBody ForgotPasswordDto dto) {

		try {

			manager.changePassword(dto.getEmail(), dto.getNewPassword());
			return ResponseEntity.ok("Password updated successfully");
		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}
}
