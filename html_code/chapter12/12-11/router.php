<?php
require('config.php');
class BogusAction {
    public $action;
    public $method;
    public $data;
    public $tid;
}
$isForm = false;
if(isset($HTTP_RAW_POST_DATA)){
    header('Content-Type: text/javascript');
    $data = json_decode($HTTP_RAW_POST_DATA);
}
else if(isset($_POST['extAction'])){ //表单方式提交
    $isForm = true;
    $data = new BogusAction();
    $data->action = $_POST['extAction'];
    $data->method = $_POST['extMethod'];
    $data->tid = isset($_POST['extTID']) ? $_POST['extTID'] : null; //非文件上传
    $data->data = array($_POST, $_FILES);
}
else{
    die('无效的请求.');
}
function doRpc($cdata){
    global $API;
    try {
	if(!isset($API[$cdata->action])){
  	    throw new Exception('调用了未定义的action: ' . $cdata->action);
	}
        $action = $cdata->action;
        $a = $API[$action];
        doAroundCalls($a['before'], $cdata);
        $method = $cdata->method;
        $mdef = $a['methods'][$method];
        if(!$mdef){
            throw new Exception("调用了未定义的方法: $method on action $action");
        }
        doAroundCalls($mdef['before'], $cdata);
        $r = array(
            'type'=>'rpc',
            'tid'=>$cdata->tid,
            'action'=>$action,
            'method'=>$method
        );
        //require_once("classes/$action.php");
        require_once("$action.php");
        $o = new $action();
        if (isset($mdef['len'])) {
            $params = isset($cdata->data) && is_array($cdata->data) ? $cdata->data : array();
        }
        else {
            $params = array($cdata->data);
        }
        $r['result'] = call_user_func_array(array($o, $method), $params);
        doAroundCalls($mdef['after'], $cdata, $r);
        doAroundCalls($a['after'], $cdata, $r);
    }
    catch(Exception $e){
        $r['type'] = 'exception';
        $r['message'] = $e->getMessage();
        $r['where'] = $e->getTraceAsString();
    }
    return $r;
}
function doAroundCalls(&$fns, &$cdata, &$returnData=null){
    if(!$fns){
        return;
    }
    if(is_array($fns)){
        foreach($fns as $f){
            $f($cdata, $returnData);
        }
    }
    else{
        $fns($cdata, $returnData);
    }
}
$response = null;
if(is_array($data)){
    $response = array();
    foreach($data as $d){
        $response[] = doRpc($d);
    }
}
else{
    $response = doRpc($data);
}
echo json_encode($response);
?>