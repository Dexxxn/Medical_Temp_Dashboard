package com.ksh.model;

public class DashboardVO {

	private String v_dateTime;
	private String v_type;
	private double v_temperature;
	private String v_stockingDate;
	
	
	public String getV_dateTime() {
		return v_dateTime;
	}
	public void setV_dateTime(String v_dateTime) {
		this.v_dateTime = v_dateTime;
	}
	public String getV_type() {
		return v_type;
	}
	public void setV_type(String v_type) {
		this.v_type = v_type;
	}
	public double getV_temperature() {
		return v_temperature;
	}
	public void setV_temperature(double v_temperature) {
		this.v_temperature = v_temperature;
	}
	public String getV_stockingDate() {
		return v_stockingDate;
	}
	public void setV_stockingDate(String v_stockingDate) {
		this.v_stockingDate = v_stockingDate;
	}
	
	
	@Override
	public String toString() {
		return "DashboardVO [v_dateTime=" + v_dateTime + ", v_type=" + v_type + ", v_temperature=" + v_temperature
				+ ", v_stockingDate=" + v_stockingDate + "]";
	}
	
	
}
