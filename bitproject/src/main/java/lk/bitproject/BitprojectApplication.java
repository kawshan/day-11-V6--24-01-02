package lk.bitproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController //we say servlet container to map following methods --class level annotations

public class BitprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitprojectApplication.class, args);
//		System.out.println("hello world");
//		System.out.println("hello world 2");
//
//		test();


		System.out.println("****************************************************");
		System.out.println("****************application started******************");
		System.out.println("****************************************************");
	}

	public static void test(){
		System.out.println("test");
	}


	@RequestMapping(value = "/")
	public String testData(){
		return "<h2>welcome</h2>";
	}

	@RequestMapping(value = "/hi",method = RequestMethod.GET) //define mapping for hi
	public String hi(){
		return "hi";
	}


//	new mapping type
//	@GetMapping(value = "/hi")
//	@PostMapping(value = "/hi")
//	@PutMapping(value = "/hi")
//	@DeleteMapping(value = "/hi")

/*	@RequestMapping(value = "/hi")
	public void newHi(){
		System.out.println("hi");
	}*/


	@RequestMapping(value = "/testui")
	public ModelAndView testUI(){
		ModelAndView testview = new ModelAndView();
		testview.setViewName("test.html");
		return testview;
	}


//	@RequestMapping(value = "employee")
//	public ModelAndView employeeUI(){
//		ModelAndView empView = new ModelAndView();
//		empView.setViewName("employee.html");
//		return empView;
//	}


//	@RequestMapping(value = "user")
//	public ModelAndView userUI(){
//		ModelAndView userView = new ModelAndView();
//		userView.setViewName("user.html");
//		return userView;
//	}

	@RequestMapping(value = "/item")
	public ModelAndView itemUi(){
		ModelAndView itemUi = new ModelAndView();
		itemUi.setViewName("item.html");
		return itemUi;
	}

}
