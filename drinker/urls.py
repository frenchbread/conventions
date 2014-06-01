from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
     url(r'^register/$', 'drinker.views.DrinkerRegistration'),
     url(r'^login/$', 'drinker.views.LoginRequest'),
     url(r'^logout/$', 'drinker.views.LogoutRequest'),
     (r'^resetpassword/passwordsent/$', 'django.contrib.auth.views.password_reset_done'),
     (r'^resetpassword/$', 'django.contrib.auth.views.password_reset'),
     (r'^reset/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$', 'django.contrib.auth.views.password_reset_confirm'),
     (r'^reset/done/$', 'django.contrib.auth.views.password_reset_complete'),
     url(r'^settings/$', 'drinker.views.user_settings'),
     url(r'^profile/$', 'drinker.views.user_profile'),
)