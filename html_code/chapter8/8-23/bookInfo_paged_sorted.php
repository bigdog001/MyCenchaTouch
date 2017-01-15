<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8"); 
$start = ($_REQUEST['start'] != '') ? $_REQUEST['start'] : 0;
$limit = ($_REQUEST['limit'] != '') ? $_REQUEST['limit'] : 10;
$sort = ($_REQUEST['sort'] !=null) ? $_REQUEST['sort'] : '';

if($sort!="")
{
    $sort_str=str_replace('\\','',$sort);       
    $sort_json=json_decode($sort_str);
}
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
    if($sort!='')
    {
        $field=$sort_json[0]->property;
        $dir=$sort_json[0]->direction;
        $sql = $count_sql ." order by ".$field." ".$dir;
    }
    else
        $sql = $count_sql;
    $sql = $sql . " LIMIT ".$start.", ".$limit;
    
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
        Echo '{"success": true, "bookCount":'.$count.',"books":'.json_encode($arr).'}';
    }
    else{
        echo '{"success":false,"message":"读取数据失败"}';
    }
}
else{
    echo '{"success":false,"message":"读取数据失败"}';
}
?>
