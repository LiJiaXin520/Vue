<template>
  <div class=" container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label" >标题</label>
        <div class="col-sm-10">
          <input type="text" name="title" v-model="title" class="form-control" id="inputEmail3" placeholder="标题" >
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-2 control-label" >留言</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="3" name="content" v-model="content"></textarea>
        </div>
      </div>
      <button class="btn btn-success" type="button" @click="submit">提交留言</button>
    </form>
    <hr>
    <ul class="list-group">
      <li class="list-group-item" v-for="(item,i) in ary">
        <p>【标题】:{{item.title}}</p>
        <p>【时间】:{{item.time}}</p>
        <p>【内容】:{{item.content}}</p>
        <a class="btn btn-success" style="color: white" @click="del(item._id)" >删除</a>
      </li>
    </ul>
    <br>
    <div>
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li @click="getData(index-1)">
            <a href="javascript:;" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="(item,i) in pages" @click="getData(i)"><a href="javascript:;" :class="{active:index==i}">{{item}}</a></li>

          <li @click="getData(index+1)">
            <a href="javascript:;" aria-label="Next" >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      title:'',
      content:'',
      pages:0,
      pageamount:3,
      ary:[],
      index:1,

    }
  },
  created(){
      /*进入页面向后台请求所有留言并绑定*/
      this.getData(0)
      this.$http.get('/count').then((res)=>{
          this.pages=Math.ceil(res.body/this.pageamount)
      })
  },
  methods:{
      /*提交留言*/
      submit(){
          if (!this.title || !this.content)return
      this.$http.get('/post?title='+this.title+'&content='+this.content).then(res=>{
          console.log('数据提交成功')
        window.location.href='/'
      })
      },
    getData(index){
      this.$http.get('/get?page='+index+'&pageamount='+this.pageamount).then((res)=>{
        this.ary=res.body;
        console.log(this.ary)
        this.index=index
      })
    },
    del(id){
        this.$http.get('/del?id='+id).then(res=>{
            alert('删除成功')
            window.location.href='/'
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

  a.active{
    color: red;
  }
</style>
