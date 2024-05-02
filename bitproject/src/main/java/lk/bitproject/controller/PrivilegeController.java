package lk.bitproject.controller;

import lk.bitproject.dao.PrivilegeRepository;
import lk.bitproject.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class PrivilegeController {

    @Autowired      //inject privilege repository object into dao variable
    private PrivilegeRepository dao;

    @GetMapping(value = "/privilege/findall",produces = "application/json")
    public List<Privilege> privilegeAllData(){
        return dao.findAll();
    }

    @GetMapping(value = "/privilege/privilegeform")
    public ModelAndView privilegeUi(){
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privilege.html");
        return privilegeView;
    }


    @DeleteMapping(value = "/privilege")
    public String deletePrivilege(@RequestBody Privilege privilege){
        //

        //
        try {
            privilege.setSel(false);
            privilege.setInst(false);
            privilege.setDel(false);
            privilege.setUpd(false);

            dao.save(privilege);
            return "ok";
        }catch (Exception e){
            return "delete not successful"+e.getMessage();
        }

    }
}
