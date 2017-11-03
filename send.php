<?php

$utm_source = trim($_POST["utm_source"]);
$utm_medium = trim($_POST["utm_medium"]);
$utm_campaign = trim($_POST["utm_campaign"]);
$utm_term = trim($_POST["utm_term"]);
$utm_content = trim($_POST["utm_content"]);
$cm_title = trim($_POST["cm_title"]);

$date = date("H:i:s / m.d.y");
$ip_client = $_SERVER['REMOTE_ADDR'];

// **********************************************

if (empty($_POST['js'])) {
    $mes= "<table style='width: 100%; background-color: #f8f8f8;'>";

    $mes.= "
        <tr style='background-color: #d6d6d6'>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>Время/Дата отправки сообщения</td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$date</td>
        </tr>";

    foreach ( $_POST as $key => $value ) {
        if ($value != "" && $key != "utm_source" && $key != "utm_medium" && $key != "utm_campaign" && $key != "utm_term" && $key != "utm_content" && $key != "cm_title" && $key != "usr_file") {
            $mes.= "
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>".preg_replace("/_/", " ", $key)."</td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
                </tr>";
        }
    }


    $mes.= "<tr><td style='padding: 10px; colspan='2'></td></tr>";

    $mes.= "
        <tr>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>IP посетителя</td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$ip_client</td>
        </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>Канал кампании  (utm_medium)</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_medium</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>Источник кампании (utm_source)</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_source</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>Название кампании (utm_campaign)</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_campaign</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>Ключевое слово кампании (utm_term)</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_term</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>Содержание кампании (utm_content)</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_content</td>
            </tr>";

    $mes.= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>cm_title</td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$cm_title</td>
            </tr>";

    $mes.= "</table>";

    $mes.= "<div style='text-align: right; color: #939393; margin: 20px 0 0 0'>Клиенты для Вашего бизнеса. Команда Markello.</div>";


    $to = "starmatf@mail.ru"; //Ваш e-mail адрес
    $subject .= "Заявка с сайта";
    $subject = "=?utf-8?b?" . base64_encode($subject) . "?=";

    $boundary = "--".md5(uniqid(time())); 
    $mailheaders = "MIME-Version: 1.0;\r\n"; 
    $mailheaders .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n"; 
    $mailheaders .= "From: admin \r\n"; 

    $multipart = "--$boundary\r\n"; 
    $multipart .= "Content-Type: text/html; charset=\"utf-8\"\r\n";
    $multipart .= "Content-Transfer-Encoding: 7bit\r\n";    
    $multipart .= "\r\n";
    $multipart .= $mes;

    $message_part = '';
    if (is_uploaded_file($_FILES['usr_file']['tmp_name'])) {
        $filename = $_FILES['usr_file']['name'];
        $filetype = $_FILES['usr_file']['type'];
        $filesize = $_FILES['usr_file']['size'];

        $message_part = "\r\n--$boundary\r\n"; 
        $message_part .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";  
        $message_part .= "Content-Transfer-Encoding: base64\r\n"; 
        $message_part .= "Content-Disposition: attachment; filename=\"$filename\"\r\n"; 
        $message_part .= "\r\n";
        $message_part .= chunk_split(base64_encode(file_get_contents($_FILES['usr_file']['tmp_name'])));
        $message_part .= "\r\n--$boundary--\r\n";
    }
    $multipart .= $message_part;

    if ($filesize < 26214400) {
        if (mail($to, $subject, $multipart, $mailheaders)) {
            echo "Отправлено"; //Всё Ok!
        }else{
            echo "Не отправлено";
        }   
    }
    else {
        echo "Размер всех файлов превышает 25 МБ";
    }
}

?>
