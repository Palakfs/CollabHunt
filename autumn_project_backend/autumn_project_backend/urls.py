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
from api.views.event_view import EventListCreateView , EventListView
from api.views.group_view import GroupListView , GroupListCreateView , GroupDetailView
from api.views.category_view import CategoryListView
from api.views.get_user_enrol_view import GetUserEnrol
from api.views.profile_view import ProfileDetailView , ProfileListView
from api.views.project_view import ProjectListCreateView , ProjectDetailView 
from api.views.experienceView import ExperienceDetailView , ExperienceListCreateView
from api.views.commitment_role_view import CommitmentRoleListView
from api.views.team_view import TeamListView , TeamListCreateView ,  TeamDetailView

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
    path('create_event/', EventListCreateView.as_view() , name='create_event'),
    path('groups/',GroupListView.as_view(),name='groups'),
    path('categories/',CategoryListView.as_view(),name='categories'),
    path('create_group/',GroupListCreateView.as_view(),name='create_group'),
    path('events/',EventListView.as_view(),name='events'),
    path('get_user_enrol/<int:user_id>/', GetUserEnrol.as_view(), name='get_user_enrol'),
    path('get_user_profile/<int:username>/', ProfileDetailView.as_view(), name='get_user_profile'),
    path('projects/',ProjectListCreateView.as_view(),name='projects'),
    path('projects/<int:pk>/',ProjectDetailView.as_view(),name='get_project'),
    path('experiences/',ExperienceListCreateView.as_view(),name='experiences'),
    path('experiences/<int:pk>/',ExperienceDetailView.as_view(),name='get_experience'),
    path('profiles/' , ProfileListView.as_view() , name = 'profiles'),
    path('groups/<int:pk>/' , GroupDetailView.as_view(),name='get_group'),
    path('commitment_roles/', CommitmentRoleListView.as_view(),name='commitment_roles'),
    path('teams/<int:event_id>/',TeamListView.as_view(),name='teams'),
    path('create_team/<int:event_id>/',TeamListCreateView.as_view(),name='create_team'),
    path('teams/',TeamListView.as_view(),name='all_teams'),
    path('team/<int:pk>/',TeamDetailView.as_view(),name='team'),
]


 