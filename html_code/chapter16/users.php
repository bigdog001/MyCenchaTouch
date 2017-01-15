<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8");
$id = formatStr($_POST['id']);
$name= formatStr($_POST['name']);
$password= formatStr($_POST['password']);
$sql = "SELECT * FROM users where name='".$name."'";
$result = mysql_query($sql);
if(!$result)
    die('{"success":false,"message":"数据库操作失败"}');
If (mysql_num_rows($result) > 0)
    die('{"success":false,"message":"该用户名已存在"}');
$sql="insert into users(name,password)";
$sql=$sql."values(";
$sql=$sql."'".$name."',";  
$sql=$sql."'".$password."')"; 
$result=mysql_query($sql);
if(!$result)
{
    die ('{"success":false,"message":"数据库操作失败"}');
}       
else
    echo '{"success":true}';
function formatStr($str)
{
    return trim(str_replace("'","''",$str));
}
?>
