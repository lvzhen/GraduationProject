<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {
	/**
	 * 首页课程展示
	 */
	public function index() {
		$courseDb = M('course');
		$ucDb = M('usercourse');
		$user = I('session.user');
		if ($user) {
			$isjoin = $ucDb->where("uid=" . $user['id'])->select();
		}
		$rs = $courseDb->limit(8)->select();
		$this->assign('rs', $rs);
		$this->assign('isjoin', $isjoin);
		$this->display('index');
	}

	/**
	 * 登录操作
	 */
	public function login() {
		$data['user'] = trim(I('u'));
		$data['pwd'] = md5(trim(I('p')));
		$userDb = D('user');
		$rs = $userDb->where('user="'.$data['user'].'" and isteach=0')->find();
		if ($rs) {
			if ($data['pwd'] == $rs['pwd']) {
				# code...
				$d['lasttime'] = time();
				$userDb->where('id=' . $rs['id'])->save($d);
				// $data['avatar'] = $rs['avatar'];
				session('user', $rs);
				echo json_encode(1);
			} else {
				echo json_encode(-1);
			}
		} else {
			echo json_encode(0);
		}
	}

	/**
	 * 注册操作
	 */
	public function signup() {
		// echo phpinfo();
		$data['user'] = trim(I('u'));
		$data['pwd'] = md5(trim(I('p')));
		$data['avatar'] = '/GraduationProject/Public/img/default-avatar.jpg';
		$data['regtime'] = time();
		$data['lasttime'] = time();
		$data['isteach'] = 0;
		$userDb = D('user');
		if (!$userDb->create($data)) {
			# code...
			echo json_encode(0);
			exit();
		} else {
			$rs = $userDb->add($data);
		}
		$rs = $userDb->where('user="' . $data['user'] . '"')->find();
		session('user', $rs);
		echo json_encode(1);
	}

	/**
	 * 退出登录
	 */
	public function signout() {
		session('user', null);
		echo json_encode(1);
	}

	/**
	 * 全部课程
	 */
	public function AllCourse() {
		$ucDb = M('usercourse');
		$user = I('session.user');
		if ($user) {
			$isjoin = $ucDb->where("uid=" . $user['id'])->select();
		}
		$courseDb = M('course');
		$typeDb = M('coursetype');
		$rs = $courseDb->select();
		$type = $typeDb->select();
		$s = $_GET['sort'];
		$t = $_GET['type'];
		if (isset($t) && isset($s)) {
			$count = $courseDb->where("course_type='{$t}'")->count();
			$Page = new \Think\Page($count, 8);
			$rs = $courseDb->where("course_type='{$t}'")->limit($Page->firstRow . ',' . $Page->listRows)->order("$s desc")->select();
		}
		if (!isset($t) && isset($s)) {
			$count = $courseDb->count();
			$Page = new \Think\Page($count, 8);
			$rs = $courseDb->order("$s desc")->limit($Page->firstRow . ',' . $Page->listRows)->select();
		}
		if (isset($t) && !isset($s)) {
			$count = $courseDb->where("course_type='{$t}'")->count();
			$Page = new \Think\Page($count, 8);
			$rs = $courseDb->where("course_type='{$t}'")->limit($Page->firstRow . ',' . $Page->listRows)->order("join_num desc")->select();
		}
		if (!isset($t) && !isset($s)) {
			$count = $courseDb->count();
			$Page = new \Think\Page($count, 8);
			$rs = $courseDb->order('join_num desc')->limit($Page->firstRow . ',' . $Page->listRows)->select();
		}
		$Page->setConfig('header', '<span class="rows">共 %TOTAL_PAGE% 页</span>');
		$Page->setConfig('first', '首页');
		$Page->setConfig('last', '尾页');
		$Page->setConfig('next', '下一页');
		$Page->setConfig('prev', '上一页');
		$show = $Page->show();
		$this->assign('rs', $rs);
		$this->assign('page', $show);
		$this->assign('type', $type);
		$this->assign('t', $t);
		$this->assign('isjoin', $isjoin);
		$this->assign('s', $s);
		$this->display('allcourse');
	}

	/**
	 * 课程信息
	 */
	public function Course() {
		$id = I('get.id');
		$courseDb = M('course');
		$lesDb = M('lesson');
		$browDb = D('browse');
		$lesnum = $lesDb->where("cid=$id")->count();
		$data['ip'] = get_client_ip();
		$data['cid'] = $id;
		if (!$browDb->create($data)) {
		} else {
			$brow = $browDb->add($data);
		}
		$rs = $courseDb->alias('c')->where("c.id=$id")
			->join('lesson l on c.id=l.cid', 'left')
			->join('coursetype ct on c.course_type=ct.id', 'left')
			// ->join('user u on c.teacher=u.id')
			->field('*,c.id coid,l.id leid')
			->select();
		// dump($rs);
		$brownum = $browDb->where("cid=" . $id)->count();
		$this->assign('rs', $rs);
		$this->assign('num', $lesnum);
		$this->assign('bnum', $brownum);
		$this->display('course');
	}

	/**
	 * 添加用户课程记录
	 */
	// public function addnum() {
	// 	$user = I('session.user');
	// 	$data['cid'] = I('post.cid');
	// 	$data['uid'] = $user['id'];
	// 	$courseDb = M('course');
	// 	$ucDb = D('usercourse');
	// 	$jnum = $ucDb->where("cid=$data.cid")->count();
	// 	if (!$ucDb->create($data)) {
	// 	} else {
	// 		$rs = $ucDb->add($data);
	// 		$res = $courseDb->where("id=$data.uid")->setField('join_num', $jnum + 1);
	// 	}
	// 	$this->ajaxReturn('1');
	// }

	/**
	 * 用户课程观看记录
	 */
	// public

	/**
	 * 课程学习信息
	 */
	public function Courselist() {
		$user = I('session.user');
		$data['cid'] = I('get.id');
		$over = I('get.over');
		$data['uid'] = $user['id'];
		$courseDb = M('course');
		$lesDb = M('lesson');
		$browDb = D('browse');
		$ucDb = D('usercourse');
		$ulDb = D('userlesson');

		if (!$ucDb->create($data)) {
		} else {
			$ucrs = $ucDb->add($data);
			$jnum = $ucDb->where("cid=" . $data['cid'])->count();
			$res = $courseDb->where("id=" . $data['cid'])->setField('join_num', $jnum);
		}

		$ucid = $ucDb->where('uid=' . $data['uid'] . ' and cid=' . $data['cid'])->getField('id');
		$lesnum = $lesDb->where("cid=" . $data['cid'])->count();
		$rs = $ucDb->alias('uc')->where('uc.id=' . $ucid)
			->join('course c on uc.cid=c.id', 'left')
			->join('lesson l on l.cid=uc.cid', 'left')
			// ->join('user u on c.teacher=u.id')
			->select();
		foreach ($rs as $k => $v) {
			$ul['lord'] = $v['order'];
			$ul['ucid'] = $ucid;
			$ul['islearn'] = 0;
			$ul['lastlearn'] = 0;
			if (!$ulDb->create($ul)) {
				// echo $ulDb->getError();
			} else {
				$ulrs = $ulDb->add($ul);
			}
		}
		$rs = $ucDb->alias('uc')->where('uc.id=' . $ucid)
			->join('course c on uc.cid=c.id', 'left')
			->join('lesson l on l.cid=uc.cid', 'left')
			->join('userlesson ul on l.order=ul.lord and uc.id=ul.ucid', 'left')
			->join('coursetype ct on c.course_type=ct.id', 'left')
			->field('*,uc.id ucid,uc.cid cid')
			->select();
		if ($over) {
			$ov = $ulDb->where("lord=" . $over . ' and ucid=' . $ucid)->setField('done', 1);
		}
		$ord = $ulDb->where('ucid=' . $rs[0]['ucid'] . ' and lastlearn=1')->getField('lord');
		if (!$ord) {
			$ord = 1;
		}
		$brownum = $browDb->where("cid=" . $data['cid'])->count();
		// dump($rs);
		// dump($ucid);
		$this->assign('rs', $rs);
		$this->assign('num', $lesnum);
		$this->assign('ord', $ord);
		$this->assign('bnum', $brownum);
		$this->display('course-list');
	}

	/**
	 * 测试题
	 */
	public function check(){
		$cid = I('get.cid');
		$p = I('get.p') ? I('get.p') : 0;
		$chkDb = M('checkout');
		$count = $chkDb->where('cid='.$cid)->count();
		if ($count == 0) {
			$this->ajaxReturn(0);
		}else{
			if ($p >= $count) {
				$p = $count-1;
			}
			$rs = $chkDb->where('cid='.$cid)->limit($p.",1")->select();
			
			$this->assign('next',$p);
			$this->assign('count',$count);
			$this->assign('cid',$cid);
			$this->assign('rs',$rs);
			// dump($rs);
			$s = session();
			// dump($s);
			if (IS_AJAX) {
				$html = $this->fetch('public/practice');
				$this->ajaxReturn($html);
			}
		}
	}

	/**
	 * 把答案存入session
	 */
	public function answ(){
		$v = I('get.v');
		$id = I('get.id');
		if ($v) {
			session('q'.$id,$v);
		}else{
			session('q'.$id,null);
		}
		
	}

	/**
	 * 测试结果
	 */
	public function score(){
		// $s = session();
		// dump($s);
		$cid = I('cid');
		$chkDb = M('checkout');
		$rs = $chkDb->where('cid='.$cid)->select();
		// dump(count($rs));
		$count = count($rs);
		$score = 0;
		$my_answ = array();
		foreach ($rs as $k => $v) {
			$answ = session('q'.$v['id']);
			if ($answ) {
				$my_answ[$v['id']] = $chkDb->where('cid='.$cid.' and id='.$v['id'])->field('option_'.$answ)->find();
				$my_answ[$v['id']] = $my_answ[$v['id']]['option_'.$answ];
			}else{
				$my_answ[$v['id']] = null;
			}
			if ($answ == $v['answer']) {
				$score += 1;
			}
		}
		// dump($rs);
		// dump($my_answ);
		$this->assign('rs',$rs);
		$this->assign('myansw',$my_answ);
		$this->assign('score',$score);
		$this->assign('count',$count);
		if (IS_AJAX) {
			$html = $this->fetch('public/score');
			$this->ajaxReturn($html);
		}
	}

	/**
	 * 视频播放界面信息
	 */
	public function coursevideo() {
		$user = I('session.user');
		$uid = $user['id'];
		$over = I('get.over');
		$ord = I('get.ord');
		$cid = I('get.cid');
		$lesDb = M('lesson');
		$couDb = M('course');
		$ulDb = D('userlesson');
		$ucDb = D('usercourse');
		$ucid = $ucDb->where('uid=' . $uid . ' and cid=' . $cid)->getField('id');
		$ulDb->where("ucid=" . $ucid)->setField('lastlearn', 0);
		$ulDb->where("lord=" . $ord . ' and ucid=' . $ucid)->setField('lastlearn', 1);
		$ulDb->where("lord=" . $ord . ' and ucid=' . $ucid)->setField('islearn', -1);
		// $lrs = $lesDb->where("id=$lid")->find();
		if ($over) {
			$ov = $ulDb->where("lord=" . $over . ' and ucid=' . $ucid)->setField('done', 1);
		}
		$ucrs = $ucDb->alias('uc')->where('uc.id=' . $ucid)
			->join('course c on uc.cid=c.id', 'left')
			->join('userlesson ul on uc.id=ul.ucid', 'left')
			->join('lesson l on l.order=ul.lord and l.cid=uc.cid', 'left')
			->select();
		foreach ($ucrs as $k => $v) {
			if ($v['lord'] == $ord) {
				$src = $v['path'];
				$type = $v['type'];
			}
		}
		// $crs = $couDb->alias('c')->where("c.id=$cid")->join('lesson l on c.id=l.cid', 'left')->field('*,c.id coid,l.id leid')->select();
		// dump($lrs);
		// dump($ucrs);
		// echo $src;
		// $this->assign('lrs', $lrs);
		$this->assign('ucrs', $ucrs);
		$this->assign('src', $src);
		$this->assign('type', $type);
		$this->assign('ord', $ord);
		$this->assign('cid', $cid);
		$this->display('course-video');
	}

	/**
	 * 搜索课程
	 */
	public function search(){
		$keywords = I('result');
		if($keywords !== ''){
			$ucDb = M('usercourse');
			$user = I('session.user');
			if ($user) {
				$isjoin = $ucDb->where("uid=" . $user['id'])->select();
			}
			$courseDb = M('course');
			$where = array('course_name'=>array('like','%'.$keywords.'%'));
			$count = $courseDb->where($where)->count();
			$Page = new \Think\Page($count, 8);
			$res = $courseDb->where($where)->limit($Page->firstRow . ',' . $Page->listRows)->select();
			$Page->setConfig('header', '<span class="rows">共 %TOTAL_PAGE% 页</span>');
			$Page->setConfig('first', '首页');
			$Page->setConfig('last', '尾页');
			$Page->setConfig('next', '下一页');
			$Page->setConfig('prev', '上一页');
			$page = $Page->show();
			$this->assign('res',$res);
			$this->assign('isjoin',$isjoin);
			$this->assign('count', $count);
			$this->assign('page', $page);
		}
			$this->display('search');	
	}

	public function modpwd(){
		$opwd = md5(I('post.opwd'));
        $npwd = md5(I('post.npwd'));
        $user = session('user');
        $usrDb = M('user');
        // $this->ajaxReturn($user);

        if ($user['id'] !== null) {
            $rs = $usrDb->where('user="' . $user['user'] .'"')->find();
            if ($opwd !== $rs['pwd']) {
                $this->ajaxReturn('-1');
                // $this->ajaxReturn($rs);
            } else {
                $s = $usrDb->where('user="' . $user['user'] .'"')->setfield('pwd', $npwd);
                session('user', null);
                $this->ajaxReturn('1');
            }
        }
	}
}