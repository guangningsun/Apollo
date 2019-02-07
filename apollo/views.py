# -*- coding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import json
from TestModel.models import DeviceInfo

# 创建用户信息/用户注册
# 删除用户信息
# 修改用户信息
# 查找用户信息
# 获取所有用户信息
# 用户登录

# 街道信息增加
# 街道信息删除
# 街道信息查找
# 街道信息修改




# 初始化登录界面
def init_web(request):
    return render(request, 'signin.html')


# 登录跳转界面
def login(request):
    context = {  }
    return render(request, 'table.html', context)

# 获取资产管理界面
def reload_dev_web(request):
    context = {}
    return render(request, 'table.html', context)


# 获取下载文件页面
def dev_manager(request):
    context = {}
    return render(request, 'table.html', context)


def file_list(request):
    context = {}
    return render(request, 'list.html', context)


def create_dev(request):
    if request.POST:
        dev1 = DeviceInfo(sname=request.POST['sname'],
                          dev_source=request.POST['dev_source'],
                          dev_model=request.POST['dev_model'],
                          dev_role=request.POST['dev_role'],
                          dev_user=request.POST['dev_user'],
                          approver=request.POST['approver'],
                          dev_desc=request.POST['dev_desc'],
                          dev_status=request.POST['dev_status'],
                          borrow_time_limit=request.POST['borrow_time_limit']
                          )
        dev1.save()
    return HttpResponseRedirect("/reload_dev_web")


def delete_dev(request):

    dev_ids = request.GET['dev_ids']
    for dev_id in dev_ids.split(","):
        dev1 = DeviceInfo.objects.get(id=dev_id)
        dev1.delete()
    return HttpResponseRedirect("/reload_dev_web")


def get_all_data(request):
    list_response = []
    list_dev = DeviceInfo.objects.all()
    for res in list_dev:
        dict_tmp = {}
        dict_tmp.update(res.__dict__)
        dict_tmp.pop("_state", None)
        list_response.append(dict_tmp)
    return HttpResponse(json.dumps(list_response), content_type="application/json")
