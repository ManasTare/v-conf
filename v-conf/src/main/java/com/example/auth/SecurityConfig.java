package com.example.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig {

        private final JwtAuthFilter jwtFilter;
        private final JwtUtil jwtUtil;

        public SecurityConfig(JwtAuthFilter jwtFilter, JwtUtil jwtUtil) {
                this.jwtFilter = jwtFilter;
                this.jwtUtil = jwtUtil;
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                // http
                // .csrf(csrf -> csrf.disable())
                // .sessionManagement(sess ->
                // sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // )
                // .authorizeHttpRequests(auth -> auth
                // .requestMatchers(
                // "/auth/login",
                // "/api/registration",
                // "/api/registration/**"
                // ).permitAll()
                // .anyRequest().authenticated()
                // )
                // .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
                //
                // return http.build();

                http
                                .csrf(csrf -> csrf.disable())
                                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                "/auth/login",
                                                                "/auth/oauth/**",
                                                                "/oauth/**",
                                                                "/login/oauth/**",
                                                                "/api/registration/**")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .oauth2Login(oauth -> oauth
                                                .successHandler((request, response, authentication) -> {
                                                        org.springframework.security.oauth2.core.user.OAuth2User oauthUser = (org.springframework.security.oauth2.core.user.OAuth2User) authentication
                                                                        .getPrincipal();
                                                        String email = oauthUser.getAttribute("email");
                                                        // Generate token using the existing JwtUtil
                                                        String token = jwtUtil.generateToken(email);
                                                        // Redirect to frontend login page which handles token
                                                        response.sendRedirect(
                                                                        "http://localhost:5173/login?token=" + token);
                                                }))
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public AuthenticationManager authenticationManager() {
                return authentication -> authentication;
        }
}
