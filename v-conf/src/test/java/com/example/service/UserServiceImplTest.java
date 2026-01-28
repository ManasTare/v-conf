package com.example.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.models.User;
import com.example.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository repository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void getAllRegistrations_shouldReturnAllUsers() {

        // Arrange
        User u1 = new User();
        User u2 = new User();

        when(repository.findAll()).thenReturn(List.of(u1, u2));

        // Act
        List<User> result = userService.getAllRegistrations();

        // Assert
        assertEquals(2, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void saveRegistration_shouldSaveUserAndSendEmail() {

        // Arrange
        User user = new User();

        when(repository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        User savedUser = userService.saveRegistration(user);

        // Assert
        assertNotNull(savedUser.getRegistrationNo());
        assertTrue(savedUser.getRegistrationNo().startsWith("VCONF-"));

        assertEquals("USER", savedUser.getRole());

        verify(repository, times(1)).save(user);
        verify(emailService, times(1)).sendRegistrationEmail(savedUser);
    }
}