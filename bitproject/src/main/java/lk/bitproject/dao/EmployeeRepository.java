package lk.bitproject.dao;

import lk.bitproject.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {


//native
//jpQuery - hql

    //create query for get next employee number
    @Query(value = "SELECT lpad(max(e.empnumber)+1,6,0) as empnumber FROM bitproject23tus.employee as e;", nativeQuery = true)
    public String getEmpNextNumber();

    //create query for get employee by given nic
    @Query("select e from Employee as e where e.nic=?1")
    public Employee getByNic(String nic);


    //create query for get employee by email
    @Query("select  e from Employee as e where e.email=?1")
    public Employee getByEmail(String email);

    //create query for get employee without user account
    @Query("select e from Employee e where e.id not in(select u.employee_id from User u where u.employee_id is not null)")
    public List<Employee> getListByWithoutUserAccount();



}
