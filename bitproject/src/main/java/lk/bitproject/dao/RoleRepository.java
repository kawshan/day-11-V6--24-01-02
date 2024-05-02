package lk.bitproject.dao;

import lk.bitproject.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    //create query for get role without admin
    @Query(value = "select r from Role r where r.name <> 'admin'")
    public List<Role> getListWithoutAdmin();

}
