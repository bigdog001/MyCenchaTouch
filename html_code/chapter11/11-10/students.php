<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8");
$filter = filterStrGet();
if($filter!="")
{
    $filter_json=json_decode($filter,true);    
}
$sql = "SELECT id,classId,number,studentName name,age,phone FROM student";
if($filter!='')
{
    $value=$filter_json[0]["value"];
    $sql = $sql ." where classID=".$value;
}
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
    Echo json_encode($arr);
}
else
    echo '{"success":true}';
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
?>
