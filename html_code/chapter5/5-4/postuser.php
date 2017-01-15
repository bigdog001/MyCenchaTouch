<?php
$name = formatStr($_REQUEST['name']);
$sex = $_REQUEST['sex'];
$password = formatStr($_REQUEST['password']);
$age = $_REQUEST['age'];
$email = formatStr($_REQUEST['email']);
$url = formatStr($_REQUEST['url']);
$memo = formatStr($_REQUEST['memo']);
header('Content-Type: application/json');
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8"); 
$result = mysql_query("SELECT * FROM users where name='".$name."'",$link);
If (mysql_num_rows($result) > 0)
     echo '{"success":false, 
     "errors" : [{"message":'.json_encode("该用户名在数据库中已存在").'}]}';
else{
    $sql="insert into users(name,sex,password,age,email,url,memo)";
    $sql=$sql."values(";
    $sql=$sql."'".$name."',";  
    $sql=$sql."'".$sex."',";
    $sql=$sql."'".$password."',";
    $sql=$sql.$age.",";
    $sql=$sql."'".$email."',";
    $sql=$sql."'".$url."',";
    $sql=$sql."'".$memo."')";    
    mysql_query($sql); 
    echo '{"success":true}';
}
function formatStr($str)
{
    return trim(str_replace("'","''",$str));
}
?>
