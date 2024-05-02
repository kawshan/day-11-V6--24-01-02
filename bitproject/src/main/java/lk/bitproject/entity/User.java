package lk.bitproject.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Data   //setters getters

@NoArgsConstructor      //empty constructor
@AllArgsConstructor     //all constructor

public class User {
    @Id()
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "username",unique = true)
    @NotNull
    public String username;

    @Column(name = "password")
    @NotNull
    public String password;

    @Column(name = "email",unique = true)
    @NotNull
    public String email;

    @Column(name = "photopath")
    public String photopath;

    @Column(name = "status")
    @NotNull
    public Boolean status;

    @Column(name = "added_datetime")
    @NotNull
    public LocalDateTime added_datetime;

    @Column(name = "note")
    public String note;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee_id;


}
