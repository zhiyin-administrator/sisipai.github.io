<?php
$link = mysqli_connect('localhost', 'root', '1234') or die("数据库连接失败！");
my_error($link, __LINE__, "use sisipai");

$res = my_error($link, __LINE__, 'select * from user_db');
$flag = 1;
while ($items = mysqli_fetch_assoc($res)) {
    if ($items['email'] == $_POST['email']) {
        $array = array(
            "status" => "200",
            "reason" => "Return Tips",
            "msg" => '该邮箱已被注册！请重新输入！',
            "error" => "",
        );
        echo json_encode($array);
        $flag = 0;
        break;
    }
}
if ($flag) {
    if(!isset($_POST['phone_num'])){
        $my_phone_num = '';
    }else{
        $my_phone_num = $_POST['phone_num'];
    }
    my_error($link, __LINE__, "insert into user_db values ('" . $_POST['email'] . "','" . $_POST['pet_name'] . "','" . $_POST['password'] . "','" . $my_phone_num . "');");
    $array = array(
        "status" => "200",
        "reason" => "Return Tips",
        "msg" => '注册成功！',
        "error" => "",
    );
    echo json_encode($array);
}


function my_error($link, $my_line, $sql)
{
    $res = mysqli_query($link, $sql);
    if (!$res) {
        $array = array(
            "status" => "200",
            "reason" => "Return Tips",
            "msg" => "出错啦！行号为" . $my_line . "<br/>" . "SQL执行错误，错误编号为：" . mysqli_errno($link) . "<br/>" . "SQL执行错误，错误信息为：" . mysqli_error($link) . "<br/>",
            "error" => "",
        );
        echo json_encode($array);
        exit();
    }
    return $res;
}

?>