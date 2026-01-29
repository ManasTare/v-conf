package com.example.service;

import java.util.List;

import com.example.dto.DefaultConfigurationDTO;

public interface DefaultConfigManager {

	List<DefaultConfigurationDTO>  getDefaultConfiguration(Integer id);
}
