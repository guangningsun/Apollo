// function onClickMultiDelete () {

//      $('#deleteMultiRoom').modal();
// }
var userName;
var domainCode;
var waterMode;

function onClickAddMultiRoom() {
    var floorNum = $('#floorNum')[0].value;
    var startNum = $('#startNum')[0].value;
    var endNum = $('#endNum')[0].value;
    var alphabet = $('#alphabet')[0].value;
    console.log(floorNum + ' ' + startNum + ' ' + endNum + ' ' + alphabet);
    $.ajax({
        type: "POST",
        url: "init_apartment.action",
        data: { "floor": floorNum, "start_num": startNum, "end_num": endNum, "domain_code": domainCode, "orderby": alphabet },
        success: function(msg) {
            console.log(msg);
            $('#addMultiRoom').modal('hide');
            location.reload();
        }
    });

}

function onDepositChange() {
    console.log($('#contract_month_price')[0].value);
    ($('#contract_deposit')[0].value) = $('#contract_month_price')[0].value;
}

function onCheckin() {
    // $('#checkin_form').submit();
}

function onModifyRoomInfo() {


    $('modify_room_form').submit();
    $('modify_room_contract_form').submit();
    $('modify_room_tenant_form').submit();
}

$(document).ready(function() {

    //userName = $.cookie('user_name');
    //console.log(userName);
    //if (userName === undefined) {
    //    window.location.href = "./login.html";
    //}
    //var permission = $.cookie('user_permission');
    //if (permission === '0') {
    //    $('#user_menu_item').show();
    //    $('#domain_menu_item').show();
    //}

    //domainCode = $.cookie('domain_code');

    $('#navi_user_name').html(userName);
    var domainName = $.cookie('domain_name');
    $('#navi_domain').html(domainName);

    $('#add_apartment_desc')[0].value = domainCode;

    waterMode = $.cookie('domain_desc');

    var $table = $('#table'),
        $remove = $('#remove'),
        selections = [];
    // data-url="getAllRoomInfo.action?domain_code=1&&user_permission="
    // $('#table').bootstrapTable({
    //     url: 'getAllRoomInfo.action'
    // });

    // $.ajax({
    //             type: "POST",
    //             url: "get_current_cycle.action",
    //             data: { "start_time": "2016-01-01", "end_time": "2017-01-01", "fequency": 3 },
    //             success: function(msg) {
    //                 console.log(msg);
    //             }
    //         });

    function operateFormatter(value, row, index) {
        if (row.apartment_person_num === 0) {
            return [
                '<a class="checkin" href="javascript:void(0)" title="登记">',
                '<i class="icon-plus-sign-alt text-primary"></i>',
                '</a>  ',
                '<a class="remove" href="javascript:void(0)" title="删除">',
                '<i class="icon-remove text-danger"></i>',
                '</a>'
            ].join('');
        } else {
            return [
                '<a class="modify" href="javascript:void(0)" title="修改">',
                '<i class="icon-pencil text-primary"></i>',
                '</a>  '
            ].join('');
        }

    }

    function statusFormatter(value, row, index) {
        // console.log(row.apartment_status);
        switch (row.apartment_status) {
            case '700':
                return [
                    '<span>未出租</span>'
                ].join('');
            default:
                return [
                    '<span>已出租</span>'
                ].join('');
        }
    }

    function getApartNameSelections() {
        return $.map($table.bootstrapTable('getSelections'), function(row) {
            return row.apartment_name;
        });
    }

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function(row) {
            return row.apartment_id;
        });
    }

    // function getHeight() {
    //     return $(window).height() - $('h1').outerHeight(true);
    // }

    $('#modifyUserPass').togglePassword({
        el: '#btn_show_pass'
    });

    window.operateEvents = {
        'click .checkin': function(e, value, row, index) {
            // alert('You click checkin action, row: ' + JSON.stringify(row));
            // var userOjb = row;
            // var userPermissionOld = userOjb.user_permission;
            // console.log(userPermissionOld);
            // $('#modifyUserName').val(userOjb.user_name);
            // $('#modifyUserPass').val('');
            // var selectPermission = $('#modifyUserPermission');
            // selectPermission.get(0).selectedIndex = (userPermissionOld - 1);
            // $('#modifyId').val(userOjb.id);
            // $('#modifyUserId').val(userOjb.user_id);
            // $('#modifyUser').modal();
            var btnCheckInOK = $('#checkinOK');
            btnCheckInOK.attr('disabled',"true");
            $('#checkin_alert_msg').hide();
            var checkinPersonNum = $('#checkin_apartment_person_num');
            checkinPersonNum[0].value = "1";
            $('#checkin_contract_start')[0].value = "";
            $('#checkin_contract_end')[0].value = "";
            var checkinStart = $('#checkin_contract_start_show');
            checkinStart[0].value = "";
            var checkinEnd = $('#checkin_contract_end_show')
            checkinEnd[0].value = "";
            var checkinFreqNext = $('#checkin_contract_frequency_next_show');
            checkinFreqNext[0].value = "";
            $('#checkin_contract_month_price')[0].value = "";
            $('#checkin_contract_deposit')[0].value = "";
            $('#checkin_contract_frequency')[0].value = "";
            $('#checkin_contract_current_frequency')[0].value = "";
            $('#checkin_total')[0].value = "";
            $('#checkin_apartment_owe')[0].value = "";
            $('#checkin_month_fee')[0].value = "";
            var checkinTenantName = $('#checkin_tenant_name');
            checkinTenantName[0].value = "";
            $('#checkin_tenant_phonenumber')[0].value = "";
            $('#checkin_tenant_age')[0].value = "";
            $('#checkin_tenant_desc')[0].value = "";
            $('#checkin_contract_end_div').removeClass('has-error has-success');
            $('#checkin_person_num_div').removeClass('has-error has-success');
            $('#checkin_contract_start_div').removeClass('has-error has-success');
            $('#checkin_frequency_next_div').removeClass('has-error has-success');
            $('#checkin_water_div').removeClass('has-error has-success');
            $('#checkin_electric_div').removeClass('has-error has-success');
            $('#checkin_tenant_name_div').removeClass('has-error has-success');
            $('.help-block').hide();

            if (waterMode === '1') {
                $('#checkin_water_div').hide();
            }

            var roomObj = row;
            // console.log(roomObj);
            var checkinElect = $('#checkin_apartment_electric_fee');
            checkinElect[0].value = roomObj.apartment_electric_fee;
            var checkinWaterMeter = $('#checkin_apartment_water_meter');
            checkinWaterMeter[0].value = roomObj.apartment_water_meter;
            $('#checkin_apartment_area')[0].value = domainCode;
            $('#checkin_apartment_floor')[0].value = roomObj.apartment_floor;
            $('#checkin_apartment_name')[0].value = roomObj.apartment_name;
            $('#checkin_apartment_apartment_id')[0].value = roomObj.apartment_id;
            $('#checkin_user_name')[0].value = userName;

            function checkRequiredOk (perNum, start, end, freq, elect, waterMeter, waterMod, name) {
                var perNumVal = perNum[0].value;
                var startVal = start[0].value;
                var endVal = end[0].value;
                var freqVal = freq[0].value;
                var electVal = elect[0].value;
                var waterVal = waterMeter[0].value;
                var nameVal = name[0].value;

                var besideWater = (perNumVal !== '') && (startVal !== '') && (endVal !== '') && (freqVal !== '') && (electVal !== '') && (nameVal !== '');

                if (waterMod === '1') {
                    console.log(besideWater);
                    return besideWater;
                } else {
                    var withWater = besideWater && (waterVal !== '');
                    console.log(withWater);
                    return withWater;
                }
            }

            checkinPersonNum.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });
            checkinStart.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });
            checkinEnd.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });
            checkinFreqNext.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });
            checkinElect.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });
            checkinWaterMeter.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });
            checkinTenantName.change(function (){
                if (checkRequiredOk(checkinPersonNum,checkinStart,checkinEnd,checkinFreqNext,checkinElect,checkinWaterMeter,waterMode,checkinTenantName)) {
                    btnCheckInOK.removeAttr("disabled");
                }else {
                    btnCheckInOK.attr('disabled',"true");
                }
            });

            $('#checkin').modal();
        },
        'click .modify': function(e, value, row, index) {
            // alert('You click checkin action, row: ' + JSON.stringify(row));
            // var userOjb = row;
            // var userPermissionOld = userOjb.user_permission;
            // console.log(userPermissionOld);
            // $('#modifyUserName').val(userOjb.user_name);
            // $('#modifyUserPass').val('');
            // var selectPermission = $('#modifyUserPermission');
            // selectPermission.get(0).selectedIndex = (userPermissionOld - 1);
            // $('#modifyId').val(userOjb.id);
            // $('#modifyUserId').val(userOjb.user_id);
            // $('#modifyUser').modal();

            var roomObj = row;
            console.log(roomObj);
            // var apartmentArea = roomObj.apartment_desc;
            var apartmentArea = domainCode;
            var apartmentFloor = roomObj.apartment_floor;
            var apartmentElect = roomObj.apartment_electric_fee;
            var apartmentId = roomObj.apartment_id;
            var apartmentName = roomObj.apartment_name;
            var apartmentPerNum = roomObj.apartment_person_num;
            var apartmentStatus = roomObj.apartment_status;
            var apartmentOwe = roomObj.apartment_owe;
            var contractDeposit = roomObj.contract_deposit;
            var contractStartTime = roomObj.contract_starttime;
            var contractEndtime = roomObj.contract_endtime;
            var contractFreq = roomObj.contract_frequency;
            var contarctMonthPrice = roomObj.contract_month_price;
            var tenantName = roomObj.tenant_name;
            var tenantPhone = roomObj.tenant_phonenumber;
            var tenantSex = roomObj.tenant_sex;
            var tenantAge = roomObj.tenant_age;
            var tenantIdNum = roomObj.tenant_desc;
            var tenantId = roomObj.tenant_id;
            var apartmentWater = roomObj.apartment_water_meter;

            $('#modify_apartment_area')[0].value = apartmentArea;
            $('#modify_apartment_person_num')[0].value = apartmentPerNum;
            $('#modify_apartment_name')[0].value = apartmentName;
            $('#modify_apartment_apartment_id')[0].value = apartmentId;
            $('#modify_apartment_electric_fee')[0].value = apartmentElect;
            $('#modify_apartment_water_meter')[0].value = apartmentWater;
            $('#modify_apartment_floor')[0].value = apartmentFloor;
            $('#modify_contract_start')[0].value = contractStartTime;
            $('#modify_contract_end')[0].value = contractEndtime;
            $('#modify_contract_month_price')[0].value = contarctMonthPrice;
            $('#modify_contract_deposit')[0].value = contractDeposit;
            $('#modify_contract_frequency')[0].value = contractFreq;
            // $('#modify_total')[0].value = parseInt(contractFreq,10)*parseInt(contarctMonthPrice,10);
            $('#modify_apartment_owe')[0].value = apartmentOwe;
            $('#modify_tenant_name')[0].value = tenantName;
            $('#modify_tenant_phonenumber')[0].value = tenantPhone;
            // $('#modify_tenant_sex')[0].value = tenantSex;
            delete $('#modify_radio_male').checked;
            delete $('#modify_radio_female').checked;
            if (roomObj.tenant_sex === '男') {
                $('#modify_radio_male').attr("checked", "checked");
            } else {
                $('#modify_radio_female').attr("checked", "checked");
            }
            if (waterMode === '1') {
                $('#modify_water_div').hide();
            }
            $('#modify_tenant_age')[0].value = tenantAge;
            $('#modify_tenant_desc')[0].value = tenantIdNum;
            $('#modify_tenant_tenant_id')[0].value = tenantId;
            $('#modify_user_name')[0].value = userName;


            $('#modifyInfo').modal();
        },
        'click .remove': function(e, value, row, index) {
            console.log(row.apartment_id);

            $('#deleteSingleRoom').modal();
            $('#deleteSingleRoomMsg').html(row.apartment_name + ' ?');

            $('#deleteSingleRoomOk').click(function() {
                $.ajax({
                    url: "deleteApartmentById.action",
                    dataType: "json",
                    data: { "apartment_id": row.apartment_id },
                    success: function(msg) {
                        var msg_val = eval(msg);
                        if (msg_val.message === '200denied') {
                            alert("该房间有人未退宿，不允许删除！");
                        } else if (msg_val.message === '200success') {
                            $table.bootstrapTable('remove', {
                                field: 'apartment_id',
                                values: [row.apartment_id]
                            });
                            $('#deleteSingleRoom').modal('hide');
                        }

                    }
                });
            });



        }
    };

    $remove.click(function() {
        var ids = getIdSelections();

        if (ids.length > 0) {
            $('#deleteMultiRoom').modal();
            ids_str = ids.toString().trim();
            var apart_name = getApartNameSelections().toString().trim();
            $('#deleteMultiRoomMsg').html(apart_name + ' ?');
            $('#deleteMultiRoomOk').click(function() {
                $.ajax({
                    url: "deleteApartmentByIds.action",
                    dataType: "json",
                    data: { apartment_ids: ids_str },
                    success: function(msg) {
                        var msg_val = eval(msg);
                        console.log(msg_val);
                        if (msg_val.message === '200denied') {
                            alert("尚有未退宿，不允许删除！");
                            location.reload();
                        } else if (msg_val.message === '200success') {
                            $table.bootstrapTable('remove', {
                                field: 'apartment_id',
                                values: ids
                            });
                        }

                        // $table.bootstrapTable('remove', {
                        //     field: 'apartment_id',
                        //     values: ids
                        // });
                    },
                    error: function(msg) {
                        var msg_val = eval(msg);
                        console.log(msg_val);
                        if (msg_val.message === '200denied') {
                            alert("尚有未退宿，不允许删除！");
                            location.reload();
                        } else if (msg_val.message === '200success') {
                            $table.bootstrapTable('remove', {
                                field: 'apartment_id',
                                values: ids
                            });
                        }
                    }
                });
                $remove.prop('disabled', false);
                $('#deleteMultiRoom').modal('hide');
            });

        }

    });

    $(window).resize(function() {
        $table.bootstrapTable('resetView', {
            // height: getHeight()
        });
    });

    function responseHandler(res) {
        console.log(res);
        $.each(res.rows, function(i, row) {
            row.state = $.inArray(row.id, selections) !== -1;
        });
        return res;
    }


    var columns = [];

    columns.push({
        field: 'state',
        checkbox: true
    });
    columns.push({
        field: 'apartment_desc',
        title: '物业',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'apartment_name',
        title: '房间号',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    // columns.push({
    //     field: 'apartment_floor',
    //     title: '楼层',
    //     align: 'center',
    //     valign: 'middle',
    //     sortable: true
    // });
    columns.push({
        field: 'apartment_status',
        title: '租赁状态',
        align: 'center',
        valign: 'middle',
        formatter: statusFormatter,
        sortable: true
    });
    columns.push({
        field: 'apartment_person_num',
        title: '人数',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'tenant_name',
        title: '租客姓名',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'apartment_nextcharge_point',
        title: '租金到期日',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'tenant_phonenumber',
        title: '手机',
        align: 'center',
        valign: 'middle',
        sortable: true
    });

    columns.push({
        field: 'contract_starttime',
        title: '合同起始日',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'contract_endtime',
        title: '合同到期日',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'contract_month_price',
        title: '月租金',
        align: 'center',
        valign: 'middle',
        sortable: true
    });

    columns.push({
        field: 'operate',
        title: '操作',
        align: 'center',
        events: operateEvents,
        formatter: operateFormatter
    });

    $("#checkin_form").validation({
        reqmark: false,
        icon: false
    });



    $("#checkinOK").on('click', function(event) {

        var name = $('#checkin_tenant_name')[0].value;
        var electricKwh = $('#checkin_apartment_electric_fee')[0].value;
        var waterMeter = $('#checkin_apartment_water_meter')[0].value;
        var startDate = $('#checkin_contract_start')[0].value;
        var endDate = $('#checkin_contract_end')[0].value;
        var freq = $('#checkin_contract_frequency_next')[0].value;

        var isCheckPass = false;
        if (waterMode === '1') {
            isCheckPass = (name !== '') && (electricKwh !== '') && (startDate !== '') && (endDate !== '') && (freq !== null);
        } else {
            isCheckPass = (name !== '') && (electricKwh !== '') && (startDate !== '') && (endDate !== '') && (freq !== null) && (waterMeter !== '');
        }

        if (!isCheckPass) {
            $('#checkin_alert_msg').show();
        }

        // $("#checkin_form").valid('填写信息不完整')
        if ($("#checkin_form").valid('填写信息不完整') === false) {

            return false;
        }


    });

    // $("#okbtn").on('click', function(event) {
    //     alert("shit");
    //     return true;
    // });

    // $("#form3").validation(function(obj, params) {
    //     //扩展校验方法
    // }, { reqmark: false, icon: false });
    // //.注册
    // $("#submit3").on('click', function(event) {
    //     // 2.最后要调用 valid()方法。
    //     if ($("#form3").valid('填写信息不完整。') === false) {
    //         alert('填写信息不完整。');
    //         console.log('填写信息不完整。')
    //         return false;
    //     }
    // });

    $.ajax({
        type: "POST",

        url: 'getAllRoomInfo.action?domain_code=' + domainCode + '&&user_permission=' + permission,
        success: function(data) {
            console.log(data);
            var allRoomDataObjs = eval(data);
            console.log(allRoomDataObjs);
            $('#table').bootstrapTable('destroy').bootstrapTable({
                data: allRoomDataObjs,
                columns: columns
            });
        }
    });

    $('#datetimepicker1').datetimepicker({
        language: 'zh-CN'
    });

    var checkin_month_price = $('#checkin_contract_month_price');
    var checkin_deposit = $('#checkin_contract_deposit');
    var checkin_frequency = $('#checkin_contract_frequency');
    var checkin_total = $('#checkin_total');
    var checkin_owe = $('#checkin_apartment_owe');
    var checkin_month_fee = $('#checkin_month_fee');
    var checkin_end_time = $('#checkin_contract_end');
    var checkin_start_time = $('#checkin_contract_start');
    var checkin_contract_current_frequency = $('#checkin_contract_current_frequency');
    var checkin_month_price_value;



    checkin_month_price.change(function() {
        checkin_month_price_value = checkin_month_price[0].value;
        checkin_deposit[0].value = checkin_month_price_value;
    });

    checkin_frequency.change(function() {
        var monthValue = parseInt(checkin_month_price_value, 10);

        if (monthValue > 0) {
            checkin_total[0].value = parseInt(checkin_frequency[0].value, 10) * monthValue + parseInt(checkin_month_price_value, 10);
        }
    });

    checkin_frequency.blur(function() {
        var checkin_start_time_value = checkin_start_time[0].value;
        var checkin_end_time_value = checkin_end_time[0].value;
        if (checkin_start_time_value !== "" && checkin_end_time_value !== "" && checkin_frequency[0].value !== "") {
            $.ajax({
                type: "POST",
                url: "get_current_cycle.action",
                data: { "start_time": checkin_start_time_value, "end_time": checkin_end_time_value, "fequency": checkin_frequency[0].value },
                success: function(data) {
                    console.log(data);
                    checkin_contract_current_frequency[0].value = data;
                }
            });

        }
    });

    checkin_month_fee.change(function() {
        var oweFee = parseInt(checkin_total[0].value, 10) - parseInt(checkin_month_fee[0].value, 10);
        if (oweFee < 0) {
            checkin_owe[0].value = 0;
        } else {
            checkin_owe[0].value = oweFee;
        }
    });


});
