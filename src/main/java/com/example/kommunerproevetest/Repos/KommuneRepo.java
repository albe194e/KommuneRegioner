package com.example.kommunerproevetest.Repos;

import com.example.kommunerproevetest.Model.Kommune;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KommuneRepo extends JpaRepository<Kommune,String> {


    @Override
    void delete(Kommune entity);

    @Override
    Optional<Kommune> findById(String s);
}
