from django.db import models

# 用户类
class UserInfo(models.Model):
    user_id = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    user_email = models.CharField(max_length=200)
    user_address = models.CharField(max_length=200)
    user_phone = models.CharField(max_length=200)


# 街道类
class AddressInfo(models.Model):
    address_id = models.CharField(max_length=200)
    address_province = models.CharField(max_length=200)
    address_city = models.CharField(max_length=200)
    address_street = models.CharField(max_length=200)

# 新闻类
class NewsInfo(models.Model):
    news_id = models.CharField(max_length=200)
    news_title = models.CharField(max_length=200)
    news_date = models.CharField(max_length=200)
    news_author = models.CharField(max_length=200)
    news_details = models.CharField(max_length=5000)

