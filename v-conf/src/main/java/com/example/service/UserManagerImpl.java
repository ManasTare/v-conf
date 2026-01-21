package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.auth.JwtUtil;
import com.example.dto.LoginRequest;
import com.example.models.User;
import com.example.repository.UserRepository;

@Service
public class UserManagerImpl implements UserManager {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	public String login(LoginRequest request) {
		// TODO Auto-generated method stub
		
		Optional<User> optionalUser=userRepository.findByUsername(request.getUsername());
		
		
		
		if(optionalUser.isEmpty())
		{
			throw new RuntimeException("Invalid Username and Password");
		}
		
		User user=optionalUser.get();
		
		if(user.isBlocked())
			throw new RuntimeException("User is Blocked");
		
		if(!request.getPassword().equals(user.getPassword())) {
			user.setFailedAttempts(user.getFailedAttempts()+1);
			
			if(user.getFailedAttempts()>=3)
				user.setBlocked(true);
			
			userRepository.save(user);
			
			throw new RuntimeException("Invalid password");
		}
		user.setFailedAttempts(0);
		userRepository.save(user);
		
		String token=jwtUtil.generateToken(user.getUsername());
		
		return token;
		
	}

//	@Override
//	public String Outh(String email) {
//		// TODO Auto-generated method stub
//		String token=jwtUtil.generateToken(email);
//		
//		return token;
//	}
	

}
