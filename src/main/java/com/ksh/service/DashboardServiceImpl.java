package com.ksh.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ksh.mapper.DashboardMapper;
import com.ksh.model.DashboardVO;

@Service
public class DashboardServiceImpl implements DashboardService{

	@Autowired
	DashboardMapper dm;
	
	public ArrayList<DashboardVO> list() {
		return dm.list();
	}
}
