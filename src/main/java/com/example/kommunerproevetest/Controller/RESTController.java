package com.example.kommunerproevetest.Controller;


import com.example.kommunerproevetest.Model.Kommune;
import com.example.kommunerproevetest.Model.Region;
import com.example.kommunerproevetest.Repos.KommuneRepo;
import com.example.kommunerproevetest.Repos.RegionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class RESTController {


    @Autowired
    RegionRepo regionRepo;


    @GetMapping("/regions")
    public List<Region> regions() {

        return regionRepo.findAll();
    }

    @PostMapping("/saveRegions")
    @ResponseStatus(HttpStatus.CREATED)
    public Region saveRegions(@RequestBody Region region) {
        return regionRepo.save(region);
    }


}


