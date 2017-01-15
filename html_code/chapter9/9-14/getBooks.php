<?
$link=mysql_connect("localhost","root","root"); 
mysql_select_db("mysql"); 
mysql_query("SET NAMES UTF8");
$node = isset($_REQUEST['node']) ? $_REQUEST['node'] : '';
$nodes = array();
$nodes1 = getChildren('0','',$nodes);
$json_packet = array(
    "children"=>$nodes1
);
echo json_encode($json_packet);
function getChildren($parentId,$genre,$nodes)
{
    $subnodes = array();
    $subnodes1 = array();
    $sql="select t.*,(select count(1) from genres where genres.parentId=t.id) childcount,(select count(1) from genres inner join books on books.genreid=genres.id where books.genreid=t.id) bookcount from genres t where parentId=".$parentId;    
    $result = mysql_query($sql);
    if(!$result)
    {
        die('{"success":false,"message":"读取数据失败"}');
    }
    else if(mysql_num_rows($result) > 0)
    {
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)){
            if($row["bookcount"]>0||$row["childcount"]>0)
            {
                $subnodes1=getChildren($row["id"],$row["name"],$subnodes);  
                $nodes[]=array(
                    'name'=>$row["name"],
                    'id'=>$row["id"],
                    "children"=>$subnodes1
                );    
            }
            else if($row["childcount"]==0)
            {
                $nodes[]=array(
                    'name'=>$row["name"],
                    'id'=>$row["id"],
                    'leaf' => true
                ); 
            }
        }
        return $nodes; 
    }
    else
    {
        $sql="select * from books where genreid=".$parentId;
        $result = mysql_query($sql);
        if(!$result)
        {
            die('{"success":false,"message":"读取数据失败"}');
        }
        else
        {
            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)){
                $subnodes[] = array(
                    'name' => $row["book_name"],
                    'id'   => $row["id"],
                    'leaf' => true
                );                
            }
            return $subnodes;
        }
    }
}
?>
