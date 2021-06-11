<?php
  header("content-type:text/html;chartset = utf-8");
  error_reporting(0);
  // 获取表单中的值
  $username = $_GET["username"];
  $password = $_GET["password"];
  //链接数据库，登陆的数据库名字和密码
  $servername = "localhost:3306";
  $dbusername = "Durian";
  $dbpassword = "337910";
  //选择的数据库名字
  $database = "durian";

  // 进行链接
  $conn = mysql_connect($servername, $dbusername, $dbpassword);
  if (!$conn) {
    //输出一条信息，并退出脚本
    die("Could not connect:".mysql_error());
  }
  //更改默认选择的数据库
  mysql_select_db($database, $conn);
  $sql = "SELECT * FROM users WHERE name = '".$username."'";
  $result = mysql_query($sql);
  //返回query查询到的结果里的行数
  $sum = mysql_num_rows($result);

  if ($sum == 0) {
    echo "用户名不存在！";
  }else {
    // 重置结果集指针的行数，该结果集来自query查询结果，0表示第一行
    mysql_data_seek($result, 0);
    //取出数据
    $str = "";
    //从结果集中取出一行作为数字数组
    $row = mysql_fetch_row($result);
    // 选取密码
    $str = $row[2];
    if ($str !== $password) {
      echo "密码错误！";
    }else {
      //密码正确
      echo "success";
    }
  }
  //关闭数据库
  mysql_close($conn);
  ?>
