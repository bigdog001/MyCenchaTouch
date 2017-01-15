<?php
class TestAction {
    function getBook($id){
        $link=mysql_connect("localhost","root","root"); 
        mysql_select_db("mysql"); 
        mysql_query("SET NAMES UTF8"); 
        $result = mysql_query('SELECT * FROM books where id='.$id,$link);
        If (mysql_num_rows($result) > 0) {
            return mysql_fetch_object($result);
        }
    }
}
?>