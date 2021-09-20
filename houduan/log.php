<?php
//var_dump('haha');
//var_dump($_POST);
if (!(isset($_POST['email']) || !isset($_POST['password']))) {
    $res_arr = array();
    $tishi = '用户名或密码为空！';
} else {
    $post_arr = array('email' => $_POST['email'], 'password' => $_POST['password']);
//    $post_arr = array('email' => 'wrz12138@hdu.edu.cn', 'password' => '1234567');

    $link = mysqli_connect('localhost', 'root', '1234') or die("数据库连接失败！");
    my_error($link, __LINE__, "use sisipai");

    $res = my_error($link, __LINE__, 'select * from user_db;');
    $res_arr = array();
    $s = 0;
    while ($temp = mysqli_fetch_assoc($res)) {
        $temp_arr = array('email' => $temp['email'], 'password' => $temp['password']);
        $res_arr[$s] = $temp_arr;
        $s++;
    }
}
//echo $res_arr;
//$ss = '';
$flag = false;
foreach ($res_arr as $items) {
//    $ss += '!' + $items['email'];
    if ($items['email'] == $post_arr['email'] && $items['password'] == $post_arr['password']) {
        $tishi = '登录成功！';
        $flag = true;
        break;
    }
}
//echo $ss;
if (!$flag) {
    $tishi = '用户名或密码错误！';
}

$array = array(
    "status" => "200",
    "reason" => "Return Tips",
    "msg" => $tishi,
    "error" => "",
);
echo json_encode($array);

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