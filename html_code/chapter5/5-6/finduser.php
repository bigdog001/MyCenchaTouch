<?
$link=mysql_connect("localhost","root","root"); 
mysql_query("SET NAMES UTF8"); 
mysql_select_db("mysql"); 
header('Content-Type: application/json');
$result = mysql_query('SELECT * FROM users WHERE id ='.$_REQUEST['id'],$link);
//$result = mysql_query('SELECT * FROM users WHERE name="'.formatStr($_REQUEST['name']).'"',$link);
If (mysql_num_rows($result) > 0) {
    $obj = mysql_fetch_object($result);
    echo '{"success": true,"data":['.json_encode($obj).']}';
}else{
   die('{"success": false}');
}
function formatStr($str)
{
    return trim(str_replace("'","''",$str));
}
?>
