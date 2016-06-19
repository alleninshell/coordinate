
// 百度地图API功能
var map = new BMap.Map("container");//创建地图容器

map.centerAndZoom("北京市", 12); //初始化地图。设置中心点和地图级别
map.enableScrollWheelZoom(true);

//添加鱼骨控件
map.addControl(new BMap.NavigationControl());


var myGeo = new BMap.Geocoder();

function fun_geocoder_getPoint() {
    var value_address_1 = document.getElementById("address_1").value;
    myGeo.getPoint(value_address_1, function (point) {
        if (point) {
            map.centerAndZoom(point, 14);
            map.addOverlay(new BMap.Marker(point));
        }
    }, "全国");
}


var hang = 0;

var adds = [];

var locationlwy = [];

var transindex = 1;
var i = 0;


map.addEventListener("click", function (e) {
    var pt = e.point;
    myGeo.getLocation(pt, function (rs) {
        var addComp = rs.addressComponents;
        if (document.getElementById("mousepick").checked) {


            document.getElementById("textinput").value += "\n" + addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;


        }
    });


});


function getadds_lwy() {


    var textarea = document.getElementById("textinput");
    var value = textarea.value;
    adds = value.split("\n");


    var index1 = 0;

    if (value) {
        while (index1 < adds.length) {

            add = adds[index1];
            if (add) {
                hang++;
                var x = document.getElementById("locationlist").insertRow(-1);
                var cell = x.insertCell(0);
                cell.innerHTML = '<input type="checkbox" checked="true">';
                var cell = x.insertCell(1);
                cell.innerHTML = hang;
                var cell = x.insertCell(2);
                cell.innerHTML = add;
                var cell = x.insertCell(3);
                var cell = x.insertCell(4);
            }


            index1++;
        }
    }

    document.getElementById('textinput').value = "";

    transindex = 0;
    i = 0;

    while (i < hang) {
        locationlwy[i] = document.getElementById("locationlist").rows[i + 1].cells[2].innerHTML;
        i++;
    }

}

var myAdd1 = "";

function trans() {
    myAdd1 = locationlwy[transindex];

    (function () {
        myGeo.getPoint(
            myAdd1,
            function (point) {


                if (point) {

                    document.getElementById("locationlist").rows[transindex + 1].cells[3].innerHTML = point.lng;
                    document.getElementById("locationlist").rows[transindex + 1].cells[4].innerHTML = point.lat;


                    var address = new BMap.Point(point.lng, point.lat);
                }
                else {
                    document.getElementById("locationlist").rows[transindex + 1].cells[3].innerHTML = "请输入更详细地址";
                }


                transindex++;
                if (transindex < hang) trans();


            },
            "全国"
        );

    })();

}



/**
 * Created by wenyl on 2016/6/19.
 */
