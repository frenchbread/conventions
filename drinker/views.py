from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render_to_response
from django.template import RequestContext
from forms import RegistrationForm, LoginForm
from models import Drinker
from forms import EditProfileForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf

def DrinkerRegistration(request):
        if request.user.is_authenticated():
                return HttpResponseRedirect('/')
        if request.method == 'POST':
                form = RegistrationForm(request.POST)
                if form.is_valid():
                        user = User.objects.create_user(username=form.cleaned_data['username'], email = form.cleaned_data['email'], password = form.cleaned_data['password'])
                        user.save()
                        drinker = Drinker(user=user, name=form.cleaned_data['name'], birthday=form.cleaned_data['birthday'])
                        drinker.save()
                        return HttpResponseRedirect('/')
                else:
                        return render_to_response('register.html', {'form': form}, context_instance=RequestContext(request))
        else:
                ''' user is not submitting the form, show them a blank registration form '''
                form = RegistrationForm()
                context = {'form': form}
                return render_to_response('register.html', context, context_instance=RequestContext(request))

def LoginRequest(request):
        if request.user.is_authenticated():
                return HttpResponseRedirect('/')
        if request.method == 'POST':
                form = LoginForm(request.POST)
                if form.is_valid():
                        username = form.cleaned_data['username']
                        password = form.cleaned_data['password']
                        drinker = authenticate(username=username, password=password)
                        if drinker is not None:
                                login(request, drinker)
                                return HttpResponseRedirect('/')
                        else:
                                return render_to_response('login.html', {'form': form}, context_instance=RequestContext(request))
                else:
                        return render_to_response('login.html', {'form': form}, context_instance=RequestContext(request))
        else:
                form = LoginForm()
                context = {'form': form}
                return render_to_response('login.html', context, context_instance=RequestContext(request))

def LogoutRequest(request):
        logout(request)
        return HttpResponseRedirect('/')


@login_required
def user_settings(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user.drinker)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/u/%s' % request.user.username)
    else:
        form = EditProfileForm(instance=request.user.drinker)

    args = {}
    args.update(csrf(request))

    args['form'] = form

    return render_to_response('settings.html', args, context_instance=RequestContext(request))

@login_required
def user_profile(request):

    args = {}
    args.update(csrf(request))

    args['thisuser'] = Drinker.objects.get(user=request.user.drinker)

    return render_to_response('profile.html', args, context_instance=RequestContext(request))