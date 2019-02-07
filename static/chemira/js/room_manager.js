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



$(document).ready(function() {


    var $table = $('#table'),
        $remove = $('#remove'),
        selections = [];

    function operateFormatter(value, row, index) {
        if (row.dev_status === "空闲") {
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


    function getApartNameSelections() {
        return $.map($table.bootstrapTable('getSelections'), function(row) {
            return row.sname;
        });
    }

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function(row) {
            return row.id;
        });
    }


    $('#modifyUserPass').togglePassword({
        el: '#btn_show_pass'
    });

    window.operateEvents = {
        'click .remove': function(e, value, row, index) {
            console.log(row.id);

            $('#deleteSingleRoom').modal();
            $('#deleteSingleRoomMsg').html(row.sname + ' ?');

            $('#deleteSingleRoomOk').click(function() {
                $.ajax({
                    url: "/delete_dev",
                    dataType: "json",
                    data: { "sname": row.sname },
                    success: function(msg) {
                        var msg_val = eval(msg);
                        if (msg_val.message === '200denied') {
                            alert("不允许删除！");
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
            $('#deleteMultiRoomMsg').html(apart_name + ' ?'+ ids_str);
            $('#deleteMultiRoomOk').click(function() {
                $.ajax({
                    url: "/delete_dev",
                    dataType: "json",
                    data: { dev_ids: ids_str },
                    success: function(msg) {
                        location.reload();
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
        field: 'sname',
        title: '序列号',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'dev_model',
        title: '型号',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'dev_source',
        title: '来源',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'dev_role',
        title: '角色',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'dev_user',
        title: '使用人',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'approver',
        title: '审批人',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'dev_status',
        title: '状态',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'borrow_time_limit',
        title: '期限',
        align: 'center',
        valign: 'middle',
        sortable: true
    });
    columns.push({
        field: 'dev_desc',
        title: '描述',
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




    $.ajax({
        type: "GET",
        url: 'get_all_data',
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
});
