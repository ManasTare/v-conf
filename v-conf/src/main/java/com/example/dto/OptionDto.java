package com.example.dto;

public class OptionDto {
	  private Integer compId;   
	  private String subType;   
	    private Double price;
	    
	    
	    
		public OptionDto(Integer compId, String subType, Double price) {
			super();
			this.compId = compId;
			this.subType = subType;
			this.price = price;
		}
		public Integer getCompId() {
			return compId;
		}
		public void setCompId(Integer compId) {
			this.compId = compId;
		}
		public String getSubType() {
			return subType;
		}
		public void setSubType(String subType) {
			this.subType = subType;
		}
		public Double getPrice() {
			return price;
		}
		public void setPrice(Double price) {
			this.price = price;
		}
}
