<?php
namespace Home\Model;
use Think\Model;

/**
 *
 */
class UsercourseModel extends Model {
	protected $_validate = array(
		array('uid','0','不存在的uid',1,'notequal'),
		array('uid,cid', '', '唯一', 1, 'unique'),
	);
}