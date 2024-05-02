package lk.bitproject.controller;

import lk.bitproject.dao.EmployeeRepository;
import lk.bitproject.dao.EmployeeStatusRepository;
import lk.bitproject.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/status")


public class EmployeeStatusController {
    @Autowired
    private EmployeeStatusRepository dao;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<EmployeeStatus> findAll(){
        return dao.findAll();
    }
}
