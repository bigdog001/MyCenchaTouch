<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8");
$sql = "SELECT id,classId class_id,number,studentName name,age,phone from student";
$result = mysql_query($sql);
if(!$result)
{
    die('{"success":false,"message":"读取学生数据失败"}');
}
if (mysql_num_rows($result) > 0)
{
    while($obj = mysql_fetch_object($result)){
        $arr[] = $obj;
    }
    echo json_encode($arr);
}
else
    echo '{"success":true}';
?>
