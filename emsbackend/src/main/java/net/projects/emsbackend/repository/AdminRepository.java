package net.projects.emsbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.projects.emsbackend.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{
	Optional<Admin> findByEmail(String email);
}
