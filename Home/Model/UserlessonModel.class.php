<?php
namespace Home\Model;
use Think\Model;

/**
 *
 */
class UserlessonModel extends Model {
	protected $patchValidate = true;
	protected $_validate = array(
		array('lord', 'require', '非空', '1'),
		array('lord,ucid', '', '唯一', '1', 'unique'),
	);

	// protected function chkuni($arr) {
	// 	$rs = M('userlesson')->where("lord=" . $arr['lord'] . " and ucid=" . $arr['ucid'])->find();
	// 	if ($rs) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// }
}