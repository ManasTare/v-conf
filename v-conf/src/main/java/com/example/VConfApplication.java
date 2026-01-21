package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.models")
@EnableJpaRepositories(basePackages = "com.example.repository")
public class VConfApplication {

	public static void main(String[] args) {
		SpringApplication.run(VConfApplication.class, args);
	}

}
