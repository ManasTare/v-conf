package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "add1", nullable = false)
	private String add1;

	@Column(name = "add2")
	private String add2;

	@Column(name = "auth_name", nullable = false)
	private String authName;

	@Column(name = "auth_tel", nullable = false)
	private String authTel;

	@Column(name = "cell")
	private String cell;

	@Column(name = "city", nullable = false)
	private String city;

	@Column(name = "company_name", nullable = false)
	private String companyName;

	@Column(name = "company_st_no", nullable = false)
	private String companyStNo;

	@Column(name = "company_vat_no", nullable = false)
	private String companyVatNo;

	@Column(name = "designation", nullable = false)
	private String designation;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "fax")
	private String fax;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "pin")
	private String pin;

	@Column(name = "state", nullable = false)
	private String state;

	@Column(name = "tax_pan")
	private String taxPan;

	@Column(name = "tel")
	private String tel;

	@Column(name = "holding_type")
	private String holdingType;

	@Column(name = "phone")
	private String phone;

	@Column(name = "role")
	private String role;

	@Column(name = "username")
	private String username;

	@Column(name = "registration_no")
	private String registrationNo;

	@Column(name="failed_attempts")
	private int failedAttempts;

	
	private boolean isBlocked;

	public int getFailedAttempts() {
		return failedAttempts;
	}

	public void setFailedAttempts(int failedAttempts) {
		this.failedAttempts = failedAttempts;
	}

	public boolean isBlocked() {
		return isBlocked;
	}

	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAdd1() {
		return add1;
	}

	public void setAdd1(String add1) {
		this.add1 = add1;
	}

	public String getAdd2() {
		return add2;
	}

	public void setAdd2(String add2) {
		this.add2 = add2;
	}

	public String getAuthName() {
		return authName;
	}

	public void setAuthName(String authName) {
		this.authName = authName;
	}

	public String getAuthTel() {
		return authTel;
	}

	public void setAuthTel(String authTel) {
		this.authTel = authTel;
	}

	public String getCell() {
		return cell;
	}

	public void setCell(String cell) {
		this.cell = cell;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyStNo() {
		return companyStNo;
	}

	public void setCompanyStNo(String companyStNo) {
		this.companyStNo = companyStNo;
	}

	public String getCompanyVatNo() {
		return companyVatNo;
	}

	public void setCompanyVatNo(String companyVatNo) {
		this.companyVatNo = companyVatNo;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getTaxPan() {
		return taxPan;
	}

	public void setTaxPan(String taxPan) {
		this.taxPan = taxPan;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getHoldingType() {
		return holdingType;
	}

	public void setHoldingType(String holdingType) {
		this.holdingType = holdingType;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRegistrationNo() {
		return registrationNo;
	}

	public void setRegistrationNo(String registrationNo) {
		this.registrationNo = registrationNo;
	}

}