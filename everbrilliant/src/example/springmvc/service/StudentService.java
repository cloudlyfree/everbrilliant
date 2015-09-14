package example.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import example.springmvc.dao.EntityDao;
import example.springmvc.entity.Student;


@Service
public class StudentService {
	@Autowired
	private EntityDao entityDao;
	
	@Transactional
	public List<Object> getStudentList(){
		StringBuffer sff = new StringBuffer();
		sff.append("select a from ").append(Student.class.getSimpleName()).append(" a ");
		List<Object> list = entityDao.createQuery(sff.toString());
		return list;
	}
	
	public void save(Student st){
		entityDao.save(st);
	}
	public void delete(Object obj){
		entityDao.delete(obj);
	}
}
