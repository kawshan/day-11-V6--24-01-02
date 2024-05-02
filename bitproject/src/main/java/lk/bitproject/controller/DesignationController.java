package lk.bitproject.controller;


import lk.bitproject.dao.DesignationRepository;
import lk.bitproject.entity.Designation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/designation")
public class DesignationController {
    @Autowired
    private DesignationRepository dao;


    @GetMapping(value = "/findall",produces = "application/json")
    public List<Designation> findAll(){
        return dao.findAll();
    }

}
