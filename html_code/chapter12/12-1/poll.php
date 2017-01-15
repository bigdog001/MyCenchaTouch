<?php
echo json_encode(array(
    'type'=>'event',
    'name'=>'message',
    'data'=>'轮询成功，时间: '. date('Y/m/d H:i:s')
));
?>
