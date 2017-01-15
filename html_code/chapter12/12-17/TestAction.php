<?php
class TestAction {
    private $link;
    private function connect(){
        $this->link=mysql_connect("localhost","root","root"); 
        mysql_select_db("mysql"); 
        mysql_query("SET NAMES UTF8"); 
    }
    public function getBook($id){
        $this->connect();
        $result = mysql_query('SELECT * FROM books where id='.$id,$this->link);
        If (mysql_num_rows($result) > 0) {
            return mysql_fetch_object($result);
        }
    }
    public function updateBook($data){
        $this->connect();
        $sql="update books set image_url='".$data->image_url."',";
        $sql=$sql."book_name='".$data->book_name."',";
        $sql=$sql."author='".$data->author."',";
        $sql=$sql."description='".$data->description."' ";
        $sql=$sql."where id=".$data->id;
        $result=mysql_query($sql);
        if(!$result)
        {
            return '{"success":false,"message":"修改数据失败"}';
        }
        else
            return '{"success":true}';
    }
}
?>