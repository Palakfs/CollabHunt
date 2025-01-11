from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, user_enrol, password=None):
        if not user_enrol:
            raise ValueError("The Enrollment number is required")
        if not password:
            raise ValueError("A password is required")
        user = self.model(user_enrol=user_enrol)
        user.set_password(password) 
        user.save(using=self._db)
        return user

    def create_superuser(self, user_enrol, password=None):
        user = self.create_user(user_enrol=user_enrol, password=password)
        user.is_admin = True  
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    user_enrol = models.IntegerField(unique=True) 
    is_admin = models.BooleanField(default=False)  

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_enrol'  
    REQUIRED_FIELDS = []  

    def __str__(self):
        return str(self.user_enrol)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Project(models.Model):
    project = models.AutoField(primary_key=True)
    project_title = models.CharField(max_length=255,null=True,blank=True)
    project_description = models.TextField(null=True,blank=True)
    start_date = models.DateField(null=True,blank=True)
    end_date = models.DateField(null=True,blank=True)
    attachments_url = models.ImageField(upload_to='project_attachments/', null=True, blank=True) 
    field = models.CharField(max_length=255,null=True,blank=True)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='projects')

class Experience(models.Model):
    experience = models.AutoField(primary_key=True)
    experience_title = models.CharField(max_length=255,null=True,blank=True)
    experience_description = models.TextField(null=True,blank=True)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='experiences')

class Profile(models.Model):
    username = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField(null=True,blank=True)
    full_name = models.CharField(max_length=255,null=True,blank=True)
    contact_number = models.PositiveSmallIntegerField(null=True,blank=True)
    skills = models.JSONField(default=list, blank=True)
    avatar_url = models.ImageField(upload_to='avatars/', null=True, blank=True)
    

    def __str__(self):
        return self.full_name

class Group(models.Model):
    group = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=128)
    group_description = models.TextField(null=True)
    group_admin = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='admin_groups')
    member_id = models.ManyToManyField(Profile, related_name='member_groups') 

class Category(models.Model):
    category = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=128)    

class Event(models.Model):
    event = models.AutoField(primary_key=True)
    event_title = models.CharField(max_length=128)
    event_admin = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='admin_events')
    event_category_id = models.ManyToManyField(Category,null=True)
    visible_to_group_id = models.ManyToManyField(Group,null=True)
    event_description = models.TextField()
    registration_deadline = models.DateTimeField(null=True)
    additional_details_link = models.URLField(null=True)

class Commitment_Role(models.Model):
    commitment_role = models.AutoField(primary_key=True, default=1)
    role_name = models.CharField()

class Team(models.Model):
    team = models.AutoField(primary_key=True)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_teams')
    team_admin_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='admin_teams')
    team_member_id = models.ManyToManyField(CustomUser, related_name='member_teams')
    team_name = models.TextField()
    team_description = models.TextField(null=True)
    expectations = models.TextField(null=True)
    max_members = models.PositiveSmallIntegerField()
    admin_expertise = models.TextField(null=True)
    commitment_role_id = models.ForeignKey(Commitment_Role, on_delete=models.CASCADE,related_name='role_teams')

class Joining_Request(models.Model):
    joining_request = models.AutoField(primary_key=True)
    team_id = models.ForeignKey(Team, on_delete=models.CASCADE)
    sender_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_accepted = models.BooleanField()
    is_reviewed = models.BooleanField(default=0)
    
