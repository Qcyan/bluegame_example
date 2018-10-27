function spec(opts) {
  var _config = {
    template:opts.template,
    componentName:opts.componentName,
    props:{
      //for循环里面的可以直接写，不用去父那边绑了
      goods: {
        type: Object,
        default: function () {
          return {};
        },
      },
      maxAmount: {
        type: Number,
        default: 9999999
      },
      nowAmount: {
        type: Number,
        default: 1
      }
    },
    data:function () {
      return $.extend({
        amount: 1
      }, opts.data);
    },
    created:function () {
      this.amount = this.nowAmount;
    },
    watch:{
      'amount': function () {
        this.parseIntAmount();
      },
      "nowAmount": function () {
        this.amount = this.nowAmount;
      }
    },
    methods:{
      addAmount: function (event) {
        ++this.amount;
        event.stopPropagation();
      },
      minusAmount: function (event) {
        --this.amount;
        event.stopPropagation();
      },
      parseIntAmount: function () {
        if (this.amount < 0) {
          this.amount = 1;
        }
        var amount = parseInt(this.amount);
        this.amount = (function () {
          if (isNaN(amount)) {
            return ''
          } else if (amount <= 0) {
            return 1;
          } else {
            if (amount > this.maxAmount) {
              return this.maxAmount
            } else {
              return amount
            }
          }
        }.bind(this))();
        this.$emit('change-amount', this);
      }
    }
  };

  if (!opts) opts = {}

  var config = $.extend(_config,opts)

  //非全局组件
  if (opts.inInstance) {
    return componentConfig;
  } else {
    //全局组件
    Vue.component(config.componentName, config);
  }
}