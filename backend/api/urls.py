from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CodeFileViewSet

app_name = 'api'

router = DefaultRouter()
router.register(r'files', CodeFileViewSet, basename='codefiles')


urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include('djoser.urls')),
    path('', include(router.urls)),
]
