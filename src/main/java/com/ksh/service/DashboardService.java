package com.ksh.service;

import java.util.ArrayList;

import com.ksh.model.DashboardVO;

public interface DashboardService {
	
	// 대시보드 리스트
	public ArrayList<DashboardVO> list();
}
