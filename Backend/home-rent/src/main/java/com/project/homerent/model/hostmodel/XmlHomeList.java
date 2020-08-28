package com.project.homerent.model.hostmodel;

import com.project.homerent.model.dto.MyHomeDto;

import java.util.ArrayList;
import java.util.List;

public class XmlHomeList {
    private List<MyHomeDto> list;

    public XmlHomeList(){
        list = new ArrayList<MyHomeDto>();
    }

    public void add(MyHomeDto home){
        list.add(home);
    }

    public List<MyHomeDto> getList() {
        return list;
    }
}
