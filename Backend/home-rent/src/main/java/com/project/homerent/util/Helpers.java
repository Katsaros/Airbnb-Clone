package com.project.homerent.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.hostmodel.AllHomesList;
import com.thoughtworks.xstream.XStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

public class Helpers {

    public static String convertToJson(Object ob) throws JsonProcessingException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm a z");
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.setDateFormat(df);
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(ob);
    }

    public static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515;
            if (unit.equals("K")) {
                dist = dist * 1.609344;
            } else if (unit.equals("N")) {
                dist = dist * 0.8684;
            }
            return (dist);
        }
    }

    public static String myHomeDtoToXML(MyHomeDto homeDto) {
        String xmlString = "";
        try {
            JAXBContext context = JAXBContext.newInstance(MyHomeDto.class);
            Marshaller m = context.createMarshaller();

            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            StringWriter sw = new StringWriter();
            m.marshal(homeDto, sw);
            xmlString = sw.toString();

        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return xmlString;
    }

    public static String myHomesToXML(List<MyHomeDto> usersHomeList) {
        XStream xstream = new XStream();
        xstream.alias("Home", MyHomeDto.class);
        xstream.alias("Homes", AllHomesList.class);
        xstream.addImplicitCollection(AllHomesList.class, "homes");

        AllHomesList list = new AllHomesList();

        list.getHomes().addAll(usersHomeList);

        String xml = xstream.toXML(list);
        return xml;
    }

//    public static String myHomesToXML(List<MyHomeDto> usersHomeList) {
//        List<String> convertedList;
//
//        convertedList = usersHomeList.stream().map(home->{
//            String xmlHome = myHomeDtoToXML(home);
//            return xmlHome;
//        }).collect(Collectors.toList());
//
//        return convertedList.toString();
//    }
}
