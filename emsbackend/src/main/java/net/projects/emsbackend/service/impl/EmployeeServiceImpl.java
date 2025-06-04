	package net.projects.emsbackend.service.impl;
	
	import java.util.List;
	import java.util.stream.Collectors;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import lombok.AllArgsConstructor;
	import net.projects.emsbackend.dto.EmployeeDto;
	import net.projects.emsbackend.entity.Employee;
	import net.projects.emsbackend.exception.ResourceNotFoundException;
	import net.projects.emsbackend.mapper.EmployeeMapper;
	import net.projects.emsbackend.repository.EmployeeRepository;
	import net.projects.emsbackend.service.EmployeeService;
	
	
	@Service
	@AllArgsConstructor
	public class EmployeeServiceImpl implements EmployeeService{
	
		@Autowired
		private EmployeeRepository employeeRepository;
		
		@Override
		public EmployeeDto createEmployee(EmployeeDto employeeDto) {
			
			Employee employee=EmployeeMapper.mapToEmployee(employeeDto);
			Employee savedEmployee=employeeRepository.save(employee);
	
			return EmployeeMapper.mapToEmployeeDto(savedEmployee);
		}
	
		@Override
		public EmployeeDto getEmployeeById(Long employeeId) {
			// TODO Auto-generated method stub
			Employee employee=employeeRepository.findById(employeeId)
			.orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with given id: "+ employeeId));
			return EmployeeMapper.mapToEmployeeDto(employee);
		}
	
		@Override
		public List<EmployeeDto> getAllEmployees(){
			List<Employee> employees=employeeRepository.findAll();
			return employees.stream().map((employee)-> EmployeeMapper.mapToEmployeeDto(employee))
					.collect(Collectors.toList());
			
			
		}
	
		@Override
		public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
			
			Employee employee=employeeRepository.findById(employeeId).orElseThrow(
					
					()->new ResourceNotFoundException("Employee is not exists with given id:"+employeeId)
				);
			employee.setFirstName(updatedEmployee.getFirstName());
			employee.setLastName(updatedEmployee.getLastName());
			employee.setEmail(updatedEmployee.getEmail());
			employee.setPassword(updatedEmployee.getPassword());
			
			Employee updatedEmployeeObj=employeeRepository.save(employee);
			return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
		}
	
		@Override
		public void deleteEmployee(Long employeeId) {
				Employee employee=employeeRepository.findById(employeeId).orElseThrow(
					
					()->new ResourceNotFoundException("Employee is not exists with given id:"+employeeId)
				);
	
			employeeRepository.deleteById(employeeId);
			
		}

		@Override
		public EmployeeDto login(String email, String password) {
			
			Employee employee=employeeRepository.findByEmail(email);
			if((employee==null)||(!password.equals(employee.getPassword()))) {
				throw new ResourceNotFoundException("Invalid username or password");
				
			}
			
			return EmployeeMapper.mapToEmployeeDto(employee);
		}
		
		
	}
