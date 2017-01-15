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
$class_id= formatStr($params->class_id);
$number= formatStr($params->number);
$name= formatStr($params->name);
$age= $params->age;
$phone=$params->phone;
if($_SERVER["REQUEST_METHOD"]=="POST")
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
?>