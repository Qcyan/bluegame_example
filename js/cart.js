// 加减数量组件
var opts = {
  template: "#goodsListMount",
  componentName: "goods-list-mount"
}
spec(opts)

var opts2 = {
  template: "#aboutSize",
  componentName: "about-size"
}
spec(opts2)


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
            count: 2, //加入购物车的数量
            // maxcount: 30,
            price: '18元',
            id: 222,
            kc:8, //当前所选规格的库存
            sonid:3271,
            sizeName:'规格：尺码：大只    颜色：红色',
            Specifi: [
              {
                id:'3271',Spec: "111", value: "尺码",name:'大只'
              },
              {
                id:'3271',Spec: "222", value: "颜色",name:'红色'
              }
            ],
            SpecifiId:['111','222']
          },
          {
            type: 1,
            goodsname: '甜果',
            count: 2,
            // maxcount: 30,
            price: '18元',
            id: 223,
            kc:8,
            sonid:3272,
            sizeName:'规格：尺码：大只    颜色：红色',
            Specifi: [
              {
                id:'3272',Spec: "113", value: "尺码",name:'大只'
              },
              {
                id:'3272',Spec: "223", value: "颜色",name:'红色'
              }
            ],
            SpecifiId:['113','223']
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
            count: 2,  //当前加入购物车数量
            price: '18元',
            id: 224,
            kc:8, //当前规格的库存
            sonid:3273,
            sizeName:'规格：尺码：大只    颜色：红色',
            Specifi: [
              {
                id:'3273',Spec: "114", value: "尺码",name:'大只'
              },
              {
                id:'3273',Spec: "224", value: "颜色",name:'红色'
              }
            ],
            SpecifiId:['114','224']
          },
          {
            type: 1,
            goodsname: '甜鱼',
            count: 2,
            // maxcount: 30,
            price: '18元',
            id: 225,
            kc:8,
            sonid:3274,
            sizeName:'规格：尺码：大只    颜色：红色',
            Specifi: [
              {
                id:'3274',Spec: "115", value: "尺码",name:'大只'
              },
              {
                id:'3274',Spec: "225", value: "颜色",name:'红色'
              }
            ],
            SpecifiId:['115','225']
          }
        ]

      }
    ],
    seltype_num: 0,
    headsel_value: ['全部', '减价中', '折扣'],
    timer:false,
    clickIndex_size:0,
    showClick_size:[],
    showPopUp:false,
    shopIdx:0,
    goodsIdx:0,
    allSpec:[
      {
        value:'颜色',
        id:'3274', //货物的id
        specifi:[
          { Spec: "225", value: "颜色",name:'红色',},
          { Spec: "115", value: "颜色",name:'绿色'},
          { Spec: "205", value: "颜色",name:'白色'}
        ]
      },
      {
        value:'尺码',
        id:'3274',
        specifi:[
          { Spec: "225", value: "尺码",name:'大只'},
          { Spec: "215", value: "尺码",name:'中只'},
          { Spec: "205", value: "尺码",name:'小只'}
        ]
      }
    ]
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
    },
    //修改规格
    changeSize:function (e,goodsIdx,shopIdx,itgoods) {
      var rect = e.currentTarget.closest(".specification")
      this.shopIdx = shopIdx
      this.goodsIdx = goodsIdx
      // console.log(e.currentTarget.closest('.specification').offsetTop)
      // console.log(e.currentTarget.closest('.specification').offsetLeft)
      // console.log(e.currentTarget.nextElementSibling.offsetHeight)
      var sizeHeight = e.currentTarget.nextElementSibling.offsetHeight
      // var showClick_size = this.list[shopIdx].goods[goodsIdx].Specifi
      //深拷贝出Specifi，要在这上面操作规格，然后点击确定时给到真正的list上
      // this.showClick_size = deepCopy(showClick_size)
      $('#PopUp').css({
        left:rect.offsetLeft,
        top:rect.offsetTop + sizeHeight
      })
      this.showPopUp = !this.showPopUp


      $.each(itgoods.Specifi,function (idxs,vals) {
        // console.log()
        $.each(this.allSpec[idxs].specifi,function (indexs,values) {
          if(vals.Spec == values.Spec){
            console.log(values)
            values.checked = true
          }
        }.bind(this))
      }.bind(this))
      console.log(this.allSpec)
    },
    clickSize:function (leixinIdx,detailIdx) {
      var sizeList = this.showClick_size[leixinIdx].spec
      $.each(sizeList,function (idx,val) {
        if(val.checked){
          val.checked = false
        }
        sizeList[detailIdx].checked = true
      }.bind(this))
    },
    comfirm:function () {
      var theSame = true
      //拷贝出来的数据跟原始数据对比
      $.each(this.showClick_size,function (idx,val) {
        $.each(this.showClick_size[idx].spec,function (index,value) {
          if(value.checked == true && this.list[this.shopIdx].goods[this.goodsIdx].Specifi[idx].spec[index].checked != true){
            theSame = false
          }
          return
        }.bind(this))
      }.bind(this))

      if(theSame){
        alert('当前修改与之前修改一样')
      }else{
        this.list[this.shopIdx].goods[this.goodsIdx].Specifi = this.showClick_size
      }
      this.showPopUp = false
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

