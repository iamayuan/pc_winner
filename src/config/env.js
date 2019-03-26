/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */
let baseUrl = ''; 
let baseImgPath = 'https://juxuan.oss-cn-hangzhou.aliyuncs.com/';

if (process.env.NODE_ENV == 'development') {
	baseUrl = '/api';
}else{
	baseUrl = 'https://wechat.nbjuxuan.com';
}

export {
	baseUrl,
	baseImgPath
}