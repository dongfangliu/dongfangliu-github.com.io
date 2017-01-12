var hour0 = [06,07,07,08,08,08,09,09,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19];
var min0 =  [55,20,40,00,20,40,00,20,00,00,00,00,00,00,20,40,00,20,40,00,20,40,01,20,40,00];
var hour1 = [07,07,08,08,08,09,09,09,10,11,12,13,14,15,15,16,16,16,17,17,17,18,18,18,19,19];
var min1 =  [15,40,00,20,40,00,20,40,20,20,20,20,20,20,40,00,20,40,00,20,40,01,21,40,00,20];
var hour2 =   [06,07,08,09,10,11,12,13,14,15,15,16,17,17,18,19];
var min2 =    [55,50,40,20,00,00,00,00,00,00,40,20,00,40,20,00];
var hour3 =    [07,08,09,09,10,11,12,13,14,15,16,16,17,18,18,19];
var min3 =    [15,10,00,40,20,20,20,20,20,20,00,40,20,01,40,20];
var hour4 = [09,10,11,12,13,14,15,16,17,17,18,19,];
var min4 = [25,25,05,25,25,25,25,25,15,45,45,40,];
var hour5 = [07,07,08,09,10,11,12,13,14,15,];
var min5 = [30,40,30,45,45,25,45,45,45,45,];
var hour6 = [09,11,17,17,];
var min6 = [15,00,00,30,];
var hour7 = [08,09,11,];
var min7 = [30,30,15,];
var HourList = [hour0,hour1,hour2,hour3,hour4,hour5,hour6,hour7];
var MinList = [min0,min1,min2,min3,min4,min5,min6,min7];
function  get_static_Dates(hourlist ,minlist,curr_date) {
    var Dates = new Array(hourlist.length);
    for(var i = 0 ; i <hourlist.length ;i++){
        Dates[i] = new Array(hourlist[i].length);
        for(var j =0 ; j<hourlist[i].length;j++){
            Dates[i][j]=new Date(curr_date.getUTCFullYear(),curr_date.getUTCMonth(),curr_date.getDate(),hourlist[i][j],minlist[i][j],0);
        }
    }
    return Dates;
}
function get_diff_time(Dates,curr_date) {
//以下需要持续刷新并部署到网页上
    var differ_time_put = new Array(Dates.length);
    for(var a = 0 ; a <Dates.length ;a++){
        for(var b=0 ; b<Dates[a].length;b++){
            var data = Dates[a][b].getTime() - curr_date.getTime();
            if(data > 0){  //此刻尚有班车可等
                var leave1=data%(24*3600*1000);
                var hour = Math.floor(leave1/(3600*1000));
                var leave2 = leave1%(3600*1000);
                var minute = Math.floor(leave2/(60*1000));
                var leave3 = leave2%(60*1000);
                var second = Math.round(leave3/1000);
                differ_time_put[a] = [hour, minute, second];
                break;
            }else{ //此刻无班车可等
                if(b ==Dates[a].length-1){
                    differ_time_put[a] = "已停运.";
                }
            }
        }
    }
    return differ_time_put;
}

function  update_times() {
    var curr_date = new Date();
    var static_dates = get_static_Dates(HourList,MinList,curr_date); // 这一天的标准时刻表
    var diff_time = get_diff_time(static_dates, curr_date);
    var display_time = new Array(4);
    if(curr_date.getDay()<6 && curr_date.getDay()>0){
        display_time = [diff_time[0],diff_time[1],diff_time[4],diff_time[5]];
    }else{
        display_time = [diff_time[2],diff_time[3],diff_time[6],diff_time[7]];
    }
    for (var i = 0; i < display_time.length; i++) {
        var id = "content" + i;
        var elem = document.getElementById(id);
        if (typeof elem !== 'undefined' && elem !== null) {
            var output;
            if (display_time[i].length == 3) {
                if (display_time[i][0] != 0) {
                    output = display_time[i][0] + ":" + display_time[i][1] + ":" + display_time[i][2];
                } else {
                    output = display_time[i][1] + ":" + display_time[i][2];
                }
            } else {
                output = display_time[i];
            }
            document.getElementById(id).innerHTML = output;
        }
        // var maxwidth = elem.width-4;
        // while(elem.style.fontSize
    }
}
function setTimetitles() {
    var hints= ["学校-金科路","金科路-学校","学校-张江","张江-学校"];
    var setted = "";
    for (var i = 0; i < hints.length; i++) {
        var id = "title" + i;
        var elem = document.getElementById(id);
        if(typeof elem !== 'undefined' && elem !== null) {
            document.getElementById(id).innerHTML= hints[i];
            setted+="1";
        }else{
            setted+="0";
        }
    }
    if(setted!="1111"){
        setTimeout(setTimetitles(),200);
    }

}
setTimetitles();
setInterval(update_times,500);




//部署方法
//部署方法
// var html='<b>插入一段html</b>';//声明js变量
// document.getElementById('myId').innerHTML = html;//找到id为'myId'的标签内插入html变量的值
// document.getElementById('myId').innerText = html;//找到id为'myId'的标签替换它的内容为html的值
// <td><script language=javascript>document.write(name);</script></td>
// <td><script language=javascript>document.write(age);</script></td>
