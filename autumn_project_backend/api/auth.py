from django.shortcuts import redirect
import requests
from django.conf import settings


def oauth_authorize(request):
    client_id = settings.OAUTH_CLIENT_ID
    redirect_uri = settings.OAUTH_REDIRECT_URI
    state = 'successfully redirected'

    url = f'https://channeli.in/oauth/authorise/?client_id={client_id}&redirect_uri={redirect_uri}&state={state}'
    return redirect(url)
