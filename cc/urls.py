from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', TemplateView.as_view(template_name='home.html')),
    (r'^map/$', TemplateView.as_view(template_name='map.html')),
    (r'^about/$', TemplateView.as_view(template_name='about.html')),
    (r'^help/$', TemplateView.as_view(template_name='help.html')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('drinker.urls')),
)
