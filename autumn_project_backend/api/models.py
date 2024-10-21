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

class Skill(models.Model):
    skill = models.PositiveIntegerField(primary_key=True)
    skill_name = models.CharField(max_length=128)

class Branch(models.Model):
    branch = models.PositiveIntegerField(primary_key=True)
    branch_name = models.CharField(max_length=255)

class Project(models.Model):
    project = models.PositiveIntegerField(primary_key=True)
    project_title = models.CharField(max_length=255)
    project_description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    attachments_url = models.URLField()
    field = models.CharField(max_length=255)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='projects')

class Profile(models.Model):
    username = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField()
    full_name = models.CharField(max_length=255)
    contact_number = models.PositiveSmallIntegerField()
    branch_id = models.ForeignKey(Branch, on_delete=models.CASCADE)
    year = models.PositiveSmallIntegerField()
    skill_id = models.ManyToManyField(Skill)
    experience = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name

class Group(models.Model):
    group = models.PositiveIntegerField(primary_key=True)
    group_name = models.CharField(max_length=128)
    group_description = models.TextField()
    admin_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='admin_groups')
    member_id = models.ManyToManyField(CustomUser, related_name='member_groups') 

class Category(models.Model):
    category = models.PositiveIntegerField(primary_key=True)
    category_name = models.CharField(max_length=128)    

class Event(models.Model):
    event = models.PositiveIntegerField(primary_key=True)
    event_title = models.CharField(max_length=128)
    event_category_id = models.ManyToManyField(Category)
    visible_to_group_id = models.ManyToManyField(Group)
    event_description = models.TextField()
    registration_deadline = models.DateTimeField()
    additional_details_link = models.URLField()

class Commitment_Role(models.Model):
    commitment_role = models.PositiveSmallIntegerField(primary_key=True, default=1)
    role_name = models.CharField(max_length=128)

class Person_Event_Expertise(models.Model):
    expertise = models.PositiveIntegerField(primary_key=True)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)
    person_username = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    commitment_role_id = models.ForeignKey(Commitment_Role, on_delete=models.CASCADE)
    event_expertise = models.TextField()

class Team(models.Model):
    team = models.PositiveIntegerField(primary_key=True)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)
    team_admin_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='admin_teams')
    team_member_id = models.ManyToManyField(CustomUser, related_name='member_teams')
    team_theme_goals = models.TextField()
    expectations = models.TextField()
    max_members = models.PositiveSmallIntegerField()
    admin_expertise_id = models.ForeignKey(Person_Event_Expertise, on_delete=models.CASCADE)

class Joining_Request(models.Model):
    request = models.PositiveIntegerField(primary_key=True)
    team_id = models.ForeignKey(Team, on_delete=models.CASCADE)
    person_expertise_id = models.ForeignKey(Person_Event_Expertise, on_delete=models.CASCADE)
    is_accepted = models.BooleanField()
    
