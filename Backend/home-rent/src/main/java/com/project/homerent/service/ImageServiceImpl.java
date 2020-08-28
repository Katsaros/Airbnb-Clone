package com.project.homerent.service;

import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.model.usermodel.User;
import com.project.homerent.repository.HostRepository;
import com.project.homerent.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    HostRepository hostRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public void saveImageFileToHome(Long homeId, MultipartFile file) {
        try {
            MyHome myHome = hostRepository.findById(homeId).get();

            Byte[] byteObjects = new Byte[file.getBytes().length];

            int i = 0;

            for (byte b : file.getBytes()){
                byteObjects[i++] = b;
            }

            myHome.setImage(byteObjects);

            hostRepository.save(myHome);
        } catch (IOException e) {
            log.error("Error occurred in save image to home", e);
        }
    }
    @Override
    @Transactional
    public void saveImageFileToUser(Long userId, MultipartFile file) {
        try {
            User user = userRepository.findById(userId).get();

            Byte[] byteObjects = new Byte[file.getBytes().length];

            int i = 0;

            for (byte b : file.getBytes()){
                byteObjects[i++] = b;
            }

            user.setImage(byteObjects);

            userRepository.save(user);
        } catch (IOException e) {
            log.error("Error occurred in save image to user", e);
        }
    }
}