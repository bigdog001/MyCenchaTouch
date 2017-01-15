<?
$link=mysql_connect("localhost","root","root"); 
mysql_query("SET NAMES UTF8"); 
mysql_select_db("mysql"); 
header('Content-Type: application/json');
$result = mysql_query("SELECT * FROM users WHERE name = '".$_POST['name']."' and password='".$_POST['password']."'",$link);
if(!$result)
{
    die ('{"success":false,"message":"数据库操作失败"}');
}  
If (mysql_num_rows($result) > 0) {
    $obj = mysql_fetch_object($result);
    Echo '{"success": true,"data":['.json_encode($obj).']}';
}else{
   die ('{"success":false,"message":"输入的用户名或密码不正确"}');
}
?>
