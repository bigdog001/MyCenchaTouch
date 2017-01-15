<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8"); 
$result = mysql_query('SELECT * FROM books',$link);
if(!$result)
{
    die('{"success":false,"message":"读取数据失败"}');
}
If (mysql_num_rows($result) > 0) {
    while ($obj = mysql_fetch_object($result)) {
        $arr[] = $obj;
    }
    echo '{"success": true, "books":'.json_encode($arr).'}';
}
else{
   echo '{"success":false,"message":"读取数据失败"}';
}
?>

