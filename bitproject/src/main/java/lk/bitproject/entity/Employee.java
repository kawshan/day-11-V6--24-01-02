package lk.bitproject.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //make as an persistence entity
@Table(name = "employee")
@Data //getter setter to string

@NoArgsConstructor //default constructor
@AllArgsConstructor //all constructor

public class Employee {
    @Id //primary key
    @Column(name = "id",unique = true) //column mapping
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    private Integer id;

    @Column(name = "empnumber",unique = true, length = 10)
    @NotNull //not null
    private String empnumber;

    @Column(name = "fullname")
    @NotNull
    private String fullname;

    @Column(name = "nic",unique = true,length = 12)
    @Length(max = 12, min = 10, message = "nic value must have 10 or 12")
    @NotNull
    private String nic;


    @Column(name = "callingname")
    @NotNull
    private String callingname;

   @Column(name = "email",unique = true)
   @NotNull
   private String email;

   @Column(name = "mobile",length = 10)
   @NotNull
   @Length(max = 10,min = 10,message = "mobile value must have 10 length")
   private String mobile;

   @Column(name = "landno",length = 10)
   private String landno;

   @Column(name = "note")
   private String note;

   @Column(name = "dob")
   @NotNull
   private LocalDate dob;

   @Column(name = "civilstatus")
   @NotNull
   private String civilstatus;

   @Column(name = "address")
   @NotNull
   private String address;

   @Column(name = "added_datetime")
   @NotNull
   private LocalDateTime added_datetime;

   @Column(name = "gender")
   @NotNull
   public String gender;


    @ManyToOne          // relationship type
    @JoinColumn(name = "employeestatus_id",referencedColumnName = "id")
    private EmployeeStatus employeestatus_id;

    @ManyToOne
    @JoinColumn(name = "designation_id",columnDefinition = "id")
    private Designation designation_id;



}
