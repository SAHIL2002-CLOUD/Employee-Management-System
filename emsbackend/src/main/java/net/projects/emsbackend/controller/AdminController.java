package net.projects.emsbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.projects.emsbackend.dto.AdminLoginRequestDto;
import net.projects.emsbackend.dto.AdminLoginResponse;
import net.projects.emsbackend.entity.Admin;
import net.projects.emsbackend.repository.AdminRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins="http://localhost:5173")
public class AdminController {

	 @Autowired
	    private AdminRepository adminRepository;

	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody AdminLoginRequestDto request) {
	        Admin admin = adminRepository.findByEmail(request.getEmail())
	                .orElse(null);

	        if (admin == null || !admin.getPassword().equals(request.getPassword())) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
	        }

	        AdminLoginResponse response = new AdminLoginResponse(admin.getEmail(), "Login Successful");
	        return ResponseEntity.ok(response);
	    }
	
}
