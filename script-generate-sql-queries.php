<?php
$host = "host";
$user = "user";
$lastHomeId = 1;
/////////////////////////////////////////
echo 
"INSERT INTO `homerent`.`roles` (name) VALUES('ROLE_USER');"."<br>".
"INSERT INTO `homerent`.`roles` (name) VALUES('ROLE_MODERATOR');"."<br>".
"INSERT INTO `homerent`.`roles` (name) VALUES('ROLE_ADMIN');"."<br>".
"INSERT INTO `homerent`.`home_category` (`homecategory_title`, `homecategory_id`) VALUES ('Private Room', 1);"."<br>".
"INSERT INTO `homerent`.`home_category` (`homecategory_title`, `homecategory_id`) VALUES ('Shared Room', 2);"."<br>".
"INSERT INTO `homerent`.`home_category` (`homecategory_title`, `homecategory_id`) VALUES ('Full House', 3);"."<br>".
"INSERT INTO `homerent`.`users` (`approved`, `email`, `first_name`, `id`, `last_name`, `password`, `telephone`, `username`) VALUES (1, 'admin@homerent.com', 'admin', 1, 'admin', '\$2a\$10\$YHVRGOscVYeMbIjkf5qRg.lYqB43jrIh1baf2SyeI5K3DfL8Mvj4G', '+306911111111', 'admin');"."<br>".
"INSERT INTO `homerent`.`user_roles` (`user_id`, `role_id`) VALUES (1, 3);"."<br>".
"INSERT INTO `homerent`.`users` (`approved`, `email`, `first_name`, `id`, `last_name`, `password`, `telephone`, `username`) VALUES (1, 'user@homerent.com', 'User', 2, 'Sir. User', '\$2a\$10\$YHVRGOscVYeMbIjkf5qRg.lYqB43jrIh1baf2SyeI5K3DfL8Mvj4G', '+306911111111', 'user');"."<br>".
"INSERT INTO `homerent`.`user_roles` (`user_id`, `role_id`) VALUES (2, 1);"."<br><br>";

for($i=3; $i<100; $i++)
{
    echo "INSERT INTO `homerent`.`users` (`approved`, `email`, `first_name`, `id`, `last_name`, `password`, `telephone`, `username`) VALUES (1, '".$host.$i."@homerent.com', '".$host.$i."', $i, '".$host.$i."', '\$2a\$10\$YHVRGOscVYeMbIjkf5qRg.lYqB43jrIh1baf2SyeI5K3DfL8Mvj4G', '+306911111111', '".$host.$i."');";
    echo "<br>";
    echo "INSERT INTO `homerent`.`user_roles` (`user_id`, `role_id`) VALUES ($i, 2);";
    echo "<br>";
    $randomNumber = getHomeRandomNumber($lastHomeId);
    $tempLastHomeId = $randomNumber;
    for($homeNumber=$lastHomeId; $homeNumber<$randomNumber; $homeNumber++)
    {
        echo "INSERT INTO `homerent`.`myhome`
        (`myhome_id`, `ac`, `myhome_address`, `bathrooms`, `bedrooms`, `beds`, `close_booking`, `description`, `elevator`, `extra_person_price`, `heating`, `house_rules`, `kitchen`, `myhome_address_latitude`, `myhome_address_longitude`, `max_people`, `min_overnights`, `neighborhood`, `open_booking`, `overnight_price`, `parking`, `price`, `square_meters`, `transport`, `tv`, `wifi`, `homecategory_id`, `owner_id`, `rule_events`, `rule_pets`, `rule_smoking`) 
        VALUES 
        ($homeNumber, ".getTrueOrFalse().", '".getRandomAddress()."', ".getRandomNumber().", ".getRandomNumber().", ".getRandomNumber().", '2020-12-01', 'It is a nice place to stay', ".getTrueOrFalse().", ".getRandomPrice().", ".getTrueOrFalse().", 'We have some rules', ".getTrueOrFalse().", ".getRandomDouble().", ".getRandomDouble().", ".getRandomNumber().", 0, '".getRandomAddress()."', '2020-01-01', ".getRandomPrice().", ".getTrueOrFalse().", ".getRandomPrice().", ".getRandomSM().", '".getRandomTransport()."', ".getTrueOrFalse().", ".getTrueOrFalse().", ".getHomeCategory().", $i,'".getYesOrNo()."','".getYesOrNo()."','".getYesOrNo()."');";
        echo "<br>";
    }
    $lastHomeId = $tempLastHomeId;
    echo "<br>";

}

echo
"INSERT INTO `homerent`.`reservation` (`booked`, `booked_date`, `leave_date`, `myhome_id`, `reservation_id`, `user_id`) VALUES (1, '2020-09-02', '2020-09-29', 1, 1, 2);"
."<br>".
"INSERT INTO `homerent`.`reservation` (`booked`, `booked_date`, `leave_date`, `myhome_id`, `reservation_id`, `user_id`) VALUES (1, '2020-03-02', '2020-03-29', 1, 2, 2);";
echo "<br>";

