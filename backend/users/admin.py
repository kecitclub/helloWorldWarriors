# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['id', 'email', 'first_name', 'last_name', 'is_volunteer', 'is_superuser', 'is_active']
    search_fields = ['email', 'first_name', 'last_name']
    ordering = ['email']

    fieldsets = (
        (None, {
            'fields': ('email', 'password', 'first_name', 'middle_name', 'last_name', 'phone_number', 'is_active', 'is_volunteer', 'is_superuser')
        }),
        ('Permissions', {
            'fields': ('is_staff', 'groups', 'user_permissions'),
        }),
        ('Important dates', {
            'fields': ('date_joined',)
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'middle_name', 'last_name', 'phone_number', 'is_active', 'is_volunteer', 'is_superuser'),
        }),
    )

admin.site.register(User, CustomUserAdmin)
