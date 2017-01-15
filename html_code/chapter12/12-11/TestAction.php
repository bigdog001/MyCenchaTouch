<?php
class TestAction {
    function join($data){
        $name = $data->name;
        $age = $data->age;
        return $name."的年龄为".$age."岁";
    }
}
?>