<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8"); 
$result = mysql_query('SELECT id, genre FROM genres',$link);
If (mysql_num_rows($result) > 0) {
    while ($obj = mysql_fetch_object($result)) {
        $arr[] = $obj;
    }
}
Echo json_encode($arr);
?>
