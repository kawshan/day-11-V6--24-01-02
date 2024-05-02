package lk.bitproject.dao;

import lk.bitproject.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatusRepository extends JpaRepository<EmployeeStatus,Integer> {
}
