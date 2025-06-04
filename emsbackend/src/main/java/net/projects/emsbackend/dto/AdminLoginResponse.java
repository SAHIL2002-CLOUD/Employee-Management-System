package net.projects.emsbackend.dto;

import lombok.Data;

@Data
public class AdminLoginResponse {

	private String email;
	private String message;
	public AdminLoginResponse(String email, String message) {
		super();
		this.email = email;
		this.message = message;
	}
	
}
