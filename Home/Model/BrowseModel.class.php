<?php
namespace Home\Model;
use Think\Model;

/**
 *
 */
class BrowseModel extends Model {
	protected $_validate = array(
		array('ip,cid', '', 'ip唯一', '1', 'unique'), // 唯一ip添加浏览次数+1
	);

	// protected function chkuni($arr) {
	// 	$rs = M('browse')->where("ip=" . $arr['ip'] . " and cid=" . $arr['cid'])->find();
	// 	if ($rs) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// }

}