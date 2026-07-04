package com.viaappia.api.controllers;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.Services.IncidentsServices;
import com.viaappia.api.entity.IncidentsEntity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/incidents")
public class IncidentsController {
    
    private final IncidentsServices is;

    @GetMapping("")
    public Iterable<IncidentsEntity> findAll() {
        return this.is.findAll();
    }

    @GetMapping("/{id}")
    public IncidentsEntity findById(@PathVariable UUID id){
        return this.is.findById(id);
    }
}
