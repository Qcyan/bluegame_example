// 加减数量组件
var opts = {
  template: "#goodsListMount",
  componentName: "goods-list-mount"
}
spec(opts)




app = new Vue({
  el: '#app',
  data: {
    allSelect: false,
    allSelGoods_State:{},
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
            kc:8,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4"},
                {id: "3272", value: "小只", sort: "6",checked:true}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4",checked:true},
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
            kc:8,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4",checked:true},
                {id: "3272", value: "小只", sort: "6"}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4"},
                {id: "3274", value: "白色", sort: "6",checked:true}
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
            kc:8,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4",checked:true},
                {id: "3272", value: "小只", sort: "6"}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4"},
                {id: "3274", value: "白色", sort: "6",checked:true}
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
            kc:8,
            Specifi: {
              one: [
                {id: "3271", value: "大只", sort: "4"},
                {id: "3272", value: "小只", sort: "6",checked:true}
              ],
              two: [
                {id: "3273", value: "褐色", sort: "4",checked:true},
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
      $.each(this.list, function (index, value) {
        $.each(this.list[index].goods, function (idx, val) {
          val.sel = this.allSelect
        }.bind(this))
      }.bind(this))
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
        sel_public.call(this)
      }.bind(this),300)
    },
    headsel: function (index) { //tab切换
      this.seltype_num = index;
      this.allSelect = false
      //所有勾选状态去掉
      selectFn.call(this,false)

      if(this.seltype_num == 0){
        this.renderList = this.list
        return;
      }

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
    },
    // 修改数量
    changeAmount:function (compon) {
      var goods = compon.goods;
      goods.count = compon.amount;
      console.log(this.list)
    }
  },
  mounted: function () {
    //给与所有勾选状态false
    selectFn.call(this,false)
    this.renderList = this.list;
  },

})

//深拷贝
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
// 所有勾选状态初始化
function selectFn(state) {
  $.each(this.list, function (index, value) {
    if(value.sel){
      value.sel = state
    }else{
      this.$set(value, 'sel', state)
    }
    $.each(value.goods, function (idx, val) {
      if(value.sel){
        val.sel = state
      }else{
        this.$set(val, 'sel', state)
      }
    }.bind(this))
  }.bind(this))
}
//单选多选的相同操作
function sel_public() {
  this.allSelect = true
  var selall_state = true
  $.each(this.renderList,function (index,value) {
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

      //获取到所有是选中状态的商品对象
      if(val.sel == true && !this.allSelGoods_State[val.id]){
        this.allSelGoods_State[val.id] = true
      }else if(val.sel == false && this.allSelGoods_State[val.id]){
        delete(this.allSelGoods_State[val.id]);
      }
    }.bind(this))
  }.bind(this))
}

