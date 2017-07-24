/**
 * Created by samsung on 2017/7/24.
 */
const mongoose = require('mongoose');
    db_url='mongodb://localhost:27017/liuyan';

    /*2.连接数据库*/
    const db = mongoose.createConnection(db_url);
        db.once('open',function () {
          console.log('数据库连接成功')
        });

    /*3.设置数据类型，即数据的schema*/
    var msgSchema = new mongoose.Schema({
      title:{type:String},
      content:{type:String},
      time:{type:Number}
    });
    /*4.创建一个数据类，累就相当于mongodb的集合*/
    var Msg=db.model('Msg',msgSchema);

    module.exports=Msg;
