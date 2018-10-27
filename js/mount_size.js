function spec(opts) {
  var _config = {
    template:opts.template,
    componentName:opts.componentName,
    props:[],
    data:function () {
      return{
        
      }
    },
    created:function () {
      
    },
    watch:{

    },
    methods:{

    }
  };

  var config = $.extend(_config,opts)

  //非全局组件
  if (opts.inInstance) {
    return componentConfig;
  } else {
    //全局组件
    Vue.component(config.componentName, config);
  }
}