<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8"); 
$page=($_REQUEST['page'] != '') ? $_REQUEST['page'] : 1;
$limit = ($_REQUEST['limit'] != '') ? $_REQUEST['limit'] : 10;
$start=($page-1)*$limit;
$count_sql = "SELECT * FROM books";
$result = mysql_query($count_sql);
if(!$result)
{
    echo '{"success":false,"message":"读取数据失败"}';
    exit();
}
$count=0;
If (mysql_num_rows($result) > 0){
    $count=mysql_num_rows($result) ;
    $sql = $count_sql . " LIMIT ".$start.", ".$limit;
    $result = mysql_query($sql);   
    if(!$result)
    {
        die('{"success":false,"message":"读取数据失败"}');
    } 
    $arr = array();
    If (mysql_num_rows($result) > 0) {
        while($obj = mysql_fetch_object($result)){
            $arr[] = $obj;
        }
        echo '{"success": true, "bookCount":'.$count.',"books":'.json_encode($arr).'}';
    }
    else{
        echo '{"success":false,"message":"读取数据失败"}';
    }
}
else{
    echo '{"success":false,"message":"读取数据失败"}';
}
?>
