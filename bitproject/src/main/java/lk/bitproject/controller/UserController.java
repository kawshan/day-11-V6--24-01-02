package lk.bitproject.controller;

import lk.bitproject.dao.UserRepository;
import lk.bitproject.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/user")

public class UserController {
    @Autowired
    private UserRepository dao;

    @GetMapping("/userform")
    public ModelAndView userUI() {
        ModelAndView userView = new ModelAndView();
        userView.setViewName("user.html");
        return userView;
    }

    @GetMapping(value = "/findall", produces = "application/json")
    public List<User> findAll() {
        return dao.findAll();
    }


    //define post mapping for post user
    @PostMapping
    public String saveUser(@RequestBody User user) {
        //authentication and authorization
        //check duplicate

        try {
            //password encode

            //set auto set value
            user.setAdded_datetime(LocalDateTime.now());

            dao.save(user);
            return "ok";
        } catch (Exception e) {
            return "save not complete" + e.getMessage();
        }
    }

    //define delete mapping for user
    @DeleteMapping
    public String deleteUser(@RequestBody User user) {
        //authentication and authorization

        //existing
        User extUser = dao.getReferenceById(user.getId());
        if (extUser == null) {
            return "user delete not success user not available ";
        }


        try {
            //operations
            //hard delete
            //dao.delete(user);
            extUser.setStatus(false);
            dao.save(extUser);

            //soft delete

            //dependencies
            return "ok";
        } catch (Exception e) {
            return "delete not complete " + e.getMessage();
        }

    }

    //define put mapping for update user
    @PutMapping
    public String updateUser(@RequestBody User user){
        //authentication and authorization

        //existing and duplicate check
        User extUser = dao.getReferenceById(user.getId());
        if (extUser == null){
        return "user not exists";
        }

        User extUserEmail = dao.getByEmail(user.getEmail());
        if (extUserEmail != null && extUserEmail.getId() != user.getId()){
            return "update not complete : changed email already exist \n";
        }

        try {
            //auto set values

            //operator
            dao.save(user);

            //dependency

            return "ok";
        }catch (Exception e){
            return "update not completed have some errors"+e.getMessage();
        }
    }

}
