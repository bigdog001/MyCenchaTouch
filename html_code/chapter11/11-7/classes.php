<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8");
$sql="select class.id classId,
      class.className,
      student.id studentId,
      student.number,
      student.studentName,
      student.age,
      student.phone 
      from class 
      inner join student 
      on class.id=student.classID 
      order by class.id,student.id";
$result = mysql_query($sql);
if(!$result)
{
    die('{"success":false,"message":"读取数据失败"}');
}
$row= mysql_fetch_array($result, MYSQL_ASSOC);
$classId=$row["classId"];
$className=$row["className"];
$studentArray[] = array(
    'id' => $row["studentId"],
    'number'=>$row["number"],
    'name' =>$row["studentName"],
    'age' => $row["age"],
    'phone' => $row["phone"]
); 
$studentCount=1;
$classArray = array();
while($row = mysql_fetch_array($result, MYSQL_ASSOC))
{
    if($classId<>$row["classId"])
    {
        $classArray[] = array(
                'id' => $classId,
                'name'=>$className,
                'studentCount'=> $studentCount,
                'students' => $studentArray
        ); 
        $classId=$row["classId"];
        $className=$row["className"];
        $studentArray = array();
        $studentArray[] = array(
                'id' => $row["studentId"],
                'number'=>$row["number"],
                'name'  =>$row["studentName"],
                'age' => $row["age"],
                'phone' => $row["phone"]
        ); 
        $studentCount=1;
    }
    else
    {
        $studentArray[] = array(
                'id' => $row["studentId"],
                'number'=>$row["number"],
                'name'  =>$row["studentName"],
                'age' => $row["age"],
                'phone' => $row["phone"]
        ); 
        $studentCount+=1;
    }
}
$classArray[] = array(
    'id' => $classId,
    'name'=>$className,
    'studentCount'=> $studentCount,
    'students' => $studentArray
); 
echo json_encode($classArray);
?>