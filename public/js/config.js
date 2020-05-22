(function () {
    var _config = {
        api: {}, //后台api封装
        domain: '', //cookie顶级域
        Enums: {},//枚举封装
    };


    var prefix = window.server;

    /**
     * 自定义接口：以/api/开头，路由以短横线分隔，最后一段表示权限点，例如/api/account-reset-account 会转发至/api/account/reset(最后一段作为权限点)；如果不使用短横线路由，则不处理 例如/api/account/reset
     * 通用标准接口：以/s-api/开头，路由以短横线分隔，分别含义为：1段：模块名，2段：服务名；3段：处理方法名；4段：权限点
     */
    var _init = function () {
        _config.api = {

        };
        _config.Enums = {};
    };

    _init();

    //配置
    this.Config = _config;

})();
