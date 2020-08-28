package com.project.homerent.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    void saveImageFileToHome(Long homeId, MultipartFile file);
    void saveImageFileToUser(Long userId, MultipartFile file);
}
