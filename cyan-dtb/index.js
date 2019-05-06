_require.define('allMsg', function () {
  var API = {
    getList: "/cart/index",        //get
    getallSpec: '/cart/get_goods_sku_all', //获取所有规格
    editSpec: '/cart/edit_goods_spec', //修改规格
    getallMsg: '/cart/comprehensive_data', //综合获取新数据
    checkout: '/cart/checkout', //勾选状态
    deteleEvt: '/cart/remove',//删除
    collection: '/Member/Collection/collection_goods', //收藏
    changeCounts: '/cart/upprice',//加减
    removeEnt: "/cart/remove_invalidation_goods",//清空所有失效
    jsEvt: '/cart/checklist', //结算
    batchDetele: '/cart/batch_deleting' //批量删除
  };
  var timer = false

  function cart(opts) {

    /*注册列表的数量组件*/
    _require('goods-spec')({
      template: "#goodsListMount",
      componentName: "goods-list-mount"
    });


    app = new Vue({
      el: opts.el,
      data: {
        ajax_timer: 0,
        list: [],
        likeList: [],
        hotgoods_list: [],
        allSelect: false, //是否显示全选√
        allSelGoods_State: {}, //储存勾选状态cm_id
        allSonid: {},  //传后台的sonid
        overWarn: false,
        shopIdx: 0,
        goodsIdx: 0,
        idStr: '',//勾选中
        selgoodsNum: 0,//已选中商品数量
        selgoodsPrice: {},  //总价
        js_state: false, //结算状态
        loading: true,
        specgoods: {
          goods:[],
          price:''
        },  //移动端用
        showAountPop: false, //数量弹窗
        inputMsg: {},
        compongoods: {},
        goodsNum: '',

        showRemove_b: false, //右上角管理
        closeLayer: 0,
        //店铺活动
        allActive: [],  //所有店铺活动
        showActive: false, //店铺活动弹框
        // 规格
        showPopUp: false, //规格弹窗
        allSpeciti: [], //原始规格数据
        all_spec_deep: [], //拷贝出来规格数据
        sonidInSpec: [],
        nullKcIds: [],      //空库存信息
        //换一批
        like_changeCount: 0,
        //关于图
        aboutImg: {
          main_photo: '', //主图
          showSpecImg: "" //规格显示图
        }


      },
      computed: {},
      mounted: function () {
        $(document).click(function () {
          $($('.allopt')).css('display', 'none')
          $($('.arrow-opt')).removeClass('arrowOpts')
        })
        getAllData.call(this)
        this.closeLayer = layer.load(1)
        // window.addEventListener('scroll', this.cart_footEvent);
      },
      methods: {
        selectOpt: function (e, item, index) { //店铺活动
          if (item[index].length > 1) {
            $('.allopt').slideToggle('fast');
            $(e.target).closest('.activeBox').find('.g-arrow').toggleClass('arrowOpts')
          }
        },
        shopActive: function (active) {  //店铺活动弹框
          this.allActive = active
          this.showActive = true
        },
        // 勾选相关
        selAll: function (target) {
          this.allSelect = target.checked
          $.each(this.list, function (index, value) {
            $.each(this.list[index].goods, function (idx, val) {
              if (val.status != 0) {
                return
              }
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
        timer_sel: function () {
          clearTimeout(this.timer)
          this.timer = setTimeout(function () {
            sel_public.call(this)
          }.bind(this), 100)
        },
        //移动端点击数量
        mountInput: function (goods, itemGoods, idx) {
          if (goods.status == 0) {
            this.showAountPop = true
          }
          this.inputMsg = {
            inputMsg: deepCopy(goods),
            itemGoods: itemGoods,
            idx: idx
          }
        },
        // 修改数量
        changeAmount: function (compon) {
          var goods = compon.goods;
          if (compon.amount == '' && IsPC.call(this)) { //PC端下
            compon.amount = 1
          }
          if (goods.status != 0) {
            compon.amount = compon.goods.num
            return
          }
          goods.num = compon.amount;
          this.goods_timer(goods)
        },
        goods_timer: function (goods) {
          clearTimeout(this.ajax_timer);
          var _timer = this.ajax_timer = setTimeout(function () {
            (function (timer) {
              if (!this.showAountPop) { //数量弹框不出现的时候
                changeCount.call(this, goods, timer);
              }
              //0正常  1 失效 2售罄 3下架
              this.list.forEach(function (item) {
                item.goods.forEach(function (_item) {
                  _item.isControlMaxAmount = true
                })
              })
            }).call(this, _timer);
          }.bind(this), 500);
        },
        confirmMount: function () {  //确认数量
          if (this.inputMsg.inputMsg.num) {
            if (this.inputMsg.inputMsg.num > this.inputMsg.inputMsg.kc) {
              layer.msg('最多只能购买' + this.inputMsg.inputMsg.kc + '件')
            } else {
              this.inputMsg.itemGoods.splice(this.inputMsg.idx, 1, this.inputMsg.inputMsg)
            }
            this.showAountPop = false
          } else {
            layer.msg('请输入数量')
          }
        },
        confirmChangeAmount: function (comp) {
          this.inputMsg.inputMsg.num = comp.amount;
        },
        closeMount: function () {  //关闭数量弹框
          this.showAountPop = false
        },
        //点击修改
        btnXiugai: function (e, shopIdx, goodsIdx, goods) {
          this.shopIdx = shopIdx
          this.goodsIdx = goodsIdx

          // this.specgoods = goods //移动端用
          this.specgoods.goods = []
          goods.spec.forEach(function (item,index) {
            this.specgoods.goods.push({value:item.value,name:item.name})
          }.bind(this))
          this.specgoods.price = goods.price;
	        this.specgoods.goodsInfo = goods;


          this.aboutImg.showSpecImg = goods.list_img //显示当前规格对应的图片

          this.cancel_pop()  //初始化
          //弹框位置
          if (IsPC.call(this)) {
            var rect = e.currentTarget.closest(".specif")
            var terget = e.currentTarget
            terget.parentElement.style.border = '1px #ff0000 dashed'
            terget.style.display = 'block'
            var sizeHeight = terget.nextElementSibling.offsetHeight
            $('#PopUp').css({
              left: rect.offsetLeft,
              top: rect.offsetTop + sizeHeight + 30,
            })
          }
          getAllspec.call(this, goods.goods_id, goods.sonid, goods)
        },
        isNullKcId: function (id) {
          return this.nullKcIds.indexOf(id) != -1;
        },
        //点击规格
        checkSpec: function (item, spec) {
          if (this.isNullKcId(spec.id)) return;
          this.nullKcIds = [];
          (item.son || []).forEach(function (_spec) {
            if (spec == _spec) return;
            this.$set(_spec, 'checked', false);
          }.bind(this));
          this.$set(spec, 'checked', !spec.checked);

          //规格弹窗中图片显示
          if(spec.img && spec.img.length>0){
            if(spec.checked == false){
              this.aboutImg.showSpecImg = this.aboutImg.main_photo //有图片的被否掉了显示主图
            }else{
              this.aboutImg.showSpecImg = spec.img[0]
            }
          }


          // console.log(item.spec_name);
          // console.log(spec.value);

          //规格弹窗中的已选择
          specValue.call(this,spec,spec.value,item.spec_name)

          setNullKcIds.call(this,'isClickEvent');
        },

        //关闭规格弹框
        cancel_pop: function () {
          this.showPopUp = false
          $('.specif').css('border', '')
          $('.specifFont').css('display', '')
        },
        //确定规格
        confirmSpec: function () {
          var theSame = true;
          var spec_id = '';
          //拷贝出来的数据跟原始数据对比
          var selectSpecNum = 0
          $.each(this.all_spec_deep, function (idx, val) {
            $.each(val.son, function (index, value) {
              if (value.checked == true && this.allSpeciti.all_spec[idx].son[index].checked != true) {
                theSame = false;
              }
              if (value.checked == true) {
                spec_id = spec_id + value.id + ',' + '';
                selectSpecNum++
                spec_id.toString();
              }
              return
            }.bind(this))
          }.bind(this))
          if (this.all_spec_deep.length != selectSpecNum) {
            layer.msg('请选择商品规格')

          } else if (theSame) {
            layer.msg('修改后信息与修改前一致')
          } else {
            if (this.list[this.shopIdx].goods[this.goodsIdx].status == 2 || this.list[this.shopIdx].goods[this.goodsIdx].status == 1) {  //表示修改的是失效商品
              var num = true
            }
            comfirmSpecs.call(this, spec_id, this.list[this.shopIdx].goods[this.goodsIdx], num)
            this.cancel_pop()
          }

        },
        //删除
        deleteFn: function (id, index, idx) {
          deteleEvent.call(this, id)
        },
        //批量删除
        batchDel: function () {
          batchDels.call(this)
        },
        //收藏
        collect: function (id) {
          collevtEvent.call(this, id)
        },
        //清空所有失效
        removeAll: function () {
          removeFn.call(this)
        },
        //结算
        gopay: function () {
          pay.call(this)
        },
        //换一批
        changeLike: function () {
          var msg = {
            list: this.hotgoods_list,
            event: 'clickEvent'
          }
          mathFive.call(this, msg)
        }

      },
    })
    return app;
  }

  return cart

  //获取最新的信息
  function common(opts) {
    if (!opts) {
      opts = {
        timer: 0
      };
    }
    $.ajax({
      url: API.getallMsg,
      data: this.idStr,
      success: function (data) {
        if (opts.timer !== 0 && this.ajax_timer != opts.timer) return;
        selectFn.call(this, data.list.list, false, 'noFirst')//处理后台数据
        this.hotgoods_list = data.list.hotgoods_list
        mathFive.call(this, this.hotgoods_list)
        newChecked.call(this)
      }.bind(this)
    });
  }

  //更新后重新赋予勾选状态
  function newChecked() {
    $.each(this.list, function (index, value) {
      $.each(value.goods, function (idx, val) {
        if (this.allSelGoods_State) {
          var allSelGoods_State = Object.keys(this.allSelGoods_State)
          if (allSelGoods_State.indexOf(val.cm_id) != -1) {
            val.sel = this.allSelGoods_State[val.cm_id]
          }
          this.timer_sel()
        }
      }.bind(this))
    }.bind(this))

    this.allSelGoods_State = {}  //重新获取为勾选状态的选项cm_id
    this.allSonid = {} //sonid
  };

  //获取所有列表数据
  function getAllData() {
    $.ajax({
      url: API.getList,
      success: function (data) {
        selectFn.call(this, data.list, false) //修改后台数据
        layer.close(this.closeLayer)
        this.loading = false
        this.hotgoods_list = data.hotgoods_list
        mathFive.call(this, this.hotgoods_list)
      }.bind(this)
    });
  };

  //批量删除
  function batchDels() {
    if (cmId.call(this).length > 0) {
      layer.open({
        content: '确认删除这些商品吗？',
        title: false,
        shadeClose: true,
        btnAlign: 'c',
        btn: ['确定', '取消'],
        yes: function (index) {
          if (cmId.call(this).length > 0) {
            ajax.call(this, API.batchDetele, { cm_id: cmId.call(this) }, '', 'post', 'batch_dels')
          }
          layer.close(index);
        }.bind(this)
      });
    } else {
      layer_error('请选择商品')
    }
  }

  //猜你喜欢5条
  function mathFive(arr) {
    var arrCopy = deepCopy(arr)
    //点击换一批
    if (arr.event == 'clickEvent') {
      this.likeList = arrCopy.list;
      if (arrCopy.list.length / 5 <= 1 || Math.ceil(arrCopy.list.length / 5) - 1 == this.like_changeCount) {
        this.like_changeCount = 0
      } else {
        this.like_changeCount++;
      }
    } else {
      this.likeList = arrCopy
    }

    var startNum = this.like_changeCount * 5;
    this.likeList = this.likeList.splice(startNum, 5);

    // this.likeList = [];
    // for (var i = 0; i < 5; i += 1) {
    //   this.likeList.push(arrList[Math.floor(Math.random() * arrList.length)]);
    // };
  };

  //删除
  function deteleEvent(id) {
    layer.open({
      content: '确定删除该产品么?',
      title: false,
      shadeClose: true,
      btnAlign: 'c',
      btn: ['确定', '取消'],
      yes: function (i) {
        ajax.call(this, API.deteleEvt, { id: id }, i, 'post', 'delete')
      }.bind(this)
    });

  }

  //收藏
  function collevtEvent(id) {
    ajax.call(this, API.collection, { fav_id: id }, '', 'get', 'collect')
  }

  //一键清空
  function removeFn() {
    ajax.call(this, API.removeEnt, {}, '', 'get', 'qingkong')
  }

  //修改数量
  function changeCount(goods, timer) {
    var data= {
      cm_id:goods.cm_id,
	    sonid: goods.sonid,
      num: goods.num,
    };
    ajax.call(this, API.changeCounts, data, { timer: timer }, 'post', 'changeCount')
  }


  //封装ajax
  function ajax(url, data, otherData, type, clickType) {
    $.ajax({
      url: url,
      type: type,
      data: data,
      success: function (data) {
        layer.close(this.closeLayer);
        if (clickType == 'collect' || clickType == 'qingkong' || clickType == 'pay' || clickType == 'batch_dels') {
          if (data.status == 1) {
            data.info && layer_success(data.info);
          } else {
            data.info && layer_error(data.info);
            // common.call(this)
          }
        }
        if (clickType == 'changeCount') {
          if (this.ajax_timer != otherData.timer) {
            return;
          }
          common.call(this, {
            timer: otherData.timer
          });
          return;
        }
        if (clickType == 'delete') {
          layer.close(otherData);
        }
        if (clickType == 'pay') { //结算
          if (data.url) location.href = data.url;
        } else {
          common.call(this);
        }
      }.bind(this)
    });
  }

  //确定规格
  function comfirmSpecs(spec_id, goods, num) {
    var data = {
      spec_id: spec_id,
      goods_id: goods.goods_id,
      sonid: goods.sonid,
    }
    if (num) {
      data.num = 1
    }

    ajax.call(this, API.editSpec, data, '', 'post', 'comfirmSpecs')
  }

  //规格弹窗中的已选择
  function specValue(spec,spec_value,spec_name) {
    var goodsArr = this.specgoods.goods
    if(spec.checked == false){
      goodsArr.forEach(function (goodsitem,goodsIdx) {
        if(spec_value == goodsitem.value){
          goodsArr.splice(goodsIdx,1)
        }
      })
    }else{
      if( goodsArr.length == 0){
        goodsArr.push({name:spec_name,value:spec_value})
        return;
      }
      //没有点有 或者 切换其他选项
      for(var i = 0;i<goodsArr.length;i++){
        if(goodsArr[i].name == spec_name){
          goodsArr[i].value = spec_value;
          break;
        }
        if(i == goodsArr.length - 1 && goodsArr.length>0){
          goodsArr.push({name:spec_name,value:spec_value})
        }
      }
    }
  }

  // 所有勾选状态初始化
  function selectFn(dataList, state, noFirst) {
    $.each(dataList, function (index, value) {
      value.shopSel_state = false
      //im聊天客服从返回的数据中随机一个
      if (value.imlist instanceof Array) {
        var chatIndex = Math.floor(Math.random() * value.imlist.length)
        value.imlist.push(value.imlist[chatIndex])
        value.imlist.splice(0, value.imlist.length - 1)
      }
      $.each(value.goods, function (idx, val) {
        val.isControlMaxAmount = false
        if (noFirst == 'noFirst') {
          val.isControlMaxAmount = true
        }
        if (val.status == 0) {
          value.shopSel_state = true
          value.sel = false;
          val.sel = false
        }
      }.bind(this))
    }.bind(this))

    this.list = dataList
  }

  //获取所有规格
  function getAllspec(goods_id, sonid, goods) {
    if (goods.status == 3) return;
    this.showPopUp = true
    $.ajax({
      url: API.getallSpec,
      async: false,
      data: {
        goods_id: goods_id,
        sonid: sonid
      },
      success: function (data) {
        this.aboutImg.main_photo = data.list_img;  //主图
        this.allSpeciti = data;
        this.sonidInSpec = data.sonidInSpec; //所有规格组合
        this.all_spec_deep = deepCopy(this.allSpeciti.all_spec);//复制一份，最后确定时对比原来的
        setNullKcIds.call(this)
      }.bind(this)
    })
  }

  function setNullKcIds(val) {
    this.nullKcIds = []
    //获取选中状态的id组
    var checkedIds = getCheckedIds.call(this) ;//[1,11,111]

    //规格弹窗价格变更
    if(val && val=='isClickEvent'){
      for(var key in this.sonidInSpec){
        var keyArr = [];
        keyArr.push(key)
        if(checkedIds == key){
          this.specgoods.price = this.sonidInSpec[key].price
        }
      }
    }


    //设置库存为空的
    for (var index = 0; index < this.all_spec_deep.length; index++) {
      var specType = this.all_spec_deep[index]  //颜色 尺码....
      for (var i = 0; i < (specType.son || []).length; i++) {
        var spec = specType.son[i]; // 白色 黑色....
        var ids = checkedIds.join().split(',') //[1,11,111]
        ids[index] = spec.id
        var findGroup = findIds.call(this, {  //返回包含这个ID的所有组
          checkedIds: ids
        });
        var nullGroup = getNullGropu.call(this, findGroup);  //筛选出kc=0的组
        if (findGroup.length != 0 && findGroup.length == nullGroup.length && (this.nullKcIds.indexOf(spec.id) == -1)) {
          this.nullKcIds.push(spec.id);
          if (spec.checked) {
            this.nullKcIds = [];
            spec.checked = false;
            setNullKcIds.call(this);
            return;
          }
        }
      }
    }
  }

  //获取选中状态的id组
  function getCheckedIds() {
    var ids = [];
    this.all_spec_deep.forEach(function (item, index) {
      (item.son || []).forEach(function (son) {
        if (son.checked != true) return;
        ids[index] = son.id;
      });
    });
    return ids;
  }

  //查找选择项的id组
  function findIds(opts) {
    var findGroup = [];
    var checkedIds = opts.checkedIds;
    var sonidInSpec = this.sonidInSpec;
    for (var sonid in sonidInSpec) {
      if (!sonidInSpec.hasOwnProperty(sonid)) continue;
      var item = sonidInSpec[sonid];
      var sonidSpecIds = item.spec_ids;
//是否符合当前规格类型
      var isCurrentSonid = true;
//只要缺少一个id，则不属于这个规格类型
      for (var i = 0; i < checkedIds.length; i++) {
        if (!checkedIds[i]) continue;
        if (sonidSpecIds.indexOf(checkedIds[i]) == -1) {
          isCurrentSonid = false;
          break;
        }
      }
//查找到符合的规格
      if (isCurrentSonid) {
        findGroup.push(item);
      }
    }
    return findGroup;
  }

  function getNullGropu(findGroup) {
    var nullGroup = [];
    var _this = this;
    findGroup.forEach(function (item) {
      var spec = _this.sonidInSpec[item.spec_ids.join()];
      if (spec && spec.kc <= 0) {
        nullGroup.push(item);
      }
    });
    return nullGroup;
  }

  //深拷贝
  function deepCopy(obj) {
    if (!obj || !(obj instanceof Array) && !(obj.toString() === "[object Object]")) return obj;
    const _obj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      if ((obj instanceof Array) || (obj instanceof Object)) {
        _obj[key] = deepCopy(obj[key])
      } else {
        _obj[key] = obj[key]
      }
    }
    return _obj;
  }

  //单选多选的相同操作
  function sel_public() {
    this.allSelect = true
    var selall_state = true
    $.each(this.list, function (index, value) {
      var selshop_state = true
      $.each(value.goods, function (idx, val) {
        if (val.sel == false) {  //有一个false店铺勾选为false
          selshop_state = false
          value.sel = false
        }
        if (selshop_state == true) {
          value.sel = true
        }
        if (value.sel == false) {
          this.allSelect = false
          selall_state = false
        }
        if (selall_state == true) {
          this.allSelect = true
        }
        //获取到所有是选中状态的商品对象
        if (val.sel == true && !this.allSelGoods_State[val.cm_id] && val.status == 0) {  //选中并且不在存储对象中
          this.allSelGoods_State[val.cm_id] = true  //储存选中状态
          this.allSonid[val.sonid] = true //后台需要sonid
        }
        else if (val.sel == false && this.allSelGoods_State[val.cm_id]) {
          delete(this.allSelGoods_State[val.cm_id]);
          delete(this.allSonid[val.sonid])
        }
      }.bind(this))
    }.bind(this))



	  // this.allSonid
    this.idStr = ''  //传给后台的字符串参数
    for (var k in this.allSelGoods_State) {
      this.idStr = this.idStr + k + ','
    }

    this.selgoodsNum = Object.keys(this.allSelGoods_State).length  //选中的数量

    if (this.selgoodsNum > 0) {
      this.js_state = true
    } else {
      //没有选中商品时
      this.js_state = false
      this.selgoodsPrice.total = this.selgoodsPrice.total_score = 0

    }
    this.idStr = this.idStr.slice(0, -1)
    if (this.idStr) {
      $.ajax({
        url: API.checkout,
        data: {
          cm_id: this.idStr,
        },
        success: function (data) {
          // console.log(data)
          this.selgoodsPrice = data
        }.bind(this)
      });
    }
  }

  //筛选出cm_id
  function cmId() {
    var cm_id = []
    for (var key in this.allSelGoods_State) {
      cm_id.push(key)
    }
    return cm_id
  }

  //结算
  function pay() {
    if (this.js_state) {
      this.closeLayer = layer.load(1)
      ajax.call(this, API.jsEvt, { cm_id: cmId.call(this) }, '', 'post', 'pay')
    }
  }

  //设备判断
  function IsPC() {
    return /iPhone|Android|Windows Phone|KFAPWI|MeeGo/.test(navigator.userAgent) ? false : true;
  };

})

