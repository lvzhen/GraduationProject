<?php
    namespace Admin\Controller;

    use Think\Controller;

    /**
     *课程管理控制器
     */
    class CourseController extends Controller
    {
        /**
         * **************************************课程类型操作********************************************************/
        /**
         * 检查课程类型编码是否存在
         */
        public function isexist()
        {
            $code = I('post.code');
            $id = I('post.id');
            $typeDb = M('coursetype');
            if (isset($id)) {
                # code...
                $rs = $typeDb->where('code = "' . $code . '"')->find();
                if ($rs) {
                    # code...
                    if ($rs['id'] == $id) {
                        # code...
                        $this->ajaxReturn('0');
                    } else {
                        $this->ajaxReturn('-1');
                    }
                } else {
                    $this->ajaxReturn('0');
                }

            } else {
                $rs = $typeDb->where('code = "' . $code . '"')->find();
                if (isset($rs)) {
                    # code...
                    $this->ajaxReturn('-1');
                    exit();
                }
                $this->ajaxReturn('0');
            }

        }

        /**
         * @return
         * 添加课程类型
         */
        public function addclassType()
        {
            $data['class_type'] = I('post.name');
            $data['ord'] = I('post.order');
            $data['code'] = I('post.code');
            $typeDb = M('coursetype');
            $rs = $typeDb->add($data);
            $this->ajaxReturn($rs);
        }

        /**
         * @return
         * 加载课程类型列表
         */
        public function coursetype()
        {
            $typeDb = M('coursetype');
            $type = $typeDb->order('ord')->select();
            $this->assign('type', $type);
            $this->display();
        }

        /**
         * 编辑课程类型
         */
        public function editclass()
        {
            $id = I('post.id');
            $data['class_type'] = I('post.name');
            $data['ord'] = I('post.order');
            $data['code'] = I('post.code');
            $typeDb = M('coursetype');
            $rs = $typeDb->where("id={$id}")->save($data);
            $this->ajaxReturn($rs);
        }

        /**
         * 删除课程类型
         */
        public function delclass()
        {
            $id = I('post.id');
            $typeDb = M('coursetype');
            $rs = $typeDb->where("id={$id}")->delete();
            $this->ajaxReturn($rs);
        }
        /**
         * ******************************************课程类型操作结束***********************************************/

        /**
         * ****************************************课程操作*********************************************************/

        /**
         * 课程列表
         */
        public function course()
        {
            $typeDb = M('coursetype');
            $courseDb = M('course');
            $rs['type'] = $typeDb->getField('id,class_type', true);
            if (session('admin_user.isteach') !== '2') {
                $id = session('admin_user.id');
                $course = $courseDb->alias('c')
                    ->where('c.teacher=' . $id)
                    ->join('coursetype ct ON c.course_type = ct.id', 'left')
                    ->join('user u ON c.teacher = u.id','left')
                    ->field('c.id,c.course_name,ct.class_type,c.teacher,c.join_num,c.addtime,c.course_type,c.course_brief,c.course_pic,u.user')
                    ->order('c.id desc')
                    ->select();
            } else {
                $course = $courseDb->alias('c')
                    ->join('coursetype ct ON c.course_type = ct.id', 'left')
                    ->join('user u ON c.teacher = u.id','left')
                    ->field('c.id,c.course_name,ct.class_type,c.teacher,c.join_num,c.addtime,c.course_type,c.course_brief,c.course_pic,u.user')
                    ->order('c.id desc')
                    ->select();
            }
            // dump($course);
            //exit();
            $this->assign('type', $rs['type']);
            $this->assign('course', $course);
            $this->display();
        }

        /**
         * 添加课程
         */
        public function addcourse()
        {
            $data['course_name'] = I('post.name');
            $data['course_brief'] = I('post.brief');
            $data['course_type'] = I('post.type');
            $data['addtime'] = time();
            if (I('post.type')) {
                $data['course_type'] = I('post.type');
            } else {
                $data['course_type'] = null;
            }
            $auser = I("session.admin_user");
            $data['teacher'] = $auser['id'];
            $data['join_num'] = 0;
            $data['course_pic'] = '/GraduationProject/Public/img/course.png';
            $courseDb = M('course');
            $rs = $courseDb->add($data);
            $this->ajaxReturn($rs);
        }

        /**
         * 修改课程
         */
        public function editcourse()
        {
            $id = I('post.id');
            $data['course_name'] = I('post.name');
            $data['course_brief'] = I('post.brief');
            $data['course_type'] = I('post.type');
            $courseDb = M('course');
            $rs = $courseDb->where("id={$id}")->save($data);
            $this->ajaxReturn($rs);
        }

        /**
         * 删除课程
         */
        public function delcourse()
        {
            $id = I('post.id');
            $courseDb = M('course');
            $rs = $courseDb->where("id={$id}")->delete();
            $this->ajaxReturn($rs);
        }

        /**
         * 课时管理
         */
        public function lesson()
        {
            $id = I('get.id');
            $courseDb = M('course');
            $lesDb = M('lesson');
            $rs['course'] = $courseDb->where("id=$id")->find();
            $rs['les'] = $lesDb->where("cid=$id")->select();
            $this->assign('rs', $rs);
            $this->display();
            // dump($rs);
        }

        /**
         * 添加课时
         */
        public function addlesson()
        {
            $data['cid'] = I('post.cid');
            $data['path'] = I('post.path');
            $data['name'] = I('post.name');
            $data['brief'] = I('post.brief');
            $data['title'] = I('post.title');
            $data['type'] = I('post.type');
            $lesDb = M('lesson');
            $rs = $lesDb->data($data)->add();
            $res = $lesDb->where('cid=' . $data['cid'])->select();
            foreach ($res as $k => $v) {
                $v['order'] = $k + 1;
                $lesDb->data($v)->save();
            }
            $this->ajaxReturn($rs);
        }

        /**
         * 修改课时内容
         */
        public function editlesson()
        {
            $id = I('post.id');
            $data['path'] = I('post.path');
            $data['name'] = I('post.name');
            $data['brief'] = I('post.brief');
            $data['title'] = I('post.title');
            $data['type'] = I('post.type');
            $lesDb = M('lesson');
            $rs = $lesDb->where("id={$id}")->save($data);
            $this->ajaxReturn($rs);
        }

        /**
         * 删除课时
         */
        public function del()
        {
            $id = I('post.id');
            $lesDb = M('lesson');
            $rs = $lesDb->where("id={$id}")->delete();
            $this->ajaxReturn($rs);
        }

        /**
         * 上传视频
         */
        public function upload()
        {
            $upload = new \Think\Upload(); // 实例化上传类
            $upload->maxSize = 0; // 设置附件上传大小
            $upload->exts = array('mp4', 'flv', 'wmv', 'mkv'); // 设置附件上传类型
            $upload->rootPath = '../GraduationProject/upload/'; // 设置附件上传根目录
            $upload->savePath = 'video/'; // 设置附件上传（子）目录
            // 上传文件
            $info = $upload->upload();
            if (!$info) {
                // 上传错误提示错误信息
                $error = $upload->getError();
                echo json_encode($error);
            } else {
                foreach ($info as $file) {
                    $rs['path'] = $file['savepath'] . $file['savename'];
                    $rs['type'] = $file['type'];
                }
                echo json_encode($rs);
            }
        }

        /**
         * 上传封面图片
         */
        public function uploadpic()
        {
            $upload = new \Think\Upload(); // 实例化上传类
            $upload->maxSize = 0; // 设置附件上传大小
            $upload->exts = array('jpg', 'gif', 'png', 'jpeg'); // 设置附件上传类型
            $upload->rootPath = '../GraduationProject/upload/'; // 设置附件上传根目录
            $upload->savePath = 'pic/'; // 设置附件上传（子）目录
            // 上传文件
            $info = $upload->upload();
            if (!$info) {
                // 上传错误提示错误信息
                $error = $upload->getError();
                echo json_encode($error);
            } else {
                foreach ($info as $file) {
                    $path = $file['savepath'] . $file['savename'];
                }
                echo json_encode($path);
                // 上传成功
                // $this->ajaxReturn($info['file']['key']);
                // $rs['savePath'] = $info['savePath'];
                // echo json_encode($rs);
            }
        }

        /**
         * 保存封面图片
         */
        public function savepic()
        {
            $id = I('post.id');
            $data['course_pic'] = I('post.path');
            $courseDb = M('course');
            $rs = $courseDb->where("id={$id}")->save($data);
            $this->ajaxReturn($rs);
        }

        /**
         * 测试管理
         */
        public function checkout()
        {
            $id = I('get.id');
            $courseDb = M('course');
            $ckDb = M('checkout');
            $rs['course'] = $courseDb->where("id=$id")->find();
            $rs['ck'] = $ckDb->where("cid=$id")->select();
            $this->assign('rs', $rs);
            $this->display();
        }

        /**
         * 添加题目
         */
        public function addques()
        {
            $data['cid'] = I('post.cid');
            $data['subject'] = I('post.checkout');
            $data['option_A'] = I('post.option-a');
            $data['option_B'] = I('post.option-b');
            $data['option_C'] = I('post.option-c');
            $data['option_D'] = I('post.option-d');
            $data['answer'] = I('post.answ');
            $ckDb = M('checkout');
            $rs = $ckDb->data($data)->add();
            $this->ajaxReturn($rs);
        }

        /**
         * 修改题目
         */
        public function editques()
        {
            $id = I('post.id');
            $data['subject'] = I('post.checkout');
            $data['option_A'] = I('post.option-a');
            $data['option_B'] = I('post.option-b');
            $data['option_C'] = I('post.option-c');
            $data['option_D'] = I('post.option-d');
            $data['answer'] = I('post.answ');
            $ckDb = M('checkout');
            $rs = $ckDb->where("id=$id")->save($data);
            $this->ajaxReturn($rs);
        }

        /**
         * 删除题目
         */
        public function delques()
        {
            $id = I('post.id');
            $ckDb = M('checkout');
            $rs = $ckDb->where("id=$id")->delete();
            $this->ajaxReturn($rs);
        }

    }