package com.project.homerent.service;

import com.project.homerent.converter.MyHomeConverter;
import com.project.homerent.model.dto.MyHomeDto;
import com.project.homerent.model.dto.MyHomePostDto;
import com.project.homerent.model.dto.ReservationDto;
import com.project.homerent.model.hostmodel.AllHomesList;
import com.project.homerent.model.hostmodel.MyHome;
import com.project.homerent.repository.HostRepository;
import com.project.homerent.util.Helpers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HostServiceImpl implements HostService {
    @Autowired
    HostRepository hostRepository;

    @Override
    public MyHomeDto findHomeDtoById(Long id) throws Exception {
        MyHome myHome;
        try {
            myHome = hostRepository.findById(id).get();
        } catch (NoSuchElementException nsee) {
            throw new Exception("Report not found", nsee.getCause());
        }
        return MyHomeConverter.convertToDto(myHome);
    }

    @Override
    public MyHome findHomeById(Long id) {
        MyHome myHome;
        myHome = hostRepository.findById(id).get();
        return myHome;
    }

    @Override
    public List<MyHomeDto> findByUserId(Long id) {
        return hostRepository.findByOwnerId(id)
                .stream()
                .map(MyHomeConverter::convertToDto)
                .collect(Collectors.toList());
    }
    @Override
    public MyHome findByAddress(String address)  {
            MyHome myHome;
            myHome = hostRepository.findByAddress(address).get();
        return myHome;
    }

    @Override
    public MyHomeDto save(MyHomeDto myHomeDto) {
        MyHome myHome = MyHomeConverter.convert(myHomeDto);

        myHome = hostRepository.save(myHome);

        return MyHomeConverter.convertToDto(myHome);
    }

    @Override
    public MyHomePostDto save(MyHomePostDto myHomePostDto) {
        MyHome myHome = MyHomeConverter.convertPostDtoToHome(myHomePostDto);

        Optional<MyHome> tempHome = hostRepository.findByAddress(myHomePostDto.getAddress());
        myHome.setId(tempHome.get().getId());

        myHome = hostRepository.save(myHome);

        return MyHomeConverter.convertToPostDto(myHome);
    }

    @Override
    public void deleteById(Long id) {
    }

    @Override
    public List<MyHomeDto> findAll() {
        return hostRepository.findAll()
                .stream()
                .map(MyHomeConverter::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AllHomesList findAllUsingFilters(int people, double latitude, double longitude, Date bookDate, Date leaveDate) {
        AllHomesList allHomesList = new AllHomesList();

        List<MyHomeDto> tempListWithAllHomes = hostRepository.findAll()
                .stream()
                .map(MyHomeConverter::convertToDto)
                .collect(Collectors.toList());

        //filter homes by max people
        List<MyHomeDto> filteredHomeListWithMaxPeople = filterHomeListByMaxPeople(people, tempListWithAllHomes);

        //filter homes by distance by range search
        List<MyHomeDto> filteredHomeListByDistance = filterHomeListByDistance(filteredHomeListWithMaxPeople, latitude, longitude);

        //filter homes by openBooking and closeBooking days
        List<MyHomeDto> filteredHomeListByDates = filterHomeListByDates(bookDate, leaveDate, filteredHomeListByDistance);

        //filter homes the checking the other reservations
        List<MyHomeDto> filteredHomeListByReservationDates = filterHomeListByReservationDates(bookDate, leaveDate, filteredHomeListByDates);

        //sort by price
        List<MyHomeDto> sortedHomesByPrice = sortHomesByPrice(filteredHomeListByReservationDates);

        allHomesList.setHomes(sortedHomesByPrice);
        return allHomesList;
    }

    private List<MyHomeDto> sortHomesByPrice(List<MyHomeDto> tempListWithAllHomes) {
        return tempListWithAllHomes.stream()
                .sorted(Comparator.comparingDouble(MyHomeDto::getPrice))
                .collect(Collectors.toList());
    }

    private List<MyHomeDto> filterHomeListByMaxPeople(int people, List<MyHomeDto> tempListWithAllHomes) {
        return tempListWithAllHomes.stream()
                .filter(t->t.getMaxPeople()>=people)
                .collect(Collectors.toList());
    }

    private List<MyHomeDto> filterHomeListByReservationDates(Date imerominiaAfixis, Date imerominiaAnaxwrisis, List<MyHomeDto> tempListWithAllHomes) {
        List<MyHomeDto> filteredList = new ArrayList<>();

        for(int i=0; i<tempListWithAllHomes.size(); i++){

            //an den iparxei kratisi gia to spiti tote mporei na ginei book opoiadhpote hmeromhnia
            if(tempListWithAllHomes.get(i).getReservations().isEmpty())filteredList.add(tempListWithAllHomes.get(i));

            for(int j=0; j<tempListWithAllHomes.get(i).getReservations().size(); j++) {

                int einaiHImerominiaAfixisPrinTinImerominiaAfixisApoDB = checkBookingArrivalInReservations(imerominiaAfixis, tempListWithAllHomes.get(i).getReservations(), j);
                int einaiHImerominiaAfixisMetaTinImerominiaAnaxwrisisApoDB = checkBookingLeaveInReservations(imerominiaAfixis, tempListWithAllHomes.get(i).getReservations(), j);

                int einaiHImerominiaAnaxwrisisPrinTinImerominiaAfixisApoDB = checkBookingArrivalInReservations(imerominiaAnaxwrisis, tempListWithAllHomes.get(i).getReservations(), j);
                int einaiHImerominiaAnaxwrisisMetaTinImerominiaAnaxwrisisApoDB = checkBookingLeaveInReservations(imerominiaAnaxwrisis, tempListWithAllHomes.get(i).getReservations(), j);

//                System.out.println("einaiHImerominiaAfixisPrinTinImerominiaAfixisApoDB: "+einaiHImerominiaAfixisPrinTinImerominiaAfixisApoDB);
//                System.out.println("einaiHImerominiaAfixisMetaTinImerominiaAnaxwrisisApoDB: "+einaiHImerominiaAfixisMetaTinImerominiaAnaxwrisisApoDB);
//                System.out.println("einaiHImerominiaAnaxwrisisPrinTinImerominiaAfixisApoDB: "+einaiHImerominiaAnaxwrisisPrinTinImerominiaAfixisApoDB);
//                System.out.println("einaiHImerominiaAnaxwrisisMetaTinImerominiaAnaxwrisisApoDB: "+einaiHImerominiaAnaxwrisisMetaTinImerominiaAnaxwrisisApoDB+"\n");

                if ((einaiHImerominiaAfixisPrinTinImerominiaAfixisApoDB > 0 || einaiHImerominiaAfixisMetaTinImerominiaAnaxwrisisApoDB < 0) &&
                        (einaiHImerominiaAnaxwrisisPrinTinImerominiaAfixisApoDB > 0 || einaiHImerominiaAnaxwrisisMetaTinImerominiaAnaxwrisisApoDB < 0 )) {
                    filteredList.add(tempListWithAllHomes.get(i));
                }
            }
        }
        return filteredList;
    }

    private int checkBookingArrivalInReservations(Date bookDate, List<ReservationDto> reservationDtoList, int i) {
        return reservationDtoList
                .get(i)
                .getBookedDate()
                .compareTo(bookDate);
    }

    private int checkBookingLeaveInReservations(Date bookDate, List<ReservationDto> reservationDtoList, int i) {
        return reservationDtoList
                .get(i)
                .getLeaveDate()
                .compareTo(bookDate);
    }

    private List<MyHomeDto> filterHomeListByDates(Date bookDate, Date leaveDate, List<MyHomeDto> tempListWithAllHomes) {
        List<MyHomeDto> filteredList = new ArrayList<>();

        for(int i=0; i<tempListWithAllHomes.size(); i++){
            int isBookDateAfterOpenBooking = checkBookingArrival(bookDate, tempListWithAllHomes, i);
            int isLeaveDateBeforeCloseBooking = checkBookingLeave(leaveDate, tempListWithAllHomes, i);

            if(isBookDateAfterOpenBooking<=0 && isLeaveDateBeforeCloseBooking>=0) {
                filteredList.add(tempListWithAllHomes.get(i));
            }

        }
        return filteredList;
    }

    private int checkBookingArrival(Date bookDate, List<MyHomeDto> tempListWithAllHomes, int i) {
        return tempListWithAllHomes
                        .get(i)
                        .getOpenBooking()
                        .compareTo(bookDate);
    }

    private int checkBookingLeave(Date bookDate, List<MyHomeDto> tempListWithAllHomes, int i) {
        return tempListWithAllHomes
                        .get(i)
                        .getCloseBooking()
                        .compareTo(bookDate);
    }


    private List<MyHomeDto> filterHomeListByDistance(List<MyHomeDto> homeList, double givenLat, double givenLong) {
        double maxDistance = 30; //kilometers
        List<MyHomeDto> filteredHomes = homeList.stream()
                .map(home -> {
                    double distanceFromEachHome = Helpers.distance(Double.parseDouble(home.getLatitude()),Double.parseDouble(home.getLongitude()), givenLat, givenLong, "K");
                    System.out.println("distance Between visitor search and actual Home "+ distanceFromEachHome);
                    if(distanceFromEachHome < maxDistance)
                        return home;
                    else
                        return null;
                })
                .collect(Collectors.toList());

        while (filteredHomes.remove(null));

        if(filteredHomes.isEmpty() || filteredHomes==null)
            return Collections.emptyList();
        else
            return filteredHomes;
    }
}
