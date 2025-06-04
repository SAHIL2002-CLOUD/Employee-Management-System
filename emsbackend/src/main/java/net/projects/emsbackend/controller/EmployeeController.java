package net.projects.emsbackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.projects.emsbackend.dto.EmployeeDto;
import net.projects.emsbackend.exception.ResourceNotFoundException;
import net.projects.emsbackend.service.EmployeeService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	@Autowired
	private  EmployeeService employeeService;
	
	
	@PostMapping("/register")
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
	    EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
	    return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED); 
	}

	@PostMapping("/login")
	public ResponseEntity<EmployeeDto> login(@RequestBody Map<String, String> credentials) {
	    try {
	        String email = credentials.get("email");
	        String password = credentials.get("password");

	        EmployeeDto employee = employeeService.login(email, password);
	        return ResponseEntity.ok(employee);

	    } catch (ResourceNotFoundException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    } 
	}
	//Build Add Employee Rest API
//	
//	  @PostMapping
//	  public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
//		  EmployeeDto savedEmployee=employeeService.createEmployee(employeeDto);
//		  return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED); 
//		  }
	 
	  //Build Get Employee Rest API
	  @GetMapping("{id}")
	  public ResponseEntity<EmployeeDto> getEmployeeId(@PathVariable("id") Long employeeId){
		  EmployeeDto employeeDto=employeeService.getEmployeeById(employeeId);
		  return ResponseEntity.ok(employeeDto);
	  }

	  //Build Get All Employees REST API
	  @GetMapping
	  public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		  
		  List<EmployeeDto> employees=employeeService.getAllEmployees();
		  return ResponseEntity.ok(employees);
	  }
	  
	  //Build Put All employees REST API
	  @PutMapping("{id}")
	 public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updateEmployee){
		 EmployeeDto employeeDto=employeeService.updateEmployee(employeeId, updateEmployee);
		 return ResponseEntity.ok(employeeDto);
	 }
	  
	  //Build delete employee REST API
	  @DeleteMapping("{id}")
	  public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
		  employeeService.deleteEmployee(employeeId);
		  return ResponseEntity.ok("Employee deleted succesfully");
	  }
}
