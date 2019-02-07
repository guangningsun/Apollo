from django.contrib import admin
from TestModel.models import Test,Assets

# Register your models here.
admin.site.register([Test,Assets])
