package lk.bitproject.controller;


import lk.bitproject.dao.RoleRepository;
import lk.bitproject.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/role")

public class RoleController {

    @Autowired
    private RoleRepository dao;

//create get mapping for get role list without admin
    @GetMapping(value = "/listwithoutadmin",produces = "application/json")
    public List<Role> getRoleListWithOutAdmin(){
        return dao.getListWithoutAdmin();
    }

}
