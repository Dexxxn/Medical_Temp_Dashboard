/*package com.ksh.controller;

import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ksh.model.DashboardVO;
import com.ksh.service.DashboardService;

@Controller
public class DashboardController {

	// 비즈니스 모델을 컨트롤러에 연결하기
	@Autowired
	DashboardService ds;
	
	// 대시보드 리스트 그래프로 값 끌어오기
	@RequestMapping(value = "/dashboardList", method = RequestMethod.GET)
	@ResponseBody
	public List<Map<String, Object>> monthPlan() {
		List<DashboardVO> list = ds.list();

		JSONObject jsonObj = new JSONObject();
		JSONArray jsonArr = new JSONArray();
		HashMap<String, Object> hash = new HashMap<String, Object>();

		for (int i = 0; i < list.size(); i++) {
			hash.put("labels", list.get(i).getV_temperature());
			//hash.put("backgroundColor", list.get(i).getBackgroundColor());
			
			jsonObj = new JSONObject(hash); // 중괄호 {key:value , key:value, key:value}
			jsonArr.add(jsonObj); // 대괄호 안에 넣어주기[{key:value , key:value, key:value},{key:value , key:value,
									// key:value}]
		}

		log.info("jsonArrCheck: {}", jsonArr);

		return jsonArr;
	}
	@RequestMapping(value = "/popup/{s_dept}", method = RequestMethod.GET)
	// ResponseEntity: 비동기식은 결과가 js로 가기때문에 통신상태를 확인하기 위해 통신상태를 함께 보냄
	public ResponseEntity<ArrayList<MedicalVO>> getList(@PathVariable("s_dept") String s_dept){
		MedicalVO mvo = new MedicalVO();	// mapper.xml(if문 가공)에서 String s_dept(단순 변수) 처리 못함 반드시 VO에담아서 전달해야함
		mvo.setS_dept(s_dept);	//setter: VO에 데이터 저장하기 위함
		System.out.println(mvo);
		return new ResponseEntity<>(ms.medical2(mvo),HttpStatus.OK); 
		// return ms.medical2(mvo) // 이렇게해도 되지만 서버 통신상태를 확인하기 위해서는 위 코드를 쓸것
	}
	@RequestMapping(value = "/replies/{bno}/{page}", method = RequestMethod.GET)
	public ResponseEntity <DashboardVO> getList(@PathVariable("page") int page,@PathVariable("bno") int bno){
		System.out.println(bno);
		CriteriaVO cri = new CriteriaVO(page,10);
		return new ResponseEntity<>(rs.list(cri, bno),HttpStatus.OK);// 
	}
}
*/