<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8");
$raw  = '';
$httpContent = fopen('php://input', 'r');
while ($kb = fread($httpContent, 1024)) {
    $raw .= $kb;
}
fclose($httpContent);
$params = json_decode($raw);
$id = formatStr($params->id);
$class_id= formatStr($params->classinfo_id);
$number= formatStr($params->number);
$name= formatStr($params->name);
$age= $params->age;
$phone=$params->phone;
if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $filter = filterStrGet();
    if($filter!="")
    {
        $filter_json=json_decode($filter,true);    
    }
    $sql = "SELECT id,classId classinfo_id,number,studentName name,age,phone from student";
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
        echo json_encode($arr);
    }    
}
else if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $sql="insert into student(classId,number,studentName,age,phone)";
    $sql=$sql."values(";
    $sql=$sql."'".$class_id."',";  
    $sql=$sql."'".$number."',";
    $sql=$sql."'".$name."',";
    $sql=$sql.$age.",";
    $sql=$sql."'".$phone."')"; 
    $result=mysql_query($sql);
    if(!$result)
    {
        die ('{"success":false,"message":"追加学生失败"}');
    }
    else
        echo '{"success":true,"message":"追加学生成功"}';
}
else if($_SERVER["REQUEST_METHOD"]=="PUT")
{
    $sql="update student set classId='".$class_id."',";
    $sql=$sql."number='".$number."',";
    $sql=$sql."studentName='".$name."',";
    $sql=$sql."age=".$age.",";
    $sql=$sql."phone='".$phone."' ";
    $sql=$sql."where id=".$id;
    $result=mysql_query($sql);
    if(!$result)
    {
        die('{"success":false,"message":"修改学生失败"}');
    }
    else
        echo '{"success":true,"message":"修改学生成功"}';
}
else if($_SERVER["REQUEST_METHOD"]=="DELETE")
{
    $sql="delete from student ";
    $sql=$sql."where id=".$id;
    $result=mysql_query($sql);
    if(!$result)
    {
       die('{"success":false,"message":"删除学生失败"}');
    }
    else
        echo '{"success":true,"message":"删除学生成功"}';
}
function formatStr($str)
{
    return trim(str_replace("'","''",$str));
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
?>