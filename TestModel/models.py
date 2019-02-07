from django.db import models


class Test(models.Model):
    name = models.CharField(max_length=20)


class Assets(models.Model):
    sn = models.CharField(max_length=20)
    s_type = models.CharField(max_length=20) 
    ram = models.CharField(max_length=20)
    cpu = models.CharField(max_length=20)
    disk = models.CharField(max_length=20)
    ipmi = models.CharField(max_length=20)


class DeviceInfo(models.Model):
    sname = models.CharField(max_length=200)
    dev_source = models.CharField(max_length=200)
    dev_model = models.CharField(max_length=200)
    dev_role = models.CharField(max_length=200)
    dev_user = models.CharField(max_length=200)
    approver = models.CharField(max_length=200)
    dev_desc = models.CharField(max_length=200)
    dev_status = models.CharField(max_length=200)
    borrow_time_limit = models.CharField(max_length=200)


