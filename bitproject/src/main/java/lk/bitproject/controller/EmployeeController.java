package lk.bitproject.controller;

import lk.bitproject.dao.EmployeeRepository;
import lk.bitproject.dao.EmployeeStatusRepository;
import lk.bitproject.entity.Employee;
import lk.bitproject.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController  //
@RequestMapping(value = "/employee")  //class level mapping

public class EmployeeController {

    @Autowired      //generate object
    private EmployeeRepository employeeDao;

    @Autowired
    private EmployeeStatusRepository employeeStatusDao;


//    public EmployeeController(EmployeeRepository employeeRepository){
//    this.employeeDao = employeeRepository;
//    }

    //load employee load employeeform [employee/employeeform]
    @GetMapping(value = "employeeform")
    public ModelAndView employeeUI() {
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
//        List<Employee> EmployeeList =
//        employeeView.addObject(null,employeeList);
        return employeeView;
    }

    //create get mapping for employee findAll data return type produce keyword return type json
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Employee> findAll() {
        return employeeDao.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

//    define method for get employee object by id
//    @GetMapping(value = "/getbyid/{id}")


    //    define mapping for employee post service
//    @PostMapping
    @PostMapping(value = "/employeeform")
    public String saveEmployee(@RequestBody Employee employee) {


        //check nic duplicate
        Employee exNicEmployee = employeeDao.getByNic(employee.getNic());
        if (exNicEmployee != null) {
            return "save not completed given nic " + employee.getNic() + "is already exists";
        } else {

        }

        //check email duplicate
        Employee exEmailEmployee = employeeDao.getByEmail(employee.getEmail());
        if (exEmailEmployee != null) {
            return "save not completed given email " + employee.getEmail() + "is already exists";
        } else {

        }


        try {
            //set auto generated value
            employee.setAdded_datetime(LocalDateTime.now());
//            employee.setEmpnumber("0000004");

            String employeeNextNumber = employeeDao.getEmpNextNumber();
            if (employeeNextNumber.equals(null) || employeeNextNumber.equals("")) {
                employee.setEmpnumber("000001");
            } else {
                employee.setEmpnumber(employeeNextNumber);
            }

            employeeDao.save(employee);
            return "ok";
        } catch (Exception e) {
            return "save not completed" + e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteEmployee(@RequestBody Employee employee) {
        //

        //
        try {
//          employeeDao.delete(employee);
//          employeeDao.delete(employeeDao.getReferenceById(employee.getId()));     //hard delete

            //soft delete->change status into delete
            EmployeeStatus deleteStatus = employeeStatusDao.getReferenceById(3);
            employee.setEmployeestatus_id(deleteStatus);
            employeeDao.save(employee);


            return "ok";
        } catch (Exception e) {
            return "delete not complete " + e.getMessage();
        }
    }

    //create mapping for employee update --> url /employee      type---->put
    @PutMapping
    public String updateEmployee(@RequestBody Employee employee) {
        //a

        //check duplicate for given nic
        Employee extNicEmployee = employeeDao.getByNic(employee.getNic());
        if (extNicEmployee != null && employee.getId() != extNicEmployee.getId()) {
            return "update not completed : change nic already exists ";
        }
        //check duplicate for given email
        Employee extEmailEmployee = employeeDao.getByEmail(employee.getEmail());
        if (extEmailEmployee != null && employee.getId() != extEmailEmployee.getId()) {
            return "update not completed : change email already exists";
        }


        try {
            //add auto set values

            employeeDao.save(employee);

            return "OK";
        } catch (Exception e) {
            return "update not completed " + e.getMessage();
        }
    }


    //    create get mapping for get employee without user account localhost://employee/withoutuseraccount
    @GetMapping(value = "/withoutuseraccount", produces = "application/json")
    public List<Employee> getListWithoutUserAccount() {
        return employeeDao.getListByWithoutUserAccount();
    }


}
