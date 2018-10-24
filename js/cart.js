_require.define('family-package', function () {
  function familyPackage(opts){
    app = new Vue({
      el:opts.el,
      data:{
        aa:'555555555'
      },
      computed:{

      },
      created:function () {

      },
      methods:{

      },

    })
    return app;
  }
  return familyPackage;
})