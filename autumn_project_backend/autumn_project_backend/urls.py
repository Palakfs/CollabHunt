"""
URL configuration for autumn_project_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from api.views.token_view import UserRegistrationView, ObtainAuthToken
from api.views import oauth_view , profile_view , token_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', UserRegistrationView.as_view(), name='user-signup'),
    path('login/', ObtainAuthToken.as_view(), name='login'),
    path('oauth/', oauth_view.get_tokens, name='get_tokens'),
    path('get_user_data/', oauth_view.get_user_data, name='get_user_data'),
    path('refresh_token/', oauth_view.refresh_token, name='refresh_token'),
    path('logout/', oauth_view.logout_view, name='logout'),
    path('error_page/', oauth_view.error_page, name='error_page'),
    path('start_oauth/', oauth_view.start_oauth, name='start_oauth'),
    
]


