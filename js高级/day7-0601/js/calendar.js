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



    // 获取日期 
    Calendar.prototype.getDay = function(year,month,date) {
           this.year = year;
           this.month = month;
           //
           date&&(this.date = date);
           // 下拉框的值
           if(date!=undefined) {
              this.inputBox.value = year+"-"+month+"-"+date;
           }
    }





    // 绑定事件
})();