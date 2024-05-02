package lk.bitproject.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // make as persistence entity
@Table(name = "employeestatus")  //table mapping
@Data // getter setter

@NoArgsConstructor
@AllArgsConstructor


public class EmployeeStatus {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "id")
    private Integer id;


    @Column(name = "name")
    @NotNull
    private String name;



}
