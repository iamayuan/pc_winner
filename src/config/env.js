/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */
let baseUrl = ''; 
let baseImgPath = 'https://tulaoban.oss-cn-shanghai.aliyuncs.com/';

if (process.env.NODE_ENV == 'development') {
	baseUrl = '/api';
}else{
	baseUrl = 'http://wechatcw.yiung.com:8080';
}

export {
	baseUrl,
	baseImgPath
}