package com.ksh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ksh.model.DashboardVO;
import com.ksh.service.DashboardService;

@Controller
public class DashboardController {

	// 비즈니스 모델을 컨트롤러에 연결하기
	@Autowired
	DashboardService ds;
	
	// 대시보드 리스트 그래프로 값 끌어오기

    // 대시보드 리스트 그래프로 값 끌어오기
    @GetMapping("/dashboardList")
    @ResponseBody
    public ResponseEntity<List<DashboardVO>> dashboardList() {
        List<DashboardVO> list = ds.list();
        System.out.println(ds.list());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
