<?php
    namespace Admin\Controller;

    use Think\Controller;

    class IndexController extends Controller
    {
        public function index()
        {
            if (isset($_SESSION['admin_user'])) {
                # code...
                $this->display('index');
            } else {
                $this->display('login');
            }

        }

        public function login()
        {
            $user['name'] = trim(I('post.user_admin'));
            $user['pwd'] = md5(trim(I('post.pwd_admin')));
            $usrDb = M('user');
            $rs = $usrDb->where('user="' . $user['name'] . '" and isteach=1')->find();
            if (C('LOGIN_NAME') == $user['name'] || $rs) {
                $user['id'] = $rs['id'];
                if (C('LOGIN_PWD') == $user['pwd'] || $rs['pwd'] == $user['pwd']) {
                    if ($user['id']) {
                        $d['lasttime'] = time();
                        $usrDb->where('id=' . $rs['id'])->save($d);
                    }
                    session('admin_user', $user);
                    $this->success('登录成功!', U('Admin/Index/index'));
                } else {
                    $this->error('登录名或密码错误!');
                }
            } else {
                $this->error('用户不存在');
            }
        }

        public function signout()
        {
            session('admin_user', null);
            echo json_encode(1);
        }

        /**
         * 用户修改密码
         */
        public function mPwd()
        {
            $opwd = md5(I('post.opwd'));
            $npwd = md5(I('post.npwd'));
            $user = session('admin_user');
            $usrDb = M('user');
            if ($user['id'] !== null) {
                $rs = $usrDb->where('user="' . $user['name'] .'"')->find();
                if ($opwd !== $rs['pwd']) {
                    $this->ajaxReturn('-1');
                } else {
                    $s = $usrDb->where('user="' . $user['name'] .'"')->setfield('pwd', $npwd);
                    session('admin_user', null);
                    $this->ajaxReturn('1');
                }
            }
        }
    }