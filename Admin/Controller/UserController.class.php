<?php
    namespace Admin\Controller;

    use Think\Controller;

    /**
     * 用户管理
     */
    class UserController extends Controller
    {

        public function user()
        {
            $usrDb = M('user');
            $rs = $usrDb->where('isteach=0')->select();
            $this->assign('rs', $rs);
            $this->display();
        }

        public function teacher()
        {
            $usrDb = M('user');
            $rs = $usrDb->where('isteach=1')->select();
            $this->assign('rs', $rs);
            $this->display();
        }

        /**
         * 添加教师
         */
        public function addteach()
        {
            $data['user'] = I('post.name');
            $data['pwd'] = md5(I('post.pwd'));
            $data['avatar'] = '/GraduationProject/Public/img/default-avatar.jpg';
            $data['regtime'] = time();
            $data['lasttime'] = time();
            $data['isteach'] = 1;
            $userDb = D('Home/user');
            if (!$userDb->create($data)) {
                # code...
                $this->ajaxReturn(0);
                exit();
            } else {
                $rs = $userDb->add($data);
                $this->ajaxReturn(1);
            }
        }

        /**
         * 修改密码
         */
        public function editpwd()
        {
            $id = I('post.id');
            $p['pwd'] = md5(I('post.pwd'));
            $usrDb = M('user');
            $rs = $usrDb->where('id=' . $id)->save($p);
            $this->ajaxReturn($rs);
        }
    }
