package com.project.homerent.service;

import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.repository.HostRepository;
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

    @Override
    @Transactional
    public void saveImageFile(Long recipeId, MultipartFile file) {
        try {
            MyHome myHome = hostRepository.findById(recipeId).get();

            Byte[] byteObjects = new Byte[file.getBytes().length];

            int i = 0;

            for (byte b : file.getBytes()){
                byteObjects[i++] = b;
            }

            myHome.setImage(byteObjects);

            hostRepository.save(myHome);
        } catch (IOException e) {
            log.error("Error occurred", e);
        }
    }
}