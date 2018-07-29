
import { baseUrl } from "@/config/env";
let opt = { 
    login:{
        method:"POST",
        url: baseUrl+'/wechat/login/userLogin'
    },
    updatePassword:{
        method:"POST",
        url: baseUrl+'/wechat/user/updatePassword'
        
    },
    upload:{
        method:"POST",
        url:baseUrl+'/wechat/base/upload'
    },
    getProjectList:{//项目列表
        method:"GET",
        url: baseUrl+'/wechat/project/getProjectList'
    },
    addProject:{//新增项目
        method:"POST",
        url: baseUrl+'/wechat/project/addProject'
    },
    modProject:{
        method:"POST",
        url:baseUrl+'/wechat/project/modifyProject'
    },
    getUser:{//用户信息
        method:"GET",
        url: baseUrl+'/wechat/user/getUser'
    },
    addUser:{//新增用户
        method:"POST",
        url: baseUrl+'/wechat/user/addUser'
    },
    modUser:{//编辑用户
        method:"POST",
        url: baseUrl+'/wechat/user/modifyUser'
    },
    updatePassword:{//修改密码
        method:"POST",
        url: baseUrl+'/wechat/user/updatePassword'
    },
    getMenuList:{//菜单列表
        method:"GET",
        url: baseUrl+'/wechat/menu/getMenuList'
    },
    addMenuList:{//新增菜单
        method:"POST",
        url: baseUrl+'/wechat/menu/addMenuList'
    },
    modMenuList:{//编辑菜单
        method:"POST",
        url: baseUrl+'/wechat/menu/modifyMenuList'
    },
    deleMenuList:{//删除菜单
        method:"POST",
        url: baseUrl+'/wechat/menu/deleteMenu'
    },
    
    getArticleList:{//文章列表
        method:"GET",
        url: baseUrl+'/wechat/article/getArticleList'
    },
    addArticle:{//添加文章
        method:"POST",
        url: baseUrl+'/wechat/article/addArticle'
    },
    modArticle:{//编辑文章
        method:"POST",
        url: baseUrl+'/wechat/article/modifyArticle'
    },
    delArticle:{//删除文章
        method:"POST",
        url: baseUrl+'/wechat/article/deleteArticle'
    },
    getFeedbackList:{//反馈列表
        method:"GET",
        url: baseUrl+'/wechat/feedback/getFeedbackList'
    },
    addFeedbackList:{//提交反馈数据
        method:"POST",
        url: baseUrl+'/wechat/feedback/addFeedbackList'
    },
    deleteFeedback:{//提交反馈数据
        method:"POST",
        url: baseUrl+'/wechat/feedback/deleteFeedback'
    }
    
    
    

}
export default opt;
