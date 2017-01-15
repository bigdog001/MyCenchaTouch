<?php
$PHP_SELF=$_SERVER['PHP_SELF'];//获取getFiles脚本文件的相对路径
$folder=dirname(dirname(__FILE__)); //获取getFiles脚本文件的目录（假设为MyApp)的上层目录（假设为SenchaTouch2)
$path = '../../'.substr($folder,strrpos($folder,'\\')+1).'/'; //获取getFiles脚本文件的当前路径（假设为MyApp)的上层路径（假设为SenchaTouch2),path=../../SenchaTouch2/
$nodes = array();
$nodes1 = getSubFolderAndFile($path,$nodes);
$json_packet = array(
    'id'   =>$path,
    'fileName' =>$folder,
    'children'=>$nodes1
);
echo json_encode($json_packet);
function getSubFolderAndFile($directory,$nodes)
{
    $subnodes = array();
    $subnodes1 = array();
    $d = dir($directory);
    while($f = $d->read()){
        if($f == '.' || $f == '..' || substr($f, 0, 1) == '.') continue;
        $name = $directory . $f;
        if(is_dir($name)){
            $name=$name.'/'; 
            $subnodes1=getSubFolderAndFile($name,$subnodes);    
            $nodes[] = array(
                'fileName' => iconv("gbk","utf-8",$f),
                'id'   =>iconv("gbk","utf-8",$directory).iconv("gbk","utf-8",$f),
                'children'=>$subnodes1
            );
        }
        else {
            $nodes[] = array(
                'fileName' =>iconv("gbk","utf-8",$f),
                'id'   =>iconv("gbk","utf-8",$directory).iconv("gbk","utf-8",$f),
                'leaf' => true
            );
        }
    }
    $d->close();
    return $nodes;
}
?>