$tempLastMessageId = 20;
$lastMessageId = 1;
for($id=3; $id<100; $id++)
{
    $newMessages = rand(1,30);
    $maxMessages =$lastMessageId+$newMessages;
    for($messages=$lastMessageId; $messages<$maxMessages; $messages++)
    {
        $hours = rand(10,23);
        $minutes = rand(10,59);
        $seconds = rand(10,59);
        
        $sender = guessSender($id);
        $receiver = guessReceiver($id,$sender);
        $receiverUsername = guessReceiverUsername($id,$sender);
        echo "
        INSERT INTO `homerent`.`messages` (`created_timestamp`, `is_read`, `message_text`, `recipient_id`, `recipient_username`, `user_id`) VALUES ('2020-09-10 $hours:$minutes:$seconds', 0, '".getRandomMessage()."', $sender, '".$receiverUsername."', $receiver);
        ";
        echo "<br>";
    }
    $lastMessageId = $tempLastMessageId;
}

function getTrueOrFalse() {
    $TrueOrFalse = array("1", "0");
    $result = $TrueOrFalse[rand(0, count($TrueOrFalse) - 1)];
    return $result;
}

function getRandomSM() {
    return rand(30,120);
}

function guessSender($id) {
    $random = rand(1,2);
    if($random==1)return $id;
    else return 2; //user id
}

function guessReceiver($id,$senderId) {
    if($senderId==2)return $id;
    else return $senderId;
}

function guessReceiverUsername($id, $senderId) {
    if($senderId==2)return "user";
        else return "host".$id;
}

function getHomeRandomNumber($lastHomeId) {
    return rand($lastHomeId,$lastHomeId+10);
}

function getRandomNumber() {
    return rand(2,10);
}

function getRandomDouble() {
    return rand(500000, 600000) / 1000000;
}

function getRandomPrice() {
    return rand(40,500);
}

function getYesOrNo() {
    $yesOrNo = array("Yes", "No");
    $result = $yesOrNo[rand(0, count($yesOrNo) - 1)];
    return $result;
}

function getHomeCategory() {
    $homeCategory = array("1", "2", "3");
    $result = $homeCategory[rand(0, count($homeCategory) - 1)];
    return $result;
}

function getRandomAddress() {
    $myarray = array(
        "28 Oktovriou Street",
        "3 Septemvriou Street",
        "Achaias Street",
        "Achaion Street",
        "Achaiou Street",
        "Acharnon Street",
        "Achilleos Street",
        "Achniadon Street",
        "Achridos Street",
        "Adanon Street",
        "Adelfon Chali Street",
        "Adelfon Diogenidi Street",
        "Adelfon Emmanouil Street",
        "Admitou Street",
        "Adonidos Street",
        "Adrastou Street",
        "Adrianeiou Street",
        "Adrianou Street",
        "Adrianoupoleos Street",
        "Aeropis Street",
        "Aeroporon Street",
        "Aeroporou Papanastasiou Dimitriou Street",
        "Aetionos Street",
        "Aetiou Street",
        "Aeton Street",
        "Aetorrachis Street",
        "Afaias Square",
        "Afaias Street",
        "Afentouli Theodorou Street",
        "Afidnaion Street",
        "Afroditis Street",
        "Aftokratoron Angelon Street",
        "Aftokratoros Nikolaou Street",
        "Aftomedontos Street",
        "Afxentiou Grigoriou Street",
        "Agalianou Street",
        "Agamemnonos Street",
        "Aganippis Street",
        "Agapinoros Street",
        "Agapinou Tellou Street"
    );
    $result = $myarray[rand(0, count($myarray) - 1)];
    return $result;
}

function getRandomTransport() {
    $myarray = array(
        "Turn Left",
        "Turn Right",
        "Go straight",
        "Go straight on at the lights",
        "Go across the roundabout",
        "Take the first road on your left",
        "Take the first street on your right",
        "Go on for about 2 minutes",
        "Go on for about 100 metres",
        "Walk or drive down the hill",
        "You can see it facing you",
        "It’s where two roads meet at a 90° angle",
        "It’s where two roads meet at a 40° angle",
        "Continue past something so that is is now behind you"
    );
    
    $result1 = $myarray[rand(0, count($myarray) - 1)];
    $result2 = $myarray[rand(0, count($myarray) - 1)];
    $result3 = $myarray[rand(0, count($myarray) - 1)];
    $result4 = $myarray[rand(0, count($myarray) - 1)];
    $result5 = $myarray[rand(0, count($myarray) - 1)];
    $result6 = $myarray[rand(0, count($myarray) - 1)];

    $result = $result1." and ".$result2." and ".$result3." and ".$result4." and ".$result5." and ".$result6;
    return $result;
}

function getRandomMessage() {
    $myarray = array(
        "Aloha",
        "Hello!",
        "How are you?",
        "OK",
        "Can you ask me again?",
        "What do you think about the house photos?",
        "Awesome",
        "Perfect",
        "Questions about booking?",
        "Tell me please",
        "Tell me more",
        "Reservations are ok?",
        "Sure",
        "Yeah",
        "No",
        "Are you ok?",
        "House is ok!",
        "House is awesome!",
        "There are some house rules",
        "Can you see the directions?",
        "Nice chat"
    );
    
    $result = $myarray[rand(0, count($myarray) - 1)];

    return $result;
}
?>