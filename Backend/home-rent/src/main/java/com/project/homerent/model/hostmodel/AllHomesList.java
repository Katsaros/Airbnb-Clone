package com.project.homerent.model.hostmodel;

import com.project.homerent.model.dto.MyHomeDto;

import java.util.ArrayList;
import java.util.List;

public class AllHomesList {
    private List<MyHomeDto> homes;

    public AllHomesList(){
        homes = new ArrayList<MyHomeDto>();
    }

    public void add(MyHomeDto home){
        homes.add(home);
    }

    public List<MyHomeDto> getHomes() {
        return homes;
    }

    public void setHomes(List<MyHomeDto> homes) {
        this.homes = homes;
    }
}
