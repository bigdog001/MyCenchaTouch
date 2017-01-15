<?php
class TestAction {
    public function getBooks($data){
        $link=mysql_connect("localhost","root","root"); 
        mysql_select_db("mysql"); 
        mysql_query("SET NAMES UTF8");      
        $count_sql = "SELECT * FROM books";
        $filter=$data->filter[0];
        if($filter!=null)
        {
	    $field=$filter->property;
	    $value=$filter->value;
	    $count_sql = $count_sql ." where ".$field." like '%".$value."%'";
        }
        $result = mysql_query($count_sql);
        if(!$result)
        {
	    return '{"success":false,"message":"读取数据失败"}';
        }
        $count=0;
        if (mysql_num_rows($result) > 0)
        {
	    $count=mysql_num_rows($result) ;
            $sort = $data->sort[0];
	    if($sort!=null)
	    {
	        $field=$sort->property;
	        $dir=$sort->direction;
	        $sql = $count_sql ." order by ".$field." ".$dir;
	    }   
	    else
	        $sql = $count_sql; 

            $result = mysql_query($sql);
	    $arr = array();
	    if (mysql_num_rows($result) > 0) {
	        while($obj = mysql_fetch_object($result)){
		    $arr[] = $obj;
	        }
	        return '{"success": true, 
	        "bookCount":'.$count.',"books":'.json_encode($arr).'}';
	    }
	    else{
	        return '{"success":false,"message":"读取数据失败"}';
	    }
        }
        else{
	    return '{"success":false,"message":"读取数据失败"}';
        }
    }     
}
?>