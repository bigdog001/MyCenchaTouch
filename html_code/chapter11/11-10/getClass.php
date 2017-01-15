<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8"); 
$classArray[] = array(
    'id' =>-1,
    'name' =>'选择'
); 
$result = mysql_query('SELECT id, className name FROM class',$link);
If (mysql_num_rows($result) > 0) {
    while ($obj = mysql_fetch_object($result)) {
        $classArray[] = $obj;
    }
}
Echo json_encode($classArray);
?>
