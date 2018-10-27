app = new Vue({
  el: '#app',
  data: {
    allSelect: false,
    renderList: [],
    list: [
      {
        shopname: '商铺1',
        id: 8,
        goods: [
          {
            type: 1,
            goodsname: '无花果',
            count: 2,
            maxcount: 30,
            price: '18元',
            id: 222,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4"},
                {id: "3272", value: "小只", sort: "6"}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4"},
                {id: "3274", value: "白色", sort: "6"}
              ]
            }
          },
          {
            type: 1,
            goodsname: '甜果',
            count: 2,
            maxcount: 30,
            price: '18元',
            id: 223,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4"},
                {id: "3272", value: "小只", sort: "6"}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4"},
                {id: "3274", value: "白色", sort: "6"}
              ]
            }
          }
        ],


      },
      {
        shopname: '商铺2',
        id: 9,
        goods: [
          {
            type: 2,
            goodsname: '咸鱼',
            count: 2,
            maxcount: 30,
            price: '18元',
            id: 224,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4"},
                {id: "3272", value: "小只", sort: "6"}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4"},
                {id: "3274", value: "白色", sort: "6"}
              ]
            }
          },
          {
            type: 1,
            goodsname: '甜鱼',
            count: 2,
            maxcount: 30,
            price: '18元',
            id: 225,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4"},
                {id: "3272", value: "小只", sort: "6"}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4"},
                {id: "3274", value: "白色", sort: "6"}
              ]
            }
          }
        ]

      }
    ],
    seltype_num: 0,
    headsel_value: ['全部', '减价中', '折扣'],
    timer:false
  },
  computed: {},
  methods: {
    selAll: function (target) {
      this.allSelect = target.checked
      var _this = this
      $.each(this.list, function (index, value) {
        $.each(_this.list[index].goods, function (idx, val) {
          val.sel = _this.allSelect
        })
      })
      this.timer_sel()
    },
    selshop: function (item) {
      item.sel = !item.sel
      $.each(item.goods, function (idx, val) {
        val.sel = item.sel
      })
      this.timer_sel()
    },
    selgoods: function (goods, shopIndex) {
      goods.sel = !goods.sel
      this.timer_sel()
    },
    timer_sel:function () {
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        this.sel_public()
      }.bind(this),300)
    },
    sel_public:function () {
      this.allSelect = true
      var selall_state = true
      $.each(this.list,function (index,value) {
        var selshop_state = true
        $.each(value.goods,function (idx,val) {
          if (val.sel == false) {
            selshop_state = false
            value.sel = false
          }
          if(selshop_state == true){
            value.sel = true
          }
          if(value.sel == false){
            this.allSelect  = false
            selall_state = false
          }
          if(selall_state == true){
            this.allSelect = true
          }
        }.bind(this))
      }.bind(this))
    },
    headsel: function (index) { //tab切换
      this.seltype_num = index;
      //所有勾选状态去掉
      $.each(this.list, function (index, value) {
        value.sel = false
        $.each(value.goods, function (idx, val) {
          val.sel = false
        })
      })
      //深拷贝，始外部的指向不同，但是push进去的指向还是相同的
      this.renderList = deepCopy(this.list);

      $.each(this.renderList, function (index, value) {
        value.goods = []
      }.bind(this))

      $.each(this.renderList,function (idx,val) {
        $.each(this.list[idx].goods,function (index,value) {
            if(value.type == this.seltype_num){
              val.goods.push(value)
            }
          }.bind(this))
      }.bind(this))

      if(this.seltype_num == 0){
        this.renderList = this.list
      }

    },
  },
  mounted: function () {
    var _this = this
    $.each(this.list, function (index, value) {
      _this.$set(value, 'sel', false)
      $.each(value.goods, function (idx, val) {
        _this.$set(val, 'sel', false)
      })
    })


    this.renderList = this.list;
  },

})

function deepCopy(obj) {
  if (!obj || !(obj instanceof Array) && !(obj.toString() === "[object Object]")) return obj;
  const _obj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if ((obj instanceof Array) || (obj instanceof Object)) {
      _obj[key] = deepCopy(obj[key]);
    } else {
      _obj[key] = obj[key];
    }
  }
  return _obj;
}

