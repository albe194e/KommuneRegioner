package com.example.kommunerproevetest.Controller;

import com.example.kommunerproevetest.Model.Kommune;
import com.example.kommunerproevetest.Repos.KommuneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class KommuneRestController {

    @Autowired
    KommuneRepo kommuneRepo;

    @GetMapping("/kommuner")
    public List<Kommune> kommuner() {

        return kommuneRepo.findAll();
    }

    @PostMapping("/saveKommuner")
    public void saveKommuner(@RequestBody Kommune kommune) {

        kommune.setPhotoSrc("https://holbaek.dk/media/5fsjpn3l/20210520_083727811_ios.jpg?center=0.58148431522570776,0.55087987758224943&mode=crop&width=1535&height=863&rnd=133138433716670000");
        kommuneRepo.save(kommune);
    }

    @DeleteMapping("/deleteKommune/{kode}")
    public void deleteKommune(@PathVariable String kode) {

        kommuneRepo.deleteById(kode);
    }

    @PostMapping("/insertKommune")
    public void insertKommune(@RequestBody Kommune kommune) {
        kommune.setPhotoSrc("https://holbaek.dk/media/5fsjpn3l/20210520_083727811_ios.jpg?center=0.58148431522570776,0.55087987758224943&mode=crop&width=1535&height=863&rnd=133138433716670000");
        kommuneRepo.save(kommune);
    }
}
