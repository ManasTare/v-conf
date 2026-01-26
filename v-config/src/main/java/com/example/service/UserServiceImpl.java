package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.User;
import com.example.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	 @Autowired
	    private UserRepository repository;
	 
	  @Autowired
	    private EmailService emailService;

	  
	  
	    public List<User> getAllRegistrations() {
	        return repository.findAll();
	    }
         
	    @Override
	    public User saveRegistration(User user) {
	    	String regNo="VCONF-"+System.currentTimeMillis();
	    	user.setRegistrationNo(regNo);
	    	user.setRole("USER");
	    	
	    	User savedUser=repository.save(user);
	    	
	    	emailService.sendRegistrationEmail(savedUser);
	        return savedUser;
	    }

		

}
