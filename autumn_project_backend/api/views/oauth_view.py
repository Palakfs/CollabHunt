from django.shortcuts import redirect, render
from django.conf import settings
import requests
from django.http import JsonResponse

def start_oauth(request):
    auth_url = f"https://channeli.in/oauth/authorise/?client_id={settings.OAUTH_CLIENT_ID}&redirect_uri={settings.OAUTH_REDIRECT_URI}&state=RANDOM_STATE"
    return redirect(auth_url)

def get_tokens(request):
    code = request.GET.get('code')
    if code:
        token_url = 'https://channeli.in/open_auth/token/'
        data = {
            'client_id': settings.OAUTH_CLIENT_ID,  
            'client_secret': settings.OAUTH_CLIENT_SECRET, 
            'grant_type': 'authorization_code',
            'redirect_uri': settings.OAUTH_REDIRECT_URI,  
            'code': code
        }
        
        
        response = requests.post(token_url, data=data)
        
        if response.status_code == 200:
            tokens = response.json()
            request.session['access_token'] = tokens.get('access_token') 
            request.session['refresh_token'] = tokens.get('refresh_token')
            request.session['expires_in'] = tokens.get('expires_in')  
            return redirect('get_user_data')  
        else:
            return redirect('error_page')
    else:
        return redirect('error_page')


def get_user_data(request):
    access_token = request.session.get('access_token')
    
    if access_token:
        user_data_url = 'https://channeli.in/open_auth/get_user_data/'
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        
        response = requests.get(user_data_url, headers=headers)
        
        if response.status_code == 200:
            user_data = response.json()
            return JsonResponse(user_data) 
        else:
          
            return redirect('refresh_token')
    else:
        return redirect('error_page')


def refresh_token(request):
    refresh_token = request.session.get('refresh_token')
    
    if refresh_token:
        token_url = 'https://channeli.in/open_auth/token/'
        data = {
            'client_id': settings.OAUTH_CLIENT_ID,
            'client_secret': settings.OAUTH_CLIENT_SECRET,
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
        }

        response = requests.post(token_url, data=data)

        if response.status_code == 200:
            tokens = response.json()
         
            request.session['access_token'] = tokens.get('access_token')
            request.session['refresh_token'] = tokens.get('refresh_token')
            return redirect('get_user_data') 
        else:
            return redirect('error_page')
    else:
        return redirect('error_page')


def logout_view(request):
    access_token = request.session.get('access_token')
    
    if access_token:
        revoke_url = 'https://channeli.in/open_auth/revoke_token/'
        data = {
            'client_id': settings.OAUTH_CLIENT_ID,
            'client_secret': settings.OAUTH_CLIENT_SECRET,
            'token': access_token,
            'token_type_hint': 'access_token',
        }

        response = requests.post(revoke_url, data=data)
        
      
        if response.status_code == 200:
            request.session.flush()  
            return redirect('login')
        else:
            return redirect('error_page')
    else:
        return redirect('error_page')

def error_page(request):
    return JsonResponse({"error": "Something went wrong during OAuth authentication."}, status=400)