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
$filter = filterStrGet();
if($filter!="")
{
    $filter_json=json_decode($filter,true);    
}
$count_sql = "SELECT * FROM books";
if($filter!='')
{
    $field=$filter_json[0]["property"];
    $value=$filter_json[0]["value"];
    $count_sql = $count_sql ." where ".$field." like '%".$value."%'";
}
$result = mysql_query($count_sql);
if(!$result)
{
    die('{"success":false,"message":"读取数据失败"}');
}
$count=0;
If (mysql_num_rows($result) > 0){
    $count=mysql_num_rows($result) ;
    if($sort!='')
    {
        $sortFieldStr=" order by ";
        $count1=count($sort_json);
        for($i=0;$i<$count1;$i++)
        {
            if($i!=0)
                $sortFieldStr=$sortFieldStr.",";        
            $field=$sort_json[$i]->property;
            $dir=$sort_json[$i]->direction;
            $sortFieldStr=$sortFieldStr.$field." ".$dir." ";
        }
        $sql = $count_sql .$sortFieldStr;
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
        echo '{"success": true, "bookCount":'.$count.',"books":'.json_encode($arr).'}';
    }
    else{
        die('{"success":false,"message":"读取数据失败"}');
    }
}
else{
    die('{"success":false,"message":"读取数据失败"}');
}
function filterStrGet()
{
    $a = explode('&',$_SERVER["REQUEST_URI"]);
    $i = 0;
    while ($i < count($a)) {
        $b = split('=', $a[$i]);
        if(htmlspecialchars(urldecode($b[0]))=="filter")
        {
            $filter=urldecode($b[1]);
            return $filter;
        }
        $i++; 
    }
}
function formatStr($str)
{
    return trim(str_replace("'","''",$str));
}
?>
