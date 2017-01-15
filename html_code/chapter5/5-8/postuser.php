<?php
$id = formatStr($_REQUEST['id']);
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
if($id=="")
    $result = mysql_query("SELECT * FROM users where name='".$name."'",$link);
else
    $result = mysql_query("SELECT * FROM users where name='".$name."' and
    id<>".$id,$link);
If (mysql_num_rows($result) > 0)
     echo '{"success":false, "errors" : [{"message":'.json_encode("该用户名在
     数据库中已存在").'}]}';
else{
    if($id=="")
    {
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
    }
    else
    {
        $sql="update users ";
        $sql=$sql."set name='".$name."',"; 
        $sql=$sql."sex='".$sex."',"; 
        $sql=$sql."password='".$password."',"; 
        $sql=$sql."age=".$age.","; 
        $sql=$sql."email='".$email."',"; 
        $sql=$sql."url='".$url."',"; 
        $sql=$sql."memo='".$memo."' "; 
        $sql=$sql."where id=".$id; 
        mysql_query($sql);
    }
    echo '{"success":true}';
}
function formatStr($str)
{
    return trim(str_replace("'","''",$str));
}
?>

