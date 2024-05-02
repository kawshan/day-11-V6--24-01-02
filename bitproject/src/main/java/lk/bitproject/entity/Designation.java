package lk.bitproject.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "designation")
@Data

@NoArgsConstructor
@AllArgsConstructor

public class Designation {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id") //column name
    private Integer id;

    @Column(name = "name") //column name
    @NotNull
    private String name;



}
