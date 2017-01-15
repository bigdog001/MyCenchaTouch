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
$image_url= formatStr($params->image_url);
$book_name= formatStr($params->book_name);
$author= formatStr($params->author);
$description= formatStr($params->description);
if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $sort = ($_REQUEST['sort'] !=null) ? $_REQUEST['sort'] : '';
    $filter = filterStrGet();
    if($sort!="")
    {
	$sort_str=str_replace('\\','',$sort);       
	$sort_json=json_decode($sort_str);
    }
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
    If (mysql_num_rows($result) > 0)
    {
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
	$arr = array();
	If (mysql_num_rows($result) > 0) {
	    while($obj = mysql_fetch_object($result)){
		$arr[] = $obj;
	    }
	    Echo '{"success": true, 
	    "bookCount":'.$count.',"books":'.json_encode($arr).'}';
	}
	else{
	    die('{"success":false,"message":"读取数据失败"}');
	}
    }
    else{
	die('{"success":false,"message":"读取数据失败"}');
    }
}
else if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $sql="insert into books(image_url,book_name,author,description)";
    $sql=$sql."values(";
    $sql=$sql."'".$image_url."',";  
    $sql=$sql."'".$book_name."',";
    $sql=$sql."'".$author."',";
    $sql=$sql."'".$description."')"; 
    $result=mysql_query($sql);
    if(!$result)
    {
        die ('{"success":false,"message":"追加数据失败"}');
    }
    else
        echo '{"success":true,"message":"追加数据成功"}';
}
else if($_SERVER["REQUEST_METHOD"]=="PUT")
{
    $sql="update books set image_url='".$image_url."',";
    $sql=$sql."book_name='".$book_name."',";
    $sql=$sql."author='".$author."',";
    $sql=$sql."description='".$description."' ";
    $sql=$sql."where id=".$id;
    $result=mysql_query($sql);
    if(!$result)
    {
        die('{"success":false,"message":"修改数据失败"}');
    }
    else
        echo '{"success":true,"message":"修改数据成功"}';
}
else if($_SERVER["REQUEST_METHOD"]=="DELETE")
{
    $sql="delete from books ";
    $sql=$sql."where id=".$id;
    $result=mysql_query($sql);
    if(!$result)
    {
       die('{"success":false,"message":"删除数据失败"}');
    }
    else
        echo '{"success":true,"message":"删除数据成功"}';
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
