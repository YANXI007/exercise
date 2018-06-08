(function() {
    window.Calendar = Calendar;
    // 日历构造函数
    function Calendar(JSON) {
        // 列举日历所有的属性
        this.inputBox = null; // 存放当前日期或用户选择的日期
        this.calendarDiv = null; // 存放日历的容器
        this.yearSelect = null;
        this.monthSelect = null;
        this.tds = null;
        this.year = (new Date()).getFullYear(); // 系统当前年
        this.month = (new Date()).getMonth()+1; // 当前月
        this.date = (new Date()).getDate(); // 当前日
         
        //初始化
        this.init(JSON);

        // 获取日期
        this.getDay(this.year,this.month,this.date);  
        // 绑定事件
        this.bindEvent();

    }


    Calendar.prototype.init = function(JSON) {
            // 创建一系列DOM元素
        this.dom = document.getElementById(JSON["id"]); 
        this.inputBox = document.createElement("input");
        this.inputBox.type = "text";
        this.dom.appendChild(this.inputBox);
        this.calendarDiv = document.createElement("div");
        this.calendarDiv.className = "calendarDiv";
        this.dom.appendChild(this.calendarDiv);  
        // 创建年份下拉列表
        this.yearSelect = document.createElement("select");
        this.calendarDiv.appendChild(this.yearSelect);
        for(var i = 1990; i<=2040; i++) {
        	  var option = document.createElement("option");
        	  option.value = i;
        	  option.innerHTML = i;
        	  this.yearSelect.appendChild(option);
        }

        // 创建月份下拉列表   
         this.monthSelect = document.createElement("select");  
         var monthArr = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
         for(var i = 0; i<monthArr.length; i++) {
        	  var option = document.createElement("option");
        	  option.value = i+1;
        	  option.innerHTML = monthArr[i];
        	  this.monthSelect.appendChild(option);
        }   
        this.calendarDiv.appendChild(this.monthSelect);
        // 创建一个表格
        this.tableDom = document.createElement("table");
        this.calendarDiv.appendChild(this.tableDom);
        var weekArr = ["日","一","二","三","四","五","六"];
        // var weekArr = ["一","二","三","四","五","六","日"];
        var tr = document.createElement("tr");
        for(var i=0; i<weekArr.length; i++) {
        	  var th = document.createElement("th");
        	  th.innerHTML = weekArr[i];
        	  tr.appendChild(th);
        }
        this.tableDom.appendChild(tr);

        for(var i=0; i<6; i++) {
        	var tr = document.createElement("tr");
        	for(var j=0; j<7; j++) {
        		var td = document.createElement("td");
        		tr.appendChild(td);
        	}
        	this.tableDom.appendChild(tr);
        }
        this.tds = this.tableDom.getElementsByTagName("td");
    }



    // 获取日期                            2016 6 8
    Calendar.prototype.getDay = function(year,month,date) {
           this.year = year;
           this.month = month;
           //
           date&&(this.date = date);
           // 下拉框的数值 
           this.yearSelect.value = this.year;
           this.monthSelect.value = this.month;
           // 计算本月第一天是周几 0~6
           var thisMonthFirstDate = (new Date(year,month-1,1)).getDay();
           //thisMonthFirstDate==0?7:thisMonthFirstDate;
           this.thisMonthFirstDate = thisMonthFirstDate;

           // 获取上月有多少天
           var prevMonthSumDate = new Date(new Date(year,month-1,1)-1).getDate();
           
           // 本月总共多少天
           var thisMonthSumDate = this.thisMonthSumDate = (function() {
               switch(month) {
                   case 1:
                   case 3:
                   case 5:
                   case 7:
                   case 8:
                   case 10:
                   case 12: return 31;
                            break;
                   case 4:
                   case 6:
                   case 9:
                   case 11:  
                          return 30;
                          break;    
                   case 2:
                       if(year%4==0&&year%100!=0 || year%400==0) {
                           return 29;
                       } 
                       return 28;
                       break;         
               }
           })();
        /*var thisMonthSumDate =new Date(new Date(year,month,1)-1).getDate();*/

           // 渲染上月 26 27 28 29 30  prevMonthSumDate   5
           for(var i=0; i<thisMonthFirstDate; i++) {
               this.tds[i].innerHTML = prevMonthSumDate - thisMonthFirstDate+1+i;
               this.tds[i].className = "col";
            }

           // 本月的日全部显示   本月第一天是周五 tds[5]~tds[5+总天数-1]
           for(var i=thisMonthFirstDate; i<=thisMonthFirstDate+thisMonthSumDate-1; i++) {
            this.tds[i].className = "";  
            this.tds[i].innerHTML = i-thisMonthFirstDate+1;    
           }


           // 渲染下月
           for(var i=thisMonthFirstDate+thisMonthSumDate; i<42; i++) {
                this.tds[i].innerHTML = i-(thisMonthFirstDate+thisMonthSumDate)+1;
                this.tds[i].className = "col";
           }
           
           // 下拉框的值
           if(date!=undefined) {
              this.tds[this.thisMonthFirstDate+date-1].className = "cur"; 
              this.inputBox.value = year+"-"+month+"-"+date;
           }
    }



    // 绑定事件
    Calendar.prototype.bindEvent = function() {
         var self = this;
        // 下拉年份注册事件
        this.yearSelect.onchange = function() {
             self.inputBox.value ="";
             self.getDay(parseInt(self.yearSelect.value),parseInt(self.monthSelect.value));
        }


        // 下拉月份注册事件
        this.monthSelect.onchange = function() {
            self.inputBox.value ="";
            self.getDay(parseInt(self.yearSelect.value),parseInt(self.monthSelect.value));
       }

       // 输入框获得焦点
       this.inputBox.onfocus = function() {
           self.calendarDiv.style.display = "block";
       }

       // 点击除日历之外的地方隐藏日历
       document.addEventListener("click",function(event) {
             var event = window.event || event;
             console.log(event.target);
             if(event.target != self.inputBox && event.target!=self.yearSelect && event.target!=
                 self.monthSelect && event.target.nodeName != "TD" && event.target.nodeName !="TH") {
                      self.calendarDiv.style.display = "none";
                 }
                 return false;
       },false);

       // 从输入框输入数字 匹配日历对应的日期
       self.inputBox.onkeyup = function(event) {
            //console.log(111);
            var event = window.event || event;
            if(event.keyCode == 13) {
               var val = this.value; // 2016-8-12  
               var valArr = val.match(/(\d+)-(\d+)-(\d+)/);
               if(valArr) {
                 var year = parseInt(valArr[1]);
                 var month = parseInt(valArr[2]);
                 var date = parseInt(valArr[3]);
                 self.getDay(year,month,date);
             }
         }


       }
    }
})();