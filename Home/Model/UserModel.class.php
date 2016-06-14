<?php
namespace Home\Model;
use Think\Model;

/**
 *
 */
class UserModel extends Model {
	protected $_validate = array(
		array('user', 'require', '用户名必须！'), // 用户名必须
		array('user', '', '帐号名称已经存在！', 1, 'unique', 1),
	);
}