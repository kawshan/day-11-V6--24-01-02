package lk.bitproject.dao;

import lk.bitproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,Integer> {

    //create query for get user by given email
    @Query("select u from User u where u.email=?1")
    User getByEmail(String email);


}
